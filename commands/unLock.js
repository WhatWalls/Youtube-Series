const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    // try {
    //     await message.guild.roles.cache.forEach( async (role) => {
    //         role.edit(role.permissions.add('SEND_MESSAGES')) 
    //     })
    // } catch (err) {

    // }

    let unlockdownEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.check} Server is out of lockdown mode`)
    .setColor(client.color)
    message.channel.send({embeds:[unlockdownEmbed]})
}

exports.help = {
    name: 'unLock',
    aliases: ['unlock'],
    description: 'Unlock the server down.',
    usage: ''
};