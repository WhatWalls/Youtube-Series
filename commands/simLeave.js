const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    
    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${client.config.emojis.cross} You don't have the right perms for this command`);

    let member = message.member

    try {
        let data = await client.calls.getData(member.guild.id)
        if (!data.leave.toggle || !data.leave.message || !data.leave.channel) return;
        else {
            try {
                let channel = client.convertChannel(member.guild, data.leave.channel)
                if (!channel) return;
                else {
                    let message = data.leave.message
                    message = message.includes(`{User}`) ? message.replace(`{User}`, `<@${member.id}>`) : message
                    message = message.replace(`{Guild}`) ? message.replace(`{Guild}`, `\`${member.guild.name}\``) : message
                    message = message.includes(`{user}`) ? message.replace(`{user}`, `<@${member.id}>`) : message
                    message = message.replace(`{guild}`) ? message.replace(`{guild}`, `\`${member.guild.name}\``) : message
                    
                    let leaveEmbed = new Discord.MessageEmbed()
                    .setAuthor(`| ${member.guild.name}`, `${member.guild.iconURL()}`)
                    .setDescription(message)
                    .setColor(client.color)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter(`Member count: ${member.guild.memberCount.toString()}` )

                    channel.send({embeds:[leaveEmbed]})
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
    name: 'simLeave',
    aliases: ['simleave', 'leave'],
    description: 'Sim a leave member.',
    usage: ''
};