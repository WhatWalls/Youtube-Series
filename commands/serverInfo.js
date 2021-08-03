const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    let guild = message.guild;
    serverEmbed = new Discord.MessageEmbed()
    serverEmbed
        .setTitle(`${guild.name}'s server info!`)
        .setDescription(` ❯ Server Region: \`${guild.region}\` \n  ❯ Member Count: \`${guild.memberCount}\`  \n  ❯ Afk Timer: \`${guild.afkTimeout}\` \n  ❯ Verification Level: \`${guild.verificationLevel}\`\n  ❯ MessageNotifications: \`${guild.defaultMessageNotifications}\` \n ❯ Server Owner: \`${guild.owner}\` \n ❯ Guild Creation: \`${guild.createdAt}\` `)
        .setFooter(message.guild.name, message.guild.iconURL())
        .setColor(client.color)
        .setTimestamp()
    message.channel.send({ embeds: [serverEmbed]});
};

exports.help = {
    name: 'serverInfo',
    aliases: ['serverinfo', 'server'],
    description: 'Get info about a server.',
    usage: ''
};