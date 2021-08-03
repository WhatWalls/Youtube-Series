const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${client.config.emojis.cross} You don't have the right perms for this command`);

    let noIdSuppliedEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} No id supplied`)
    .setColor(client.color)

    let noUserBannedEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} There aren't any users banned in this guild`)
    .setColor(client.color)

    let id = args[0]

    if (!id) return message.channel.send({embeds:[noIdSuppliedEmbed]})

    let bans = await message.guild.bans.fetch()
    if (bans.size == 0) return message.channel.send({embeds:[noUserBannedEmbed]})

    try {

        let bannedUser = bans.find(b => b.user.id == id)
        
        let banEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.check} \`${bannedUser.user.username}\` has been unbanned`)
        .setColor(client.color)

        message.guild.members.unban(bannedUser.user)
        message.channel.send({embeds:[banEmbed]})

    } catch (err) {

        console.log(err)
        let couldntBanEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.cross} \`${bannedUser.user.username}\` Couldn't unban the user with the id \`${id}\``)
        .setColor(client.color)
        return message.channel.send({embeds:[couldntBanEmbed]})

    }
}

exports.help = {
    name: 'unBan',
    aliases: ['unban'],
    description: 'Unban a member.',
    usage: ''
};