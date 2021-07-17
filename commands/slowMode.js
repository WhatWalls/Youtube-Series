let config = require('../config.json')
exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${config.emojis.cross} You don't have the right perms for this command`);

    try { 
        let rate = args[0]
        if (!rate) return message.channel.send(`No valid amount of seconds suppied`)
        if (rate == "off") rate = 0
        message.channel.setRateLimitPerUser(rate)
        message.channel.send(`Slowmode has been set to \`${rate} seconds\``)
    } catch (err) {
        console.log(err)
    }

};

exports.help = {
    name: 'slowMode',
    aliases: ['slowmode', 'sm'],
    description: 'Give a user a role.',
    usage: ''
};