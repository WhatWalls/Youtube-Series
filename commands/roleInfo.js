const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    try {

        let role = client.convertRole(message.guild, args[0])

        console.log(role)

        roleEmbed = new Discord.MessageEmbed()
        roleEmbed
            .setTitle(`${role.name} info`)
            .setDescription(`❯ Members with role: \`${role.members.size}\` \n❯ Roleid: \`${role.id}\` \n❯ RGB role color: \`${role.color}\` \n❯ Mentionable: \`${role.mentionable}\``)
            .setFooter(message.guild.name, message.guild.iconURL())
            .setColor(client.color)
            .setTimestamp()
        message.channel.send({ embeds: [roleEmbed]});
        
    } catch (err) {

        let notValidRoleEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.cross} Failed: Make sure you supply a valid role`)
        .setColor(client.color)
        return message.channel.send({embeds:[notValidRoleEmbed]})
        
    }
};

exports.help = {
    name: 'roleInfo',
    aliases: ['roleinfo', 'role'],
    description: 'Get info about a role.',
    usage: ''
};