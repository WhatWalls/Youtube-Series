const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    let leaderboard = ''

    message.guild.invites.fetch().then((invites) => {
        const inviteCounter = {}

        invites.forEach((invite) => {
            const {
                uses,
                inviter
            } = invite
            const {
                username,
                discriminator
            } = inviter

            const name = `${username}#${discriminator}`

            inviteCounter[name] = (inviteCounter[name] || 0) + uses
        })

        const sortedInvites = Object.keys(inviteCounter).sort(
            (a, b) => inviteCounter[b] - inviteCounter[a]
        )

        if (sortedInvites.length > 10) sortedInvites.length = 10

        for (const invite of sortedInvites) {
            const count = inviteCounter[invite]
            leaderboard += `\n\`${invite}\` has \`${count}\` invites`
        }

        inviteLeaderboard = new Discord.MessageEmbed()
        inviteLeaderboard
        .setTitle(`Top 10 inviters of ${message.guild.name}`)
        .setDescription(`${leaderboard}`)
        .setFooter(`Pages will be added later`)
        message.channel.send({embeds:[inviteLeaderboard]})

        console.log(leaderboard)
    })
}

exports.help = {
    name: 'inviteTop',
    aliases: ['invitetop', 'inviteleaderboard'],
    description: 'Get the invite leaderboard.',
    usage: ''
};