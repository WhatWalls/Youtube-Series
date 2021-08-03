const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    let buttonEmojiInfo = client.emojis.cache.find(emoji => emoji.name === "CyberStar_Info")

    let buttonGeneral = new Discord.MessageButton()
        .setCustomId('help_general')
        .setEmoji('🗨️')
        .setStyle('PRIMARY');

    let buttonModeration = new Discord.MessageButton()
        .setCustomId('help_moderation')
        .setEmoji('⚙️')
        .setStyle('PRIMARY');

    let buttonInfo = new Discord.MessageButton()
        .setCustomId('help_info')
        .setEmoji(buttonEmojiInfo)
        .setStyle('PRIMARY');

    let buttonServer = new Discord.MessageButton()
        .setURL('https://discord.gg/rZPmmcyphN')
        .setStyle('LINK')
        .setLabel('Support Server')


    helpEmbed = new Discord.MessageEmbed()
    helpEmbed
        .setTitle('Help')
        .setDescription('' + client.config['emojis'].info + ' Click on the dedicated button for help in that category ' + client.config['emojis'].info + '\n \n**❯ General** commands : 🗨️\n**❯ Moderation** commands : ⚙️\n**❯ Command Info** commands : <:CyberStar_Info:847591363004596224>\n\n**NOTE:** *This bot is still in development!*\n\n Default prefix is `c!` but could be changed by the owner later on\n \n ' + client.config["hyperlinks"].link + '')
        .setColor(client.color)
        .setTimestamp()
        .setFooter("<> = required, () = optional")
    message.channel.send({ embeds: [helpEmbed], components: [[buttonGeneral, buttonModeration, buttonInfo, buttonServer]] })

};

exports.help = {
    name: 'help',
    aliases: ['help'],
    description: 'Help Commands.',
    usage: ''
};