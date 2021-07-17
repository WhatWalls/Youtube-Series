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

    if (!muteRole) return message.channel.send(`No \`mute\` role found please proceed to create one`)

    try {
        if (user.roles.cache.has(muteRole.id)) return message.channel.send(`This user is already muted`)
        await user.roles.add(muteRole)
        let time
        try {
            time = args[1] ? `and will be unmuted after  \`${ms(ms(args[1]), { long: true })}\`` : ''
            message.channel.send(`\`${member.username}\` has been muted ${time}`)
        } catch (err) {
            message.channel.send(`\`${args[1]}\` is not a valid time supply a valid one or none`)
        }
    } catch (err) {
        console.log(err)
        return message.channel.send(`Couldn't mute \`${member.username}\` make sure I have the right roles and a valid time`)
    }

    try {
        if (!args[1]) return;
        setTimeout(async () => {
            await user.roles.remove(muteRole);
        }, ms(args[1]))
    } catch (err) {
        console.log(err)
        return message.channel.send(`Couldn't unmute \`${member.username}\` but his mute has expired make sure I have the right roles`)
    }
}

exports.help = {
    name: 'mute',
    aliases: ['mute'],
    description: 'Mute a member.',
    usage: ''
};