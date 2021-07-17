let config = require('../config.json')
const Calls = require('../database/monk')
const {
    convertChannel,
    convertRole
} = require("../utils/functions");

exports.run = async (client, message, args) => {

    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${config.emojis.cross} You don't have the right perms for this command`);

    let member = message.member

    try {
        let data = await Calls.getData(member.guild.id)
        if (!data.autorole.toggle || !data.autorole.role);
        else {
            try {
                let role = convertRole(member.guild, data.autorole.role)
                if (!role);
                else member.roles.add(role);
            } catch (err) {
                console.log(err)
            }
        }
        if (!data.welcome.toggle || !data.welcome.message || !data.welcome.channel);
        else {
            try {
                let channel = convertChannel(member.guild, data.welcome.channel)
                if (!channel);
                else {
                    let message = data.welcome.message
                    message = message.includes(`{User}`) ? message.replace(`{User}`, `<@${member.id}>`) : message
                    message = message.replace(`{Guild}`) ? message.replace(`{Guild}`, `\`${member.guild.name}\``) : message
                    message = message.includes(`{user}`) ? message.replace(`{user}`, `<@${member.id}>`) : message
                    message = message.replace(`{guild}`) ? message.replace(`{guild}`, `\`${member.guild.name}\``) : message
                    channel.send(message)
                }
            } catch (err) {
                console.log(err)
            }
        }
    } catch (err) {
        console.log(err)
    }
};
exports.help = {
    name: 'simWelcome',
    aliases: ['simwelcome', 'welcome'],
    description: 'Sim a welcome member.',
    usage: ''
};