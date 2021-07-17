const Calls = require('../database/monk')
const { convertChannel, convertRole } = require("../utils/functions");

module.exports = async (client, member) => {
 
    try {
        let data = await Calls.getData(member.guild.id)
        if (!data.leave.toggle || !data.leave.message || !data.leave.channel) return;
        else {
            try {
                let channel = convertChannel(member.guild, data.leave.channel)
                if (!channel) return;
                else {
                    let message = data.leave.message
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