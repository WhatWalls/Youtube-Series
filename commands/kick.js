const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${client.config.emojis.cross} You don't have the right perms for this command`);

    const member = message.mentions.members.first()

    if (!member) return message.channel.send(`No valid member mentioned`)

    try {
        await member.kick()

        let kickEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.check} \`${member.user.username}\` has been kicked`)
        .setColor(client.color)
        message.channel.send({embeds:[kickEmbed]})

    } catch (err) {
        let kickErrorEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.cross} I couldn't kick \`${member.user.username}\` member`)
        .setColor(client.color)
        message.channel.send({embeds:[kickErrorEmbed]})
    }
}

exports.help = {
    name: 'kick',
    aliases: ['kick'],
    description: 'Kick a member.',
    usage: ''
};