let config = require('../config.json')

exports.run = async (client, message, args) => {

    // try {
    //     await message.guild.roles.cache.forEach( async (role) => {
    //         role.edit(role.permissions.add('SEND_MESSAGES')) 
    //     })
    // } catch (err) {

    // }

    message.channel.send(`Server is out of lockdown mode`)
}

exports.help = {
    name: 'unLock',
    aliases: ['unlock'],
    description: 'Unlock the server down.',
    usage: ''
};