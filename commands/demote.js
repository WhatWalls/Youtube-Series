const Calls = require('../database/monk');
let config = require('../config.json')
const {
    convertChannel,
    convertRole
} = require("../utils/functions");

exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${config.emojis.cross} You don't have the right perms for this command`);
    try {
        let newRole = convertRole(message.guild, args[1])
        let oldRole = convertRole(message.guild, args[2])
        let member = message.mentions.members.first()
        await member.roles.remove(oldRole)
        await member.roles.add(newRole)
        message.channel.send(`\`${member.user.username}\` has been demoted to \`${newRole.name}\``)
    } catch (err) {
        console.log(err)
        return message.channel.send(`Sorry I couldn't demote ${message.metions.members.first()}`)
    }   

};

exports.help = {
    name: 'demote',
    aliases: ['demote'],
    description: 'demote a user.',
    usage: ''
};