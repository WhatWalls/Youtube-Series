const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${client.config.emojis.cross} You don't have the right perms for this command`);

    let member = message.mentions.members.first()

    try { 

        let role = client.convertRole(message.guild, args[1])

        try {

            await member.roles.add(role)
            let roleGivenEmbed = new Discord.MessageEmbed()
            .setDescription(`${client.config.emojis.check}  \`${role.name}\` has been given to \`${member.user.username}\``)
            .setColor(client.color)
            return message.channel.send({embeds:[roleGivenEmbed]})

        } catch (err) {
            console.log(err)
            let errorEmbed = new Discord.MessageEmbed()
            .setDescription(`${client.config.emojis.cross} Failed: Make sure my role is high enough`)
            .setColor(client.color)
            return message.channel.send({embeds:[errorEmbed]})

        }


    } catch (err) {

        let errorEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.cross} Failed: Make sure you supply a valid role`)
        .setColor(client.color)
        return message.channel.send({embeds:[errorEmbed]})
    }

};

exports.help = {
    name: 'addRole',
    aliases: ['addrole', 'giverole', 'promote'],
    description: 'Give a user a role.',
    usage: ''
};