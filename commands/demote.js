const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    let member = message.mentions.members.first()

    let demoteErrorEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} Sorry I couldn't demote ${member.user.username}`)
    .setColor(client.color)

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${client.config.emojis.cross} You don't have the right perms for this command`);
    try {
        let newRole = client.convertRole(message.guild, args[1])
        let oldRole = client.convertRole(message.guild, args[2])
        let member = message.mentions.members.first()
        await member.roles.remove(oldRole)
        await member.roles.add(newRole)

        let demoteEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.check} \`${member.user.username}\` has been demoted to \`${newRole.name}\``)
        .setColor(client.color)
        message.channel.send({embeds:[demoteEmbed]})

    } catch (err) {
        console.log(err)
        return message.channel.send({embeds:[demoteErrorEmbed]})
    }   

};

exports.help = {
    name: 'demote',
    aliases: ['demote'],
    description: 'demote a user.',
    usage: ''
};