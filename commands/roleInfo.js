const Discord = require('discord.js')
const { convertChannel, convertRole } = require("../utils/functions");
let config = require('../config.json')

exports.run = async (client, message, args) => {

    try {

        let role = convertRole(message.guild, args[0])

        console.log(role)

        roleEmbed = new Discord.MessageEmbed()
        roleEmbed
            .setTitle(`${role.name} info`)
            .setDescription(`❯ Members with role: \`${role.members.size}\` \n❯ Roleid: \`${role.id}\` \n❯ RGB role color: \`${role.color}\` \n❯ Mentionable: \`${role.mentionable}\``)
            .setFooter(message.guild.name, message.guild.iconURL())
            .setColor("#fd5392")
            .setTimestamp()
        message.channel.send({ embeds: [roleEmbed]});
        
    } catch (err) {

        return message.reply(`${config.emojis.cross} Failed: Make sure you supply a valid role`, true)

    }
};

exports.help = {
    name: 'roleInfo',
    aliases: ['roleinfo', 'role'],
    description: 'Get info about a role.',
    usage: ''
};