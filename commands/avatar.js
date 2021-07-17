const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    let User = message.mentions.users.first()

    if (!User) User = message.author
    avatarEmbed = new Discord.MessageEmbed()
    avatarEmbed 
    .setTitle(`${User.tag}'s Avatar`)
    .setImage(User.displayAvatarURL())
    .setFooter(User.username, User.displayAvatarURL())
    .setColor("#fd5392")
    .setTimestamp()
    message.channel.send({embeds:[avatarEmbed]});
    
};

exports.help = {
    name: 'avatar',
    aliases: ['avatar'],
    description: 'Get a avatar.',
    usage: ''
};