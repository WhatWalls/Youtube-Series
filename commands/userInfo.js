const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    let User = message.mentions.users.first()

    if (!User) User = message.author

    userInfo = new Discord.MessageEmbed()
    userInfo 
    .setTitle(`${User.tag}'s Info`)
    .setThumbnail(User.displayAvatarURL())
    .setDescription(`UserName: \`${User.username}\` \n UserDiscriminator: \`${User.discriminator}\` \n Userid: \`${User.id}\` \n Bot: \`${User.bot}\``)
    .setFooter(User.username, User.displayAvatarURL())
    .setColor(client.color)
    .setTimestamp()
    message.channel.send({embeds:[userInfo]});
    
};

exports.help = {
    name: 'userInfo',
    aliases: ['userinfo', 'whois'],
    description: 'Get info about a user.',
    usage: ''
};