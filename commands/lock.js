const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    try {
        await message.guild.roles.cache.forEach( async (role) => {
            role.edit(role.permissions.remove('SEND_MESSAGES')) 
        })
    } catch (err) {
        console.log
    }

    let lockdownEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.check} Server is in lockdown mode`)
    .setColor(client.color)
    message.channel.send({embeds:[lockdownEmbed]})
}

exports.help = {
    name: 'lock',
    aliases: ['lock', 'lockdown'],
    description: 'Lock the server down.',
    usage: ''
};