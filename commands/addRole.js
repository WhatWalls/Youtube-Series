const Calls = require('../database/monk');
let config = require('../config.json')
const {
    convertChannel,
    convertRole
} = require("../utils/functions");
exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${config.emojis.cross} You don't have the right perms for this command`);

    let member = message.mentions.members.first()

    try { 

        let role = convertRole(message.guild, args[1])

        try {

            await member.roles.add(role)
            message.channel.send(`${config.emojis.check}  \`${role.name}\` has been given to \`${member.user.username}\``)

        } catch (err) {
            console.log(err)
            return message.reply(`${config.emojis.cross} Failed: Make sure my role is high enough`, true)

        }


    } catch (err) {

        return message.reply(`${config.emojis.cross} Failed: Make sure you supply a valid role`, true)

    }

};

exports.help = {
    name: 'addRole',
    aliases: ['addrole', 'giverole', 'promote'],
    description: 'Give a user a role.',
    usage: ''
};