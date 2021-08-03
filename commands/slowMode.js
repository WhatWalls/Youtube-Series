const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${client.config.emojis.cross} You don't have the right perms for this command`);

    let notValidAmountEmbeds = new Discord.MessageEmbed()
    .setDescription(`${client.config.emojis.cross} Failed: No valid amount of seconds suppied`)
    .setColor(client.color)

    try { 
        let rate = args[0]
        if (!rate) return message.channel.send({embeds:[notValidAmountEmbeds]})
        if (rate == "off") rate = 0
        message.channel.setRateLimitPerUser(rate)

        let slowmodeEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.check} Slowmode has been set to \`${rate} seconds\``)
        .setColor(client.color)

        message.channel.send({embeds:[slowmodeEmbed]})
    } catch (err) {
        console.log(err)
    }

};

exports.help = {
    name: 'slowMode',
    aliases: ['slowmode', 'sm'],
    description: 'Give a user a role.',
    usage: ''
};