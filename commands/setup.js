const Discord = require("discord.js")

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
            }, {
                label: 'Application',
                value: 'setup_application',
                emoji: '📝',
                description: 'Setup the application features',
            }, {
                label: 'Capcha Features',
                value: 'setup_verification',
                emoji: '🔐',
                description: 'Setup the capcha / verification features',
            }, {
                label: 'Premium Features',
                value: 'setup_premium',
                emoji: '✏️',
                description: 'Setup the premium features',
            },

        ),
    )

    setupEmbed = new Discord.MessageEmbed()
    setupEmbed
            .setDescription('Setup the bot to your wishes')
            .setColor(client.color)
    message.channel.send({embeds:[setupEmbed], components:[Selection]})

};

exports.help = {
    name: 'setup',
    aliases: ['setup', 'settings'],
    description: 'Setup commands.',
    usage: ''
};