const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    let noUserErroEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} No member mentioned`)
    .setColor(client.color)

    let noMuteRoleErroEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} No \`mute\` role has been created yet so I doubt any is even muted`)
    .setColor(client.color)

    let notMutedEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} This user is not muted`)
    .setColor(client.color)

    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${client.config.emojis.cross} You don't have the right perms for this command`);

    const member = message.mentions.users.first()

    if (!member) return message.channel.send({embeds:[noUserErroEmbed]})

    const user = message.guild.members.cache.get(member.id)

    let data = await client.calls.getData(message.guild.id)

    let muteRole

    if(data.mute.role) muteRole = client.convertRole(message.guild, data.mute.role)
    else muteRole = message.guild.roles.cache.find(c => c.name == `mute`)

    if (!muteRole) return message.channel.send({embeds:[noMuteRoleErroEmbed]})

    try {
        if (!user.roles.cache.has(muteRole.id)) return message.channel.send({embeds:[notMutedEmbed]})
        await user.roles.remove(muteRole)

        let unmuteEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.check} \`${member.username}\` is unmuted`)
        .setColor(client.color)
        message.channel.send({embeds:[unmuteEmbed]})
    } catch (err) {
        console.log(err)
        let unmuteErrorEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.cross} Couldn't unmute \`${member.username}\` make sure I have the right roles and a valid time`)
        .setColor(client.color)
        return message.channel.send({embeds:[unmuteErrorEmbed]})
    }
}

exports.help = {
    name: 'unMute',
    aliases: ['unmute'],
    description: 'Unmute a member.',
    usage: ''
};