const Discord = require('discord.js')

let buttonAccept = new Discord.MessageButton()
.setCustomId('application_accept')
.setLabel('Accept')
.setStyle('SUCCESS');

let buttonDeny = new Discord.MessageButton()
.setCustomId('application_deny')
.setLabel('Deny')
.setStyle('DANGER');

let buttonDelete = new Discord.MessageButton()
.setCustomId('application_delete')
.setEmoji('🗑️')
.setStyle('PRIMARY');

exports.run = async (client, message, args) => {
    let data = await client.calls.getData(message.guild.id)    

    if (!data.application.toggle) return message.channel.send(`Applications are currently disabled`)

    let reviewCategory = client.convertCategory(message.guild, data.application.review)

    let applicationChannel = await message.guild.channels.create(`${message.author.username} application`, {
        type: 'text'
    })

    await applicationChannel.setParent(reviewCategory)

    await applicationChannel.lockPermissions()

    await applicationChannel.permissionOverwrites.edit(message.author, {
        VIEW_CHANNEL: true
    });

    let questionsDb = data.application.questions

    questionsDb = questionsDb.split('_')

    let questions = []

    questionsDb.forEach((question) => {
        questions.push(question)
    })

    let i = 0
    let input = ''
    let finalInput
    let answers = []
    const filter = m => m.author.id === message.author.id;

    const sendQuestion = async() => {
        
        try {

            applicationChannel.send(questions[i])

            i = i + 1
        } catch (err) {
            console.log(err)
        }   

        try {

            input = await applicationChannel.awaitMessages({
                filter: filter,
                max: 1,
                time: 1200000,
                errors: ["time"]
            });

            finalInput = input ? input.first() : "";

            if (finalInput.content == 'cancel' || finalInput.content == 'stop') return await applicationChannel.delete()
            else answers.push(finalInput.content)

            if ( answers.length >= questions.length - 1) {

                applicationChannel.send(`Would you like to send this application (Yes, No)?`)

                try {

                    input = await applicationChannel.awaitMessages({
                        filter: filter,
                        max: 1,
                        time: 1200000,
                        errors: ["time"]
                    });

                    finalInput = input ? input.first() : "";

                    if (finalInput.content.toLowerCase() == 'yes' || finalInput.content.toLowerCase() == 'ye') {

                        let q = 0

                        let answerList = ''

                        let voteChannel = client.convertChannel(message.guild, data.application.votech)

                        questions.pop()

                        try {
                            questions.forEach((question) => {
                                answerList += `**${question}** \n *${answers[q]}* \n` 
                                q = q + 1
                            })

                            if (answerList.length >= 1950) {
                                let applyResultEmbedErrorTitle = new Discord.MessageEmbed()
                                .setTitle(`${message.author.username}'s application`)
                                .setColor(client.color);
                                
                                q = 0

                                voteChannel.send({embeds:[applyResultEmbedErrorTitle]})
                                applicationChannel.send({embeds:[applyResultEmbedErrorTitle]})

                                questions.forEach((question) => {
                                    let applyResultEmbedError = new Discord.MessageEmbed()
                                    .setDescription(`**${question}** \n *${answers[q]}*`) 
                                    .setColor(client.color);
    
                                    voteChannel.send({embeds:[applyResultEmbedError]})
                                    applicationChannel.send({embeds:[applyResultEmbedError], components:[[buttonAccept, buttonDeny, buttonDelete]]})
    
                                    q = q + 1
                                })
    
                                let applyResultEmbedErrorExcuse = new Discord.MessageEmbed()
                                    .setDescription(`This application has been split up because it was to long for 1 message`) 
                                    .setTimestamp()
                                    .setColor(client.color);
    
                                let voteMessage = await voteChannel.send({embeds:[applyResultEmbedErrorExcuse]})
                                applicationChannel.send({embeds:[applyResultEmbedErrorExcuse], components:[[buttonAccept, buttonDeny, buttonDelete]]})
    
                                await voteMessage.react('👍')
                                return await voteMessage.react('👎')
                            } else {
                                let applyResultEmbed = new Discord.MessageEmbed()
                                .setTitle(`${message.author.username}'s application`)
                                .setDescription(`${answerList}`)
                                .setTimestamp()
                                .setColor(client.color);
            
                                let voteMessageSuccess = await voteChannel.send({embeds:[applyResultEmbed]})
                                applicationChannel.send({embeds:[applyResultEmbed], components:[[buttonAccept, buttonDeny, buttonDelete]]})
    
                                
                                await voteMessageSuccess.react('👍')
                                return await voteMessageSuccess.react('👎')
                            }
                        } catch (err) {

                            console.log(err)

                           
                        }
        
                    } else if (finalInput.content.toLowerCase() == 'no') {
                        let noEmbed = new Discord.MessageEmbed()
                        .setDescription(`Application has not been sent`) 
                        .setColor(client.color);
                        return applicationChannel.send({embeds:[noEmbed], components:[[buttonDelete]]})
                    } else return await applicationChannel.delete()

                } catch (err) {
                    console.log(err)
                }

            } else {
                sendQuestion()
            }

        } catch (err) {
            let errorApplicationEmbed = new Discord.MessageEmbed()
            .setDescription(`${client.config.emojis.cross} Failed: Time expired please reapply`)
            .setColor(client.color)
            return applicationChannel.send({embeds:[errorApplicationEmbed]})
        }

    }   

    sendQuestion()
}

exports.help = {
    name: 'apply',
    aliases: ['apply'],
    description: 'Make a application.',
    usage: ''
};