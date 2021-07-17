const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    let i = 0;
    let creationDate = client.user.createdAt;

    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    let created = creationDate.toString().replace("Central European Summer Time","CEST")
    let restarted = client.readyAt.toString().replace("Central European Summer Time","CEST")

    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    client.guilds.cache.forEach(server => {
        i = i + 1
    });

    let botInfoEmbed = new Discord.MessageEmbed()
    .setTitle(client.user.username + " Info")
    .setDescription("❯ Guild Count: " + i.toString() + "\n❯ Bot Creator: Bacio001#2484\n❯ Creation Date: " + created+ "\n❯ Restart Date: " + restarted+ "\n❯ Uptime: " + uptime)
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("#fd5392")
    .setTimestamp()
    message.channel.send({embeds: [botInfoEmbed]});

};

exports.help = {
    name: 'botInfo',
    aliases: ['botinfo', 'bot'],
    description: 'Get the bot info.',
    usage: ''
};