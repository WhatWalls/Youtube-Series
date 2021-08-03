const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    let notEnoughUserEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} There aren't any users banned in this guild`)
    .setColor(client.color)

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${client.config.emojis.cross} You don't have the right perms for this command`);

    let bans = await message.guild.bans.fetch()

    if (bans.size == 0) return message.channel.send({embeds:[notEnoughUserEmbed]})
    let arrayBans = ''
    bans.forEach((bannedUser) => {
        arrayBans += `${bannedUser.user.username} (${bannedUser.user.id}) \n`
    })

    try {
        banListEmbed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}'s ban list`)
        .setDescription(`There are currently \`${bans.size}\` members banned \n \`\`\`${arrayBans}\`\`\``)
        message.channel.send({embeds:[banListEmbed]})
    } catch (err) {
        console.log(err)
    }

}

exports.help = {
    name: 'banList',
    aliases: ['banlist', 'blist'],
    description: 'Get a ban list.',
    usage: ''
};