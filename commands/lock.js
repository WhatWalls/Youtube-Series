let config = require('../config.json')

exports.run = async (client, message, args) => {

    // try {
    //     await message.guild.roles.cache.forEach( async (role) => {
    //         role.edit(role.permissions.remove('SEND_MESSAGES')) 
    //     })
    // } catch (err) {

    // }


    message.channel.send(`Server is in lockdown mode`)
}

exports.help = {
    name: 'lock',
    aliases: ['lock', 'lockdown'],
    description: 'Lock the server down.',
    usage: ''
};