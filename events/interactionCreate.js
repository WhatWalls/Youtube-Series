const Calls = require('../database/monk')
const Discord = require('discord.js')
const {
    convertChannel,
    convertRole
} = require("../utils/functions");

module.exports = async (client, interaction) => {

    let setupWelcome = new Discord.MessageEmbed()
        .setDescription('Select a welcome option')
        .setColor("#fd5392")

    let buttonWelcomeChannel = new Discord.MessageButton()
        .setCustomId('welcome_channel')
        .setLabel('Channel')
        .setStyle('PRIMARY');

    let buttonWelcomeMessage = new Discord.MessageButton()
        .setCustomId('welcome_message')
        .setLabel('Message')
        .setStyle('PRIMARY');

    let buttonWelcomeToggle = new Discord.MessageButton()
        .setCustomId('welcome_toggle')
        .setLabel('Toggle')
        .setStyle('PRIMARY')

    let setupLeave = new Discord.MessageEmbed()
        .setDescription('Select a leave option')
        .setColor("#fd5392")

    let buttonLeaveChannel = new Discord.MessageButton()
        .setCustomId('leave_channel')
        .setLabel('Channel')
        .setStyle('PRIMARY');

    let buttonLeaveMessage = new Discord.MessageButton()
        .setCustomId('leave_message')
        .setLabel('Message')
        .setStyle('PRIMARY');

    let buttonLeaveToggle = new Discord.MessageButton()
        .setCustomId('leave_toggle')
        .setLabel('Toggle')
        .setStyle('PRIMARY')

    let setupAutoRole = new Discord.MessageEmbed()
        .setDescription('Select a autorole option')
        .setColor("#fd5392")

    let buttonAutoRoleRole = new Discord.MessageButton()
        .setCustomId('autorole_role')
        .setLabel('Role')
        .setStyle('PRIMARY');

    let buttonAutoRoleToggle = new Discord.MessageButton()
        .setCustomId('autorole_toggle')
        .setLabel('Toggle')
        .setStyle('PRIMARY')

    let setupMute = new Discord.MessageEmbed()
        .setDescription('Select a mute option')
        .setColor("#fd5392")

    let buttonMuteRole = new Discord.MessageButton()
        .setCustomId('mute_role')
        .setLabel('Role')
        .setStyle('PRIMARY');

    let setupSuggestion = new Discord.MessageEmbed()
        .setDescription('Select a suggestion option')
        .setColor("#fd5392")

    let buttonSuggestionChannel = new Discord.MessageButton()
        .setCustomId('suggestion_channel')
        .setLabel('Channel')
        .setStyle('PRIMARY');

    let buttonSuggestionToggle = new Discord.MessageButton()
        .setCustomId('suggestion_toggle')
        .setLabel('Toggle')
        .setStyle('PRIMARY');

    let setupFilter = new Discord.MessageEmbed()
        .setDescription('Select a filter option')
        .setColor("#fd5392")

    let buttonFilterAddWord = new Discord.MessageButton()
        .setCustomId('filter_addword')
        .setLabel('Add Word')
        .setStyle('PRIMARY');

    let buttonFilterRemoveWord = new Discord.MessageButton()
        .setCustomId('filter_removeword')
        .setLabel('Remove Word')
        .setStyle('PRIMARY');

    let buttonFilterToggle = new Discord.MessageButton()
        .setCustomId('filter_toggle')
        .setLabel('Toggle')
        .setStyle('PRIMARY');

    let setupTicket = new Discord.MessageEmbed()
        .setDescription('Select a ticket option')
        .setColor("#fd5392");

    let buttonTicketChannel = new Discord.MessageButton()
        .setCustomId('ticket_channel')
        .setLabel('Channel')
        .setStyle('PRIMARY');

    let buttonTicketLogChannel = new Discord.MessageButton()
        .setCustomId('ticket_logchannel')
        .setLabel('Log Channel')
        .setStyle('PRIMARY');

    let buttonTicketAddCategory = new Discord.MessageButton()
        .setCustomId('ticket_addcategory')
        .setLabel('Add Category')
        .setStyle('PRIMARY');

    let buttonTicketRemoveCategory = new Discord.MessageButton()
        .setCustomId('ticket_removecategory')
        .setLabel('Remove Category')
        .setStyle('PRIMARY');

    let buttonTicketToggle = new Discord.MessageButton()
        .setCustomId('ticket_toggle')
        .setLabel('Toggle')
        .setStyle('PRIMARY');

    let ticketEmbed = new Discord.MessageEmbed()
        .setAuthor('Ticket creation', interaction.message.guild.iconURL())
        .setThumbnail(`https://cdn.discordapp.com/attachments/848553985538261016/865713735825227786/png-transparent-computer-icons-symbol-technical-support-symbol-miscellaneous-service-silhouette-300x.png`)
        .setDescription('Press the button to create a ticket for support \n\n **NOTE:** *The bot will create a dedicated channel for you*')
        .setColor("#fd5392")

    let buttonTicket = new Discord.MessageButton()
        .setCustomId('ticket_support')
        .setLabel('Support')
        .setEmoji('📨')
        .setStyle('PRIMARY');

    let closeTicket = new Discord.MessageEmbed()
        .setDescription('Click on the button to close the ticket')
        .setColor("#fd5392");

    let ButtonCloseTicket = new Discord.MessageButton()
        .setCustomId('ticket_close')
        .setLabel('Close ticket')
        .setStyle('PRIMARY');

    await interaction.deferUpdate();

    let userId = interaction.user.id

    if (interaction.isSelectMenu()) {

        let interactionCategory = interaction.values.toString().split('_')

        switch (interactionCategory[0]) {

            case 'setup':

                if (!interaction.member.permissions.has('ADMINISTRATOR')) return

                switch (interactionCategory[1]) {

                    case 'welcome':
                        interaction.message.channel.send({
                            embeds: [setupWelcome],
                            components: [
                                [buttonWelcomeChannel, buttonWelcomeMessage, buttonWelcomeToggle]
                            ]
                        })
                        break;

                    case 'leave':
                        interaction.message.channel.send({
                            embeds: [setupLeave],
                            components: [
                                [buttonLeaveChannel, buttonLeaveMessage, buttonLeaveToggle]
                            ]
                        })
                        break;

                    case 'autorole':
                        interaction.message.channel.send({
                            embeds: [setupAutoRole],
                            components: [
                                [buttonAutoRoleRole, buttonAutoRoleToggle]
                            ]
                        })
                        break;

                    case 'mute':
                        interaction.message.channel.send({
                            embeds: [setupMute],
                            components: [
                                [buttonMuteRole]
                            ]
                        })
                        break;

                    case 'suggestion':
                        interaction.message.channel.send({
                            embeds: [setupSuggestion],
                            components: [
                                [buttonSuggestionChannel, buttonSuggestionToggle]
                            ]
                        })
                        break;

                    case 'filter':
                        interaction.message.channel.send({
                            embeds: [setupFilter],
                            components: [
                                [buttonFilterAddWord, buttonFilterRemoveWord, buttonFilterToggle]
                            ]
                        })
                        break;

                    case 'ticket':
                        interaction.message.channel.send({
                            embeds: [setupTicket],
                            components: [
                                [buttonTicketChannel, buttonTicketLogChannel, buttonTicketAddCategory, buttonTicketRemoveCategory, buttonTicketToggle]
                            ]
                        })
                        break;

                }

                break;

        }

        let data = await Calls.getData(interaction.message.guild.id)

        let ticketoptions = data.ticket.categories.split(',')
        await ticketoptions.forEach(async (option) => {
            if (option == '') return

            if (option == interaction.values.toString()) {
                let ticketsCategoryName = `tickets`
                let ticketChannel

                try {

                    ticketChannel = await interaction.message.guild.channels.create(`${interaction.user.tag} ${option} ticket`, {
                        type: 'text'
                    })

                } catch (err) {

                    console.log(err)
                    return interaction.message.channel.send(`Something went wrong with creating a ticket channel please check my roles`)

                }

                const lock = async (parent) => {
                    try {

                        await ticketChannel.setParent(parent, { lockPermissions: true })

                        await ticketChannel.permissionOverwrites.edit(interaction.user, {
                            VIEW_CHANNEL: true
                        });

                        await ticketChannel.send({ embeds: [closeTicket], components: [[ButtonCloseTicket]] })

                    } catch (err) {

                        console.log(err)
                        return interaction.message.channel.send(`Something went wrong with creating a ticket category or finding one`)

                    }
                }

                try {

                    let parent = await interaction.message.guild.channels.cache.find(c => c.name == ticketsCategoryName && c.type == "category");

                    if (!parent) {

                        parent = await interaction.message.guild.channels.create(ticketsCategoryName, {
                            type: 'category',
                        });

                        await interaction.message.guild.roles.cache.forEach(role => {

                            parent.permissionOverwrites.edit(role, {
                                VIEW_CHANNEL: false
                            });

                        })

                        let channel = convertChannel(interaction.message.guild, data.ticket.channel)
                        let infoMessage = await channel.send(`The first ticket takes a minute to create after this it will be instant`)
                        setTimeout(function () {
                            lock(parent)
                            try {
                                infoMessage.delete()
                            } catch (err) {
                                console.log(err)
                            }
                        }, 60000)


                    } else {

                        lock(parent)

                    }

                } catch (err) {

                    console.log(err)
                    return interaction.message.channel.send(`Something went wrong with creating a ticket category or finding one`)

                }
            }

        })

    }

    if (interaction.isButton()) {

        let waitingForInput
        let input
        let finalInput

        let interactionCategory = interaction.customId.toString().split('_')
        const filter = (message) => {
            return message.author.id === userId;
        }

        switch (interactionCategory[0]) {

            case 'welcome':

                if (!interaction.member.permissions.has('ADMINISTRATOR')) return

                switch (interactionCategory[1]) {

                    case 'channel':

                        try {
                            waitingForInput = await interaction.message.channel.send("Waiting for input...")
                            input = await interaction.message.channel.awaitMessages({
                                filter: filter,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            });
                            finalInput = input ? input.first() : "";
                            let channel = convertChannel(interaction.message.guild, finalInput.content)
                            if (!channel) return interaction.message.channel.send('Not a valid channel supplied')
                            else await Calls.updateDbSetting(interaction.message.guild.id, `welcome.${interactionCategory[1]}`, channel.id)
                            await interaction.message.channel.send(`Welcome channel has set to the channel \`${channel.id}\``)
                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send('No valid input given')
                            waitingForInput.delete()
                            setTimeout(function () {
                                try {
                                    noInput.delete()
                                } catch { }
                            }, 10000)
                            return;
                        }

                        break;

                    case 'message':

                        try {
                            waitingForInput = await interaction.message.channel.send("Waiting for input...")
                            input = await interaction.message.channel.awaitMessages({
                                filter: filter,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            });
                            finalInput = input ? input.first() : "";
                            await Calls.updateDbSetting(interaction.message.guild.id, `welcome.${interactionCategory[1]}`, finalInput.content)
                            await interaction.message.channel.send(`Welcome messages has set to the message \`\`\`${finalInput.content}\`\`\``)
                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send('No valid input given')
                            waitingForInput.delete()
                            setTimeout(function () {
                                try {
                                    noInput.delete()
                                } catch { }
                            }, 10000)
                            return;
                        }

                        break;

                    case 'toggle':

                        let data = await Calls.getData(interaction.message.guild.id)
                        if (!data.welcome.channel || !data.welcome.message) return interaction.message.channel.send(`Please setup the function before proceeding`)
                        let toggle = data.welcome.toggle ? false : true
                        await Calls.updateDbSetting(interaction.message.guild.id, `welcome.${interactionCategory[1]}`, toggle)
                        let status = toggle ? 'enabled' : 'disabled'
                        interaction.message.channel.send(`Welcome messages are \`${status}\``)

                        break;


                }

                break;

            case 'leave':

                if (!interaction.member.permissions.has('ADMINISTRATOR')) return

                switch (interactionCategory[1]) {

                    case 'channel':

                        try {
                            waitingForInput = await interaction.message.channel.send("Waiting for input...")
                            input = await interaction.message.channel.awaitMessages({
                                filter: filter,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            });
                            finalInput = input ? input.first() : "";
                            let channel = convertChannel(interaction.message.guild, finalInput.content)
                            if (!channel) return interaction.message.channel.send('Not a valid channel supplied')
                            else await Calls.updateDbSetting(interaction.message.guild.id, `leave.${interactionCategory[1]}`, channel.id)
                            await interaction.message.channel.send(`Leave channel has set to the channel \`${channel.id}\``)
                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send('No valid input given')
                            waitingForInput.delete()
                            setTimeout(function () {
                                try {
                                    noInput.delete()
                                } catch { }
                            }, 10000)
                            return;
                        }

                        break;

                    case 'message':

                        try {
                            waitingForInput = await interaction.message.channel.send("Waiting for input...")
                            input = await interaction.message.channel.awaitMessages({
                                filter: filter,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            });
                            finalInput = input ? input.first() : "";
                            await Calls.updateDbSetting(interaction.message.guild.id, `leave.${interactionCategory[1]}`, finalInput.content)
                            await interaction.message.channel.send(`Leave messages has set to the message \`\`\`${finalInput.content}\`\`\``)
                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send('No valid input given')
                            waitingForInput.delete()
                            setTimeout(function () {
                                try {
                                    noInput.delete()
                                } catch { }
                            }, 10000)
                            return;
                        }

                        break;

                    case 'toggle':

                        let data = await Calls.getData(interaction.message.guild.id)
                        if (!data.leave.channel || !data.leave.message) return interaction.message.channel.send(`Please setup the function before proceeding`)
                        let toggle = data.leave.toggle ? false : true
                        await Calls.updateDbSetting(interaction.message.guild.id, `leave.${interactionCategory[1]}`, toggle)
                        let status = toggle ? 'enabled' : 'disabled'
                        await interaction.message.channel.send(`Leave messages are \`${status}\``)

                        break;


                }

                break;

            case 'autorole':

                if (!interaction.member.permissions.has('ADMINISTRATOR')) return

                switch (interactionCategory[1]) {

                    case 'role':

                        try {
                            waitingForInput = await interaction.message.channel.send("Waiting for input...")
                            input = await interaction.message.channel.awaitMessages({
                                filter: filter,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            });
                            finalInput = input ? input.first() : "";
                            let role = convertRole(interaction.message.guild, finalInput.content)
                            if (!role) return interaction.message.channel.send('Not a valid role supplied')
                            else await Calls.updateDbSetting(interaction.message.guild.id, `autorole.${interactionCategory[1]}`, role.id)
                            await interaction.message.channel.send(`Auto role has set to the role \`${role.id}\``)
                            waitingForInput.delete()
                        } catch (err) {
                            console.log(err)
                            let noInput = await interaction.message.channel.send('No valid input given')
                            waitingForInput.delete()
                            setTimeout(function () {
                                try {
                                    noInput.delete()
                                } catch { }
                            }, 10000)
                            return;
                        }

                        break;

                    case 'toggle':

                        let data = await Calls.getData(interaction.message.guild.id)
                        if (!data.suggestion.channel) return interaction.message.channel.send(`Please setup the function before proceeding`)
                        let toggle = data.autorole.toggle ? false : true
                        await Calls.updateDbSetting(interaction.message.guild.id, `autorole.${interactionCategory[1]}`, toggle)
                        let status = toggle ? 'enabled' : 'disabled'
                        interaction.message.channel.send(`Auto role messages are \`${status}\``)

                        break;


                }

                break;

            case 'mute':

                if (!interaction.member.permissions.has('ADMINISTRATOR')) return

                switch (interactionCategory[1]) {

                    case 'role':

                        try {
                            waitingForInput = await interaction.message.channel.send("Waiting for input...")
                            input = await interaction.message.channel.awaitMessages({
                                filter: filter,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            });
                            finalInput = input ? input.first() : "";
                            let role = convertRole(interaction.message.guild, finalInput.content)
                            if (!role) return interaction.message.channel.send('Not a valid role supplied')
                            else await Calls.updateDbSetting(interaction.message.guild.id, `mute.${interactionCategory[1]}`, role.id)
                            await interaction.message.channel.send(`Mute role has set to the role \`${role.id}\``)
                            waitingForInput.delete()
                        } catch (err) {
                            console.log(err)
                            let noInput = await interaction.message.channel.send('No valid input given')
                            waitingForInput.delete()
                            setTimeout(function () {
                                try {
                                    noInput.delete()
                                } catch { }
                            }, 10000)
                            return;
                        }

                        break;

                }

                break;

            case 'suggestion':

                if (!interaction.member.permissions.has('ADMINISTRATOR')) return

                switch (interactionCategory[1]) {


                    case 'channel':

                        try {
                            waitingForInput = await interaction.message.channel.send("Waiting for input...")
                            input = await interaction.message.channel.awaitMessages({
                                filter: filter,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            });
                            finalInput = input ? input.first() : "";
                            let channel = convertChannel(interaction.message.guild, finalInput.content)
                            if (!channel) return interaction.message.channel.send('Not a valid channel supplied')
                            else await Calls.updateDbSetting(interaction.message.guild.id, `suggestion.${interactionCategory[1]}`, channel.id)
                            await interaction.message.channel.send(`Suggestion channel has set to the channel \`${channel.id}\``)
                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send('No valid input given')
                            waitingForInput.delete()
                            setTimeout(function () {
                                try {
                                    noInput.delete()
                                } catch { }
                            }, 10000)
                            return;
                        }

                        break;

                    case 'toggle':

                        let data = await Calls.getData(interaction.message.guild.id)
                        if (!data.suggestion.channel) return interaction.message.channel.send(`Please setup the function before proceeding`)
                        let toggle = data.autorole.toggle ? false : true
                        await Calls.updateDbSetting(interaction.message.guild.id, `suggestion.${interactionCategory[1]}`, toggle)
                        let status = toggle ? 'enabled' : 'disabled'
                        interaction.message.channel.send(`Suggestion messages are \`${status}\``)

                        break;

                    case 'accept':

                        embed = interaction.message.embeds[0]
                            .setColor("#00ff00")
                        await interaction.message.edit({
                            embeds: [embed]
                        })

                        break;
                    case 'deny':

                        embed = interaction.message.embeds[0]
                            .setColor("#ff0000")
                        await interaction.message.edit({
                            embeds: [embed]
                        })

                        break;

                }

                break;

            case 'filter':

                if (!interaction.member.permissions.has('ADMINISTRATOR')) return

                switch (interactionCategory[1]) {

                    case 'addword':
                        waitingForInput = await interaction.message.channel.send("Waiting for input use word1, word2 for a list...")
                        input = await interaction.message.channel.awaitMessages({
                            filter: filter,
                            max: 1,
                            time: 60000,
                            errors: ["time"]
                        });
                        finalInput = input ? input.first() : "";
                        let data1 = await Calls.getData(interaction.message.guild.id)
                        console.log(data1.filter.words)
                        if (data1.filter.words.includes(finalInput.content + ',')) return interaction.message.channel.send(`\`${finalInput.content}\` is already added to the filter`)
                        else {
                            let newArray = data1.filter.words + finalInput.content.toLowerCase() + ','
                            await Calls.updateDbSetting(interaction.message.guild.id, `filter.words`, newArray)
                        }
                        interaction.message.channel.send(`${finalInput.content} is added to the filter`)

                        break;

                    case 'removeword':

                        waitingForInput = await interaction.message.channel.send("Waiting for input...")
                        input = await interaction.message.channel.awaitMessages({
                            filter: filter,
                            max: 1,
                            time: 60000,
                            errors: ["time"]
                        });
                        finalInput = input ? input.first() : "";
                        let data2 = await Calls.getData(interaction.message.guild.id)
                        if (!data2.filter.words.includes(finalInput.content + ',')) return interaction.message.channel.send(`\`${finalInput.content}\` is not in the filter`)
                        else {
                            let newArray = data2.filter.words.replace(finalInput.content + ',', '')
                            await Calls.updateDbSetting(interaction.message.guild.id, `filter.words`, newArray)
                        }
                        interaction.message.channel.send(`${finalInput.content} is removed from the filter`)

                        break;

                    case 'toggle':

                        let data = await Calls.getData(interaction.message.guild.id)
                        if (!data.filter.words) return interaction.message.channel.send(`Please setup the function before proceeding`)
                        let toggle = data.filter.toggle ? false : true
                        await Calls.updateDbSetting(interaction.message.guild.id, `filter.${interactionCategory[1]}`, toggle)
                        let status = toggle ? 'enabled' : 'disabled'
                        interaction.message.channel.send(`Filtering is \`${status}\``)

                        break;

                }

                break;

            case 'ticket':

                if (!interaction.member.permissions.has('ADMINISTRATOR')) return

                switch (interactionCategory[1]) {

                    case 'channel':

                        try {
                            waitingForInput = await interaction.message.channel.send("Waiting for input...")
                            input = await interaction.message.channel.awaitMessages({
                                filter: filter,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            });
                            finalInput = input ? input.first() : "";
                            let channel = convertChannel(interaction.message.guild, finalInput.content)
                            if (!channel) return interaction.message.channel.send('Not a valid channel supplied')
                            else await Calls.updateDbSetting(interaction.message.guild.id, `ticket.${interactionCategory[1]}`, channel.id)
                            await interaction.message.channel.send(`Ticket channel has set to the channel \`${channel.id}\``)
                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send('No valid input given')
                            waitingForInput.delete()
                            setTimeout(function () {
                                try {
                                    noInput.delete()
                                } catch { }
                            }, 10000)
                            return;
                        }

                        break;

                    case 'logchannel':

                        try {
                            waitingForInput = await interaction.message.channel.send("Waiting for input...")
                            input = await interaction.message.channel.awaitMessages({
                                filter: filter,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            });
                            finalInput = input ? input.first() : "";
                            let channel = convertChannel(interaction.message.guild, finalInput.content)
                            if (!channel) return interaction.message.channel.send('Not a valid channel supplied')
                            else await Calls.updateDbSetting(interaction.message.guild.id, `ticket.${interactionCategory[1]}`, channel.id)
                            await interaction.message.channel.send(`Ticket Log channel has set to the channel \`${channel.id}\``)
                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send('No valid input given')
                            waitingForInput.delete()
                            setTimeout(function () {
                                try {
                                    noInput.delete()
                                } catch { }
                            }, 10000)
                            return;
                        }

                        break;

                    case "addcategory":
                        try {
                            waitingForInput = await interaction.message.channel.send("Name of category you want added...")
                            input = await interaction.message.channel.awaitMessages({
                                filter: filter,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            });
                            finalInput = input ? input.first() : "";
                            let data = await Calls.getData(interaction.message.guild.id)
                            if (data.ticket.categories.includes(finalInput.content + ',')) {
                                return interaction.message.channel.send(`\`${finalInput.content}\` is already a category`)
                            } else {
                                await Calls.updateDbSetting(interaction.message.guild.id, `ticket.categories`, data.ticket.categories + finalInput.content + ',')
                                interaction.message.channel.send(`\`${finalInput.content}\` has been added to the categories proceed to restart tickets`)
                            }
                        } catch (err) {
                            console.log(err)
                        }
                        break;

                    case "removecategory":
                        try {
                            waitingForInput = await interaction.message.channel.send("Name of category you want remove...")
                            input = await interaction.message.channel.awaitMessages({
                                filter: filter,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            });
                            finalInput = input ? input.first() : "";
                            let data = await Calls.getData(interaction.message.guild.id)
                            if (data.ticket.categories.includes(finalInput.content)) {
                                let newData = data.ticket.categories.replace(finalInput.content + ',', '')
                                await Calls.updateDbSetting(interaction.message.guild.id, `ticket.categories`, newData)
                                waitingForInput.delete()
                                interaction.message.channel.send(`\`${finalInput.content}\` has been removed from the categories proceed to restart tickets`)
                            } else {
                                return interaction.message.channel.send(`\`${finalInput.content}\` isn't a category that the bot has saved`)
                            }
                        } catch (err) {
                            console.log(err)
                        }
                        break;

                    case "toggle":
                        try {
                            let message
                            let data = await Calls.getData(interaction.message.guild.id)
                            if (!data.ticket.channel || !data.ticket.logchannel) return interaction.message.channel.send(`Please setup the function before proceeding`)
                            let toggle = data.ticket.toggle ? false : true
                            let channel = convertChannel(interaction.message.guild, data.ticket.channel)
                            if (!channel) return interaction.message.channel.send('Update the ticket channel first')
                            if (!toggle) {
                                try {
                                    message = await channel.messages.fetch(data.ticket.message);
                                    await message.delete()
                                } catch (err) {
                                    console.log(err + 'fout')
                                }
                                await Calls.updateDbSetting(interaction.message.guild.id, `ticket.${interactionCategory[1]}`, toggle)
                                return interaction.message.channel.send(`ticket system has been disabled`)
                            } else {
                                if (!data.ticket.categories) {
                                    message = await channel.send({ embeds: [ticketEmbed], components: [[buttonTicket]] })
                                } else {

                                    let categories = []
                                    let optionArray = data.ticket.categories.split(',')
                                    await optionArray.forEach((category) => {
                                        if (category == '') return

                                        categories.push({
                                            label: category,
                                            value: category,
                                        })
                                    })

                                    let Selection = new Discord.MessageActionRow()
                                        .addComponents(
                                            new Discord.MessageSelectMenu()
                                                .setCustomId('TicketSelection')
                                                .setPlaceholder('Select a ticket option')
                                                .addOptions(

                                                    categories

                                                ),
                                        )

                                    message = await channel.send({ embeds: [ticketEmbed], components: [Selection] })
                                }
                                await Calls.updateDbSetting(interaction.message.guild.id, `ticket.message`, message.id)
                                await Calls.updateDbSetting(interaction.message.guild.id, `ticket.${interactionCategory[1]}`, toggle)
                                interaction.message.channel.send(`ticket message has been send to ${channel.name}`)
                            }
                        } catch (err) {
                            interaction.message.channel.send("Ticket couldn't be created check the settings")
                            return console.log(err)
                        }
                        break;

                    case "close": {
                        try {
                            let data = await Calls.getData(interaction.message.guild.id)
                            let channel = convertChannel(interaction.message.guild, data.ticket.logchannel)
                            if (!channel) return interaction.message.channel.send(`Couldn't close the ticket no log channel set`)
                            else {

                                const logEmbed = new Discord.MessageEmbed()
                                    .setColor("#fd5392")
                                    .setAuthor(`Ticket Closed by ${interaction.member.user.tag}`, interaction.member.user.displayAvatarURL())
                                    .setDescription([
                                        `*View the ticket log transcript below*\n`,
                                        `**Ticket:** ${interaction.message.channel.name}`].join('\n'))
                                    .setTimestamp()

                                let msgs = await interaction.message.channel.messages.fetch({
                                    limit: 100
                                })
                                let txt = '';

                                msgs = msgs.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
                                txt += `##################################################################\n`;
                                txt += `####                                                          ####\n`;
                                txt += `####           ${interaction.message.channel.name}                    ####\n`;
                                txt += `####                                                          ####\n`;
                                txt += `##################################################################\n\n`;


                                msgs.forEach(msg => {
                                    if (msg.content) {

                                        txt += `${msg.author.tag}\n`;
                                        txt += `${msg.content}\n`;
                                        txt += `\n`;
                                    }
                                });

                                interaction.message.channel.send(`Closing ticket in 5 seconds`)

                                channel.send({embeds:[logEmbed]})

                                let log = new Discord.MessageAttachment(Buffer.from(txt), `${interaction.message.channel.name}.txt`)

                                channel.send({files:[log]});

                                setTimeout(function () { interaction.message.channel.delete() }, 5000)
                            }
                        } catch (err) {
                            console.log(err)
                        }
                    }


                }

                break;

        }



    }


};