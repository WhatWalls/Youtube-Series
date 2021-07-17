const Discord = require('discord.js')
const Calls = require('../database/monk')
const {
    convertChannel,
    convertRole
} = require("../utils/functions");

exports.run = async (client, message, args) => {

    let suggestAccept = new Discord.MessageButton()
    .setCustomId('suggestion_accept')
    .setLabel('Accept')
    .setStyle('SUCCESS');

    let suggestDeny = new Discord.MessageButton()
    .setCustomId('suggestion_deny')
    .setLabel('Deny')
    .setStyle('DANGER');

    let data = await Calls.getData(message.guild.id)
    if (!data.suggestion.toggle) return message.channel.send(`Suggestions are not enabled`)
    let channel = convertChannel(message.guild, data.suggestion.channel)
    if (!channel) return message.channel.send(`No channel has been set`)

    let suggestionEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}'s suggestion`, message.author.displayAvatarURL())
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`\`\`\`${args.join(" ")}\`\`\``)
    .setFooter(`Vote below on this topic`, message.guild.iconURL())
    .setTimestamp()

    let suggestionMessage = await message.channel.send({embeds:[suggestionEmbed], components:[[suggestAccept, suggestDeny]]})
    await suggestionMessage.react('👍')
    await suggestionMessage.react('👎')

}

exports.help = {
    name: 'suggestion',
    aliases: ['suggestion', 'suggest'],
    description: 'Suggest something.',
    usage: ''
};