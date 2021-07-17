const Calls = require('../database/monk');
const Discord = require("discord.js")
let config = require('../config.json')

exports.run = async (client, message, args) => {

    let Selection = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageSelectMenu()
        .setCustomId('SetupSelection')
        .setPlaceholder('Select a setup option')
        .addOptions(
            
            {
                label: 'Welcome',
                value: 'setup_welcome',
                emoji: '👋',
                description: 'Setup the welcome features',
            }, {
                label: 'Leave',
                value: 'setup_leave',
                emoji: '🤝',
                description: 'Setup the leave features',
            }, {
                label: 'Auto Role',
                value: 'setup_autorole',
                emoji: '🤝',
                description: 'Setup the auto role features',
            }, {
                label: 'Mute',
                value: 'setup_mute',
                emoji: '🔇',
                description: 'Setup the mute features',
            }, {
                label: 'Suggestion',
                value: 'setup_suggestion',
                emoji: '💡',
                description: 'Setup the suggestion features',
            }, {
                label: 'Filter',
                value: 'setup_filter',
                emoji: '📢',
                description: 'Setup the filter features',
            }, {
                label: 'Ticket',
                value: 'setup_ticket',
                emoji: '📨',
                description: 'Setup the ticket features',
            },

        ),
    )

    setupEmbed = new Discord.MessageEmbed()
    setupEmbed
            .setDescription('Setup the bot to your wishes')
            .setColor("#fd5392")
    message.channel.send({embeds:[setupEmbed], components:[Selection]})

};

exports.help = {
    name: 'setup',
    aliases: ['setup', 'settings'],
    description: 'Setup commands.',
    usage: ''
};