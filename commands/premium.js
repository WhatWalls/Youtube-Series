const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    let buttonServer = new Discord.MessageButton()
        .setURL('https://discord.gg/rZPmmcyphN')
        .setStyle('LINK')
        .setLabel('Support Server')


    userInfo = new Discord.MessageEmbed()
    userInfo
        .setTitle(`Premium Info`)
        .setDescription(`Premium features can be bought or won trough giveaways \n If you would like some more info then join the discord below or message \`Bacio001#2484\``)
        .setColor(client.color)
        .setTimestamp()
    message.channel.send({ embeds: [userInfo], components:[[buttonServer]]});

};

exports.help = {
    name: 'premium',
    aliases: ['paid', 'premium'],
    description: 'Get premium info.',
    usage: ''
};