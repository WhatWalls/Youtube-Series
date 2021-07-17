let config = require('../config.json')

exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${config.emojis.cross} You don't have the right perms for this command`);

    try {
        deleteAmounts = parseInt(args[0]);
        if (isNaN(deleteAmounts) || deleteAmounts >= 100) return message.channel.send(`Please give a valid number below a 100`)
        message.channel.bulkDelete(deleteAmounts + 1, true)
    } catch (err) {
        console.log(err)
        return message.channel.send(`Couldn't purge make sure it's a valid amount and that I have the right role`)
    }

}

exports.help = {
    name: 'purge',
    aliases: ['purge'],
    description: 'Purge a amount of messages.',
    usage: ''
};