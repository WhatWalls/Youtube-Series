const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    let suggestAccept = new Discord.MessageButton()
    .setCustomId('suggestion_accept')
    .setLabel('Accept')
    .setStyle('SUCCESS');

    let suggestDeny = new Discord.MessageButton()
    .setCustomId('suggestion_deny')
    .setLabel('Deny')
    .setStyle('DANGER');

    let notEnabledSuggestionEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} Suggestions are not enabled`)
    .setColor(client.color)

    let noSuggestionChannelEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} No channel has been set`)
    .setColor(client.color)

    let data = await client.calls.getData(message.guild.id)
    if (!data.suggestion.toggle) return message.channel.send({embeds:[notEnabledSuggestionEmbed]})
    let channel = client.convertChannel(message.guild, data.suggestion.channel)
    if (!channel) return message.channel.send({embeds:[noSuggestionChannelEmbed]})

    let errorSuggestionEmbed = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} Make sure to give a suggestion`)
    .setColor(client.color)

    if(!args[0]) return message.channel.send({embeds:[errorSuggestionEmbed]})

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