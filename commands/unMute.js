const Calls = require('../database/monk');
let config = require('../config.json')
const { convertChannel, convertRole } = require("../utils/functions");
const ms = require('ms');

exports.run = async (client, message, args) => {

    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${config.emojis.cross} You don't have the right perms for this command`);

    const member = message.mentions.users.first()

    if (!member) return message.channel.send(`No member mentioned`)

    const user = message.guild.members.cache.get(member.id)

    let data = await Calls.getData(message.guild.id)

    let muteRole

    if(data.mute.role) muteRole = convertRole(message.guild, data.mute.role)
    else muteRole = message.guild.roles.cache.find(c => c.name == `mute`)

    if (!muteRole) return message.channel.send(`No \`mute\` role has been created yet so I doubt any is even muted`)

    try {
        if (!user.roles.cache.has(muteRole.id)) return message.channel.send(`This user is not muted`)
        await user.roles.remove(muteRole)
        message.channel.send(`\`${member.username}\` is unmuted`)
    } catch (err) {
        console.log(err)
        return message.channel.send(`Couldn't unmute \`${member.username}\` make sure I have the right roles and a valid time`)
    }
}

exports.help = {
    name: 'unMute',
    aliases: ['unmute'],
    description: 'Unmute a member.',
    usage: ''
};