const Calls = require('../database/monk')
const { convertChannel, convertRole } = require("../utils/functions");

module.exports = async (client, member) => {
 
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
        if (!data.join.toggle || !data.join.message || !data.join.channel);
        else {
            try {
                let channel = convertChannel(member.guild, data.join.channel)
                if (!channel);
                else {
                    let message = data.join.message
                    message = message.includes(`{User}`) ? message.replace(`{User}`, `<@${member.id}>`) : message
                    message = message.replace(`{Guild}`) ?  message.replace(`{Guild}`, `\`${member.guild.name}\``) : message
                    message = message.includes(`{user}`) ? message.replace(`{user}`, `<@${member.id}>`) : message
                    message = message.replace(`{guild}`) ?  message.replace(`{guild}`, `\`${member.guild.name}\``) : message
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