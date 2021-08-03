const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${client.config.emojis.cross} You don't have the right perms for this command`);

    const member = message.mentions.users.first()

    let noUserErroEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} No member mentioned`)
    .setColor(client.color)

    let noMuteRoleErroEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} No \`mute\` role found please proceed to create one`)
    .setColor(client.color)

    let alreadyMutedEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} This user is already muted`)
    .setColor(client.color)

    if (!member) return message.channel.send({embeds:[noUserErroEmbed]})

    const user = message.guild.members.cache.get(member.id)

    let data = await client.class.getData(message.guild.id)

    let muteRole

    if(data.mute.role) muteRole = client.convertRole(message.guild, data.mute.role)
    else muteRole = message.guild.roles.cache.find(c => c.name == `mute`)

    if (!muteRole) return message.channel.send({embeds:[noMuteRoleErroEmbed]})

    try {
        if (user.roles.cache.has(muteRole.id)) return message.channel.send({embeds:[alreadyMutedEmbed]})
        await user.roles.add(muteRole)
        let time
        try {
            time = args[1] ? `and will be unmuted after  \`${client.ms(client.ms(args[1]), { long: true })}\`` : ''

            let muteEmbed = new Discord.MessageEmbed()
            .setDescription(`${client.config.emojis.check} \`${member.username}\` has been muted ${time}`)
            .setColor(client.color)
            message.channel.send({embeds:[muteEmbed]})

        } catch (err) {

            let notvalidTimeErro = new Discord.MessageEmbed()
            .setDescription(`${client.config.emojis.cross} \`${args[1]}\` is not a valid time supply a valid one or none`)
            .setColor(client.color)

            message.channel.send({embeds:[notvalidTimeErro]})
        }
    } catch (err) {
        console.log(err)

        let notHighEnoughRoleEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.cross} Couldn't mute \`${member.username}\` make sure I have the right roles and a valid time`)
        .setColor(client.color)

        return message.channel.send({embeds:[notHighEnoughRoleEmbed]})
    }

    try {
        if (!args[1]) return;
        setTimeout(async () => {
            await user.roles.remove(muteRole);
        }, client.ms(args[1]))
    } catch (err) {
        console.log(err)

        let notHighEnoughRoleEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.cross} Couldn't unmute \`${member.username}\` but his mute has expired make sure I have the right roles`)
        .setColor(client.color)

        return message.channel.send({embeds:[notHighEnoughRoleEmbed]})

    }
}

exports.help = {
    name: 'mute',
    aliases: ['mute'],
    description: 'Mute a member.',
    usage: ''
};