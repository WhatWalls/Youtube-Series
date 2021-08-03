const Discord = require('discord.js')

let buttonAccept = new Discord.MessageButton()
.setCustomId('application_accept')
.setLabel('Accept')
.setStyle('SUCCESS');

exports.run = async (client, message, args) => {
    let data = await client.calls.getData(message.guild.id)    

    if(message.author.id != "173347297181040640") return;

    try {
        let guild = await client.guilds.cache.get(args[0]);

        await client.calls.updateDbSetting(guild.id, `premium`, true)

        let authEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.check} \`${guild.name}\` has been authorized`)
        .setColor(client.color)
        message.channel.send({embeds:[authEmbed]})
    } catch (err) {
        console.log(err)

        let errorAuthEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.cross} ${args[0]} is not a valid guild id`)
        .setColor(client.color)
        return message.channel.send({embeds:[errorAuthEmbed]})
    }
}

exports.help = {
    name: 'authorize',
    aliases: ['auth', 'authorize'],
    description: 'Auth a guild.',
    usage: ''
};