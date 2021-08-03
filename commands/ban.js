const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    let errorNotValidBan = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} Failed: No valid member mentioned`)
    .setColor(client.color)
    
    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${client.config.emojis.cross} You don't have the right perms for this command`);

    const member = message.mentions.members.first()

    if (!member) return message.channel.send({embeds:[errorNotValidBan]})

    try {
        await member.ban()

        let userBannedEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.check} \`${member.user.username}\` has been banned`)
        .setColor(client.color)

        message.channel.send({embeds:[userBannedEmbed]})
    } catch (err) {

        let userNotBannedEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.cross} I couldn't ban \`${member.user.username}\` member`)
        .setColor(client.color)
        return message.channel.send({embeds:[userNotBannedEmbed]})
    }
}

exports.help = {
    name: 'ban',
    aliases: ['ban'],
    description: 'Ban a member.',
    usage: ''
};