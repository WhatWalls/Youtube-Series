let config = require('../config.json')

exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${config.emojis.cross} You don't have the right perms for this command`);

    const member = message.mentions.members.first()

    if (!member) return message.channel.send(`No valid member mentioned`)

    try {
        await member.kick()
        message.channel.send(`\`${member.user.username}\` has been kicked`)
    } catch (err) {
        message.channel.send(`I couldn't kick \`${member.user.username}\` member`)
    }
}

exports.help = {
    name: 'kick',
    aliases: ['kick'],
    description: 'Kick a member.',
    usage: ''
};