const Discord = require('discord.js')

module.exports = async (client, interaction) => {

    const {
        convertChannel,
        convertCategory,
        convertRole,
        isHexValid
    } = require(`${process.cwd()}/utils/functions`);
    const Calls = require(`${process.cwd()}/database/monk`);

    //CLIENT VARIABLES
    client.config = require(`${process.cwd()}/config.json`);
    client.prefix = client.config.defaults.prefix
    client.calls = Calls
    client.ms = require('ms');
    client.convertChannel = convertChannel;
    client.convertCategory = convertCategory;
    client.convertRole = convertRole;

    let userId = interaction.user.id
    let data = await client.calls.getData(interaction.message.guild.id)
    if (data.customizations.embedcolor) {
        client.color = data.customizations.embedcolor
    } else {
        client.color = "#fd5392"
    }

    let setupWelcome = new Discord.MessageEmbed()
        .setDescription('Select a welcome option')
        .setColor(client.color)

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
        .setColor(client.color)

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
        .setColor(client.color)

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
        .setColor(client.color)

    let buttonMuteRole = new Discord.MessageButton()
        .setCustomId('mute_role')
        .setLabel('Role')
        .setStyle('PRIMARY');

    let setupSuggestion = new Discord.MessageEmbed()
        .setDescription('Select a suggestion option')
        .setColor(client.color)

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
        .setColor(client.color)

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
        .setColor(client.color);

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

    let buttonPremiumColor = new Discord.MessageButton()
        .setCustomId('premium_color')
        .setLabel('Hex Color')
        .setStyle('PRIMARY');

    let setupPremium = new Discord.MessageEmbed()
        .setDescription('Select a paid option')
        .setColor(client.color);

    let buttonVerificationToggle = new Discord.MessageButton()
        .setCustomId('verification_toggle')
        .setLabel('Toggle')
        .setStyle('PRIMARY');

    let buttonVerificationRole = new Discord.MessageButton()
        .setCustomId('verification_role')
        .setLabel('Role')
        .setStyle('PRIMARY');

    let buttonVerificationChannel = new Discord.MessageButton()
        .setCustomId('verification_channel')
        .setLabel('Channel')
        .setStyle('PRIMARY');

    let setupVerification = new Discord.MessageEmbed()
        .setDescription('Select a verification option')
        .setColor(client.color);

    //EMBEDS

    let ticketEmbed = new Discord.MessageEmbed()
        .setAuthor('Ticket creation', interaction.message.guild.iconURL())
        .setThumbnail(`https://cdn.discordapp.com/attachments/848553985538261016/865713735825227786/png-transparent-computer-icons-symbol-technical-support-symbol-miscellaneous-service-silhouette-300x.png`)
        .setDescription('Press the button to create a ticket for support \n\n **NOTE:** *The bot will create a dedicated channel for you*')
        .setColor(client.color)

    let buttonTicket = new Discord.MessageButton()
        .setCustomId('ticket_support')
        .setLabel('Support')
        .setEmoji('📨')
        .setStyle('PRIMARY');

    let closeTicket = new Discord.MessageEmbed()
        .setDescription('Click on the button to close the ticket')
        .setColor(client.color);

    let ButtonCloseTicket = new Discord.MessageButton()
        .setCustomId('ticket_close')
        .setLabel('Close ticket')
        .setStyle('PRIMARY');

    let setupApplication = new Discord.MessageEmbed()
        .setDescription('Select a application option')
        .setColor(client.color);

    let buttonApplicationCategories = new Discord.MessageButton()
        .setCustomId('application_categories')
        .setLabel('Auto Setup')
        .setStyle('PRIMARY');

    let buttonApplicationQuestions = new Discord.MessageButton()
        .setCustomId('application_questions')
        .setLabel('Questions')
        .setStyle('PRIMARY');

    let buttonApplicationToggle = new Discord.MessageButton()
        .setCustomId('application_toggle')
        .setLabel('Toggle')
        .setStyle('PRIMARY');

    let errorNotValidChannelEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.cross} No valid channel supplied`)
        .setColor(client.color)

    let errorNotValidInputEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.cross} No valid input supplied`)
        .setColor(client.color)

    let errorNotValidRoleEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.cross} No valid role supplied`)
        .setColor(client.color)

    let errorSetupEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.config.emojis.cross} Please proceed to setup the functions before proceeding`)
        .setColor(client.color)


    await interaction.deferUpdate();

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

                    case 'verification':
                        interaction.message.channel.send({
                            embeds: [setupVerification],
                            components: [
                                [buttonVerificationRole, buttonVerificationToggle, buttonVerificationChannel]
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

                    case 'application':
                        interaction.message.channel.send({
                            embeds: [setupApplication],
                            components: [
                                [buttonApplicationCategories, buttonApplicationQuestions, buttonApplicationToggle]
                            ]
                        })
                        break;

                    case 'premium':
                        interaction.message.channel.send({
                            embeds: [setupPremium],
                            components: [
                                [buttonPremiumColor]
                            ]
                        })
                        break;

                }

                break;

        }


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
                    let errorTicketEmbed = new Discord.MessageEmbed()
                        .setDescription(`${client.config.emojis.cross} Something went wrong with creating a ticket channel please check my roles`)
                        .setColor(client.color)
                    return interaction.message.channel.send({ embeds: [errorTicketEmbed] })

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
                        let errorTicketEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.cross} Something went wrong with creating a ticket category or finding one`)
                            .setColor(client.color)
                        return interaction.message.channel.send({ embeds: [errorTicketEmbed] })

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

                        let channel = client.convertChannel(interaction.message.guild, data.ticket.channel)
                        let errorNoTicketChannelEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.cross} No ticket channel set`)
                            .setColor(client.color)
                        if (!channel) return interaction.message.channel.send({ embeds: [errorNoTicketChannelEmbed] })

                        let ticketCreated = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.check} The first ticket takes a minute to create after this it will be instant`)
                            .setColor(client.color)
                        let infoMessage = await channel.send({ embeds: [ticketCreated] })

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
                    let errorCategoryEmbed = new Discord.MessageEmbed()
                        .setDescription(`${client.config.emojis.cross} Something went wrong with creating a ticket category or finding one`)
                        .setColor(client.color)
                    return interaction.message.channel.send({ embeds: [errorCategoryEmbed] })

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
                            let channel = client.convertChannel(interaction.message.guild, finalInput.content)

                            if (!channel) return interaction.message.channel.send({ embeds: [errorNotValidChannelEmbed] })

                            else await client.calls.updateDbSetting(interaction.message.guild.id, `welcome.${interactionCategory[1]}`, channel.id)

                            let welcomeChannelEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.check} Welcome channel has set to the channel \`${channel.name}\``)
                                .setColor(client.color)
                            await interaction.message.channel.send({ embeds: [welcomeChannelEmbed] })

                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send({ embeds: [errorNotValidInputEmbed] })
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
                            await client.calls.updateDbSetting(interaction.message.guild.id, `welcome.${interactionCategory[1]}`, finalInput.content)
                            let welcomeMessageEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.check} Welcome messages has set to the message \`\`\`${finalInput.content}\`\`\``)
                                .setColor(client.color)
                            await interaction.message.channel.send({ embeds: [welcomeMessageEmbed] })
                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send({ embeds: [errorNotValidInputEmbed] })
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

                        if (!data.welcome.channel || !data.welcome.message) return interaction.message.channel.send({ embeds: [errorSetupEmbed] })
                        let toggle = data.welcome.toggle ? false : true
                        await client.calls.updateDbSetting(interaction.message.guild.id, `welcome.${interactionCategory[1]}`, toggle)
                        let status = toggle ? 'enabled' : 'disabled'
                        let welcomeToggleEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.check} Welcome messages are \`${status}\``)
                            .setColor(client.color)
                        interaction.message.channel.send({ embeds: [welcomeToggleEmbed] })

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
                            let channel = client.convertChannel(interaction.message.guild, finalInput.content)
                            if (!channel) return interaction.message.channel.send({ embeds: [errorNotValidChannelEmbed] })
                            else await client.calls.updateDbSetting(interaction.message.guild.id, `leave.${interactionCategory[1]}`, channel.id)
                            let leaveChannelEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.check} Leave channel has set to the channel \`${channel.name}\``)
                                .setColor(client.color)
                            await interaction.message.channel.send({ embeds: [leaveChannelEmbed] })
                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send({ embeds: [errorNotValidInputEmbed] })
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
                            await client.calls.updateDbSetting(interaction.message.guild.id, `leave.${interactionCategory[1]}`, finalInput.content)
                            let leaveMessageEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.check} Leave messages has set to the message \`\`\`${finalInput.content}\`\`\``)
                                .setColor(client.color)
                            await interaction.message.channel.send({ embeds: [leaveMessageEmbed] })
                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send({ embeds: [errorNotValidInputEmbed] })
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

                        if (!data.leave.channel || !data.leave.message) return interaction.message.channel.send({ embeds: [errorSetupEmbed] })
                        let toggle = data.leave.toggle ? false : true
                        await client.calls.updateDbSetting(interaction.message.guild.id, `leave.${interactionCategory[1]}`, toggle)
                        let status = toggle ? 'enabled' : 'disabled'
                        let leaveToggleEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.check} Leave messages are \`${status}\``)
                            .setColor(client.color)
                        interaction.message.channel.send({ embeds: [leaveToggleEmbed] })
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
                            let role = client.convertRole(interaction.message.guild, finalInput.content)
                            if (!role) return interaction.message.channel.send({ embeds: [errorNotValidRoleEmbed] })
                            else await client.calls.updateDbSetting(interaction.message.guild.id, `autorole.${interactionCategory[1]}`, role.id)
                            let autoRoleEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.check} Auto role has set to the role \`${role.id}\``)
                                .setColor(client.color)
                            await interaction.message.channel.send({ embeds: [autoRoleEmbed] })
                            waitingForInput.delete()
                        } catch (err) {
                            console.log(err)
                            let noInput = await interaction.message.channel.send({ embeds: [errorNotValidInputEmbed] })
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

                        if (!data.autorole.channel) return interaction.message.channel.send({ embeds: [errorSetupEmbed] })
                        let toggle = data.autorole.toggle ? false : true
                        await client.calls.updateDbSetting(interaction.message.guild.id, `autorole.${interactionCategory[1]}`, toggle)
                        let status = toggle ? 'enabled' : 'disabled'
                        let toggleAutoroleEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.check} Auto role messages are \`${status}\``)
                            .setColor(client.color)
                        interaction.message.channel.send({ embeds: [toggleAutoroleEmbed] })

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
                            let role = client.convertRole(interaction.message.guild, finalInput.content)
                            if (!role) return interaction.message.channel.send({ embeds: [errorNotValidRoleEmbed] })
                            else await client.calls.updateDbSetting(interaction.message.guild.id, `mute.${interactionCategory[1]}`, role.id)

                            let muteRoleEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.check} Mute role has set to the role \`${role.id}\``)
                                .setColor(client.color)
                            await interaction.message.channel.send({ embeds: [muteRoleEmbed] })

                            waitingForInput.delete()
                        } catch (err) {
                            console.log(err)
                            let noInput = await interaction.message.channel.send({ embeds: [errorNotValidInputEmbed] })
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
                            let channel = client.convertChannel(interaction.message.guild, finalInput.content)
                            if (!channel) return interaction.message.channel.send({ embeds: [errorNotValidChannelEmbed] })
                            else await client.calls.updateDbSetting(interaction.message.guild.id, `suggestion.${interactionCategory[1]}`, channel.id)

                            let suggestionChannelEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.check} Suggestion channel has set to the channel \`${channel.name}\``)
                                .setColor(client.color)
                            await interaction.message.channel.send({ embeds: [suggestionChannelEmbed] })

                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send({ embeds: [errorNotValidInputEmbed] })
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

                        if (!data.suggestion.channel) return interaction.message.channel.send({ embeds: [errorSetupEmbed] })
                        let toggle = data.suggestion.toggle ? false : true
                        await client.calls.updateDbSetting(interaction.message.guild.id, `suggestion.${interactionCategory[1]}`, toggle)
                        let status = toggle ? 'enabled' : 'disabled'

                        let toggleSuggestionEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.check} Suggestion messages are \`${status}\``)
                            .setColor(client.color)
                        interaction.message.channel.send({ embeds: [toggleSuggestionEmbed] })

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
                        let data1 = await client.calls.getData(interaction.message.guild.id)
                        console.log(data1.filter.words)
                        if (data1.filter.words.includes(finalInput.content + ',')) return interaction.message.channel.send(`\`${finalInput.content}\` is already added to the filter`)
                        else {
                            let newArray = data1.filter.words + finalInput.content.toLowerCase() + ','
                            await client.calls.updateDbSetting(interaction.message.guild.id, `filter.words`, newArray)
                        }

                        let filterAddEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.check} ${finalInput.content} is added to the filter`)
                            .setColor(client.color)
                        interaction.message.channel.send({ embeds: [filterAddEmbed] })

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
                        let data2 = await client.calls.getData(interaction.message.guild.id)
                        if (!data2.filter.words.includes(finalInput.content + ',')) return interaction.message.channel.send(`\`${finalInput.content}\` is not in the filter`)
                        else {
                            let newArray = data2.filter.words.replace(finalInput.content + ',', '')
                            await client.calls.updateDbSetting(interaction.message.guild.id, `filter.words`, newArray)
                        }


                        let filterRemoveEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.check} ${finalInput.content} is removed from the filter`)
                            .setColor(client.color)
                        interaction.message.channel.send({ embeds: [filterRemoveEmbed] })

                        break;

                    case 'toggle':

                        if (!data.filter.words) return interaction.message.channel.send({ embeds: [errorSetupEmbed] })
                        let toggle = data.filter.toggle ? false : true
                        await client.calls.updateDbSetting(interaction.message.guild.id, `filter.${interactionCategory[1]}`, toggle)
                        let status = toggle ? 'enabled' : 'disabled'

                        let filterToggleEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.check} Filtering is \`${status}\``)
                            .setColor(client.color)
                        interaction.message.channel.send({ embeds: [filterToggleEmbed] })

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
                            let channel = client.convertChannel(interaction.message.guild, finalInput.content)
                            if (!channel) return interaction.message.channel.send({ embeds: [errorNotValidChannelEmbed] })
                            else await client.calls.updateDbSetting(interaction.message.guild.id, `ticket.${interactionCategory[1]}`, channel.id)

                            let ticketChannelEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.check} Ticket channel has set to the channel \`${channel.name}\``)
                                .setColor(client.color)
                            await interaction.message.channel.send({ embeds: [ticketChannelEmbed] })

                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send({ embeds: [errorNotValidInputEmbed] })
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
                            let channel = client.convertChannel(interaction.message.guild, finalInput.content)
                            if (!channel) return interaction.message.channel.send({ embeds: [errorNotValidChannelEmbed] })
                            else await client.calls.updateDbSetting(interaction.message.guild.id, `ticket.${interactionCategory[1]}`, channel.id)

                            let ticketLogChannelEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.check} Ticket Log channel has set to the channel \`${channel.name}\``)
                                .setColor(client.color)
                            await interaction.message.channel.send({ embeds: [ticketLogChannelEmbed] })

                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send({ embeds: [errorNotValidInputEmbed] })
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
                            if (data.ticket.categories.includes(finalInput.content + ',')) {

                                let errorCategoryEmbed = new Discord.MessageEmbed()
                                    .setDescription(`${client.config.emojis.cross} is already a category`)
                                    .setColor(client.color)
                                return interaction.message.channel.send({ embeds: [errorCategoryEmbed] })

                            } else {
                                await client.calls.updateDbSetting(interaction.message.guild.id, `ticket.categories`, data.ticket.categories + finalInput.content + ',')

                                let addedCategoryEmbed = new Discord.MessageEmbed()
                                    .setDescription(`${client.config.emojis.check} \`${finalInput.content}\` has been added to the categories proceed to restart tickets`)
                                    .setColor(client.color)
                                interaction.message.channel.send({ embeds: [addedCategoryEmbed] })
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
                            if (data.ticket.categories.includes(finalInput.content)) {
                                let newData = data.ticket.categories.replace(finalInput.content + ',', '')
                                await client.calls.updateDbSetting(interaction.message.guild.id, `ticket.categories`, newData)
                                waitingForInput.delete()

                                let removeCategoryEmbed = new Discord.MessageEmbed()
                                    .setDescription(`${client.config.emojis.check} \`${finalInput.content}\` has been removed from the categories proceed to restart tickets`)
                                    .setColor(client.color)
                                interaction.message.channel.send({ embeds: [removeCategoryEmbed] })

                            } else {

                                let errorCategoryEmbed = new Discord.MessageEmbed()
                                    .setDescription(`${client.config.emojis.cross} \`${finalInput.content}\` isn't a category that the bot has saved`)
                                    .setColor(client.color)
                                return interaction.message.channel.send({ embeds: [errorCategoryEmbed] })

                            }
                        } catch (err) {
                            console.log(err)
                        }
                        break;

                    case "toggle":
                        try {
                            let message
                            if (!data.ticket.channel || !data.ticket.logchannel) return interaction.message.channel.send({ embeds: [errorSetupEmbed] })
                            let toggle = data.ticket.toggle ? false : true
                            let channel = client.convertChannel(interaction.message.guild, data.ticket.channel)

                            let noTicketChannelEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.cross} No ticket channel set`)
                                .setColor(client.color)
                            if (!channel) return interaction.message.channel.send({ embeds: [noTicketChannelEmbed] })

                            if (!toggle) {
                                try {
                                    message = await channel.messages.fetch(data.ticket.message);
                                    await message.delete()
                                } catch (err) {
                                    console.log(err + 'fout')
                                }
                                await client.calls.updateDbSetting(interaction.message.guild.id, `ticket.${interactionCategory[1]}`, toggle)

                                let ticketDisabledEmbed = new Discord.MessageEmbed()
                                    .setDescription(`${client.config.emojis.check} ticket system has been disabled`)
                                    .setColor(client.color)
                                return interaction.message.channel.send({ embeds: [ticketDisabledEmbed] })

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
                                await client.calls.updateDbSetting(interaction.message.guild.id, `ticket.message`, message.id)
                                await client.calls.updateDbSetting(interaction.message.guild.id, `ticket.${interactionCategory[1]}`, toggle)

                                let ticketMessageEmbed = new Discord.MessageEmbed()
                                    .setDescription(`${client.config.emojis.check} ticket message has been send to ${channel.name}`)
                                    .setColor(client.color)
                                interaction.message.channel.send({ embeds: [ticketMessageEmbed] })
                            }
                        } catch (err) {
                            let ticketMessageEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.cross} Ticket couldn't be created check the settings`)
                                .setColor(client.color)
                            interaction.message.channel.send({ embeds: [ticketMessageEmbed] })
                            return console.log(err)
                        }
                        break;

                    case "close":
                        try {
                            let channel = client.convertChannel(interaction.message.guild, data.ticket.logchannel)

                            let errorCloseEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.cross} Couldn't close the ticket no log channel set`)
                                .setColor(client.color)
                            if (!channel) return interaction.message.channel.send({ embeds: [errorCloseEmbed] })
                            else {

                                const logEmbed = new Discord.MessageEmbed()
                                    .setColor(client.color)
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

                                channel.send({ embeds: [logEmbed] })

                                let log = new Discord.MessageAttachment(Buffer.from(txt), `${interaction.message.channel.name}.txt`)

                                channel.send({ files: [log] });

                                setTimeout(function () { interaction.message.channel.delete() }, 5000)
                            }
                        } catch (err) {
                            console.log(err)
                        }
                        break


                }

                break;

            case 'application':

                if (!interaction.member.permissions.has('ADMINISTRATOR')) return

                switch (interactionCategory[1]) {

                    case 'categories':

                        let categoryAccept = interaction.message.channel.guild.channels.cache.find(c => c.name == 'accepted-applications' && c.type == "category");
                        let categoryDenied = interaction.message.channel.guild.channels.cache.find(c => c.name == 'denied-applications' && c.type == "category");
                        let categoryReview = interaction.message.channel.guild.channels.cache.find(c => c.name == 'review-applications' && c.type == "category");
                        let categoryVote = interaction.message.channel.guild.channels.cache.find(c => c.name == 'vote-applications' && c.type == "category");
                        let channelVote = interaction.message.channel.guild.channels.cache.find(c => c.name == 'vote-channel' && c.type == "text");
                        let channelStatus = interaction.message.channel.guild.channels.cache.find(c => c.name == 'application-status' && c.type == "text");

                        try {
                            if (!categoryAccept) {

                                categoryAccept = await interaction.message.guild.channels.create("accepted-applications", {
                                    type: 'category'
                                })

                                await client.calls.updateDbSetting(interaction.message.guild.id, `application.accept`, categoryAccept.id)

                                categoryAccept.permissionOverwrites.edit(interaction.message.guild.roles.everyone, {
                                    VIEW_CHANNEL: false
                                });

                                await interaction.message.guild.roles.cache.forEach(role => {

                                    categoryAccept.permissionOverwrites.create(role, {
                                        VIEW_CHANNEL: false
                                    });

                                })

                            } else {

                                await client.calls.updateDbSetting(interaction.message.guild.id, `application.accept`, categoryAccept.id)

                                await interaction.message.guild.roles.cache.forEach(role => {

                                    categoryAccept.permissionOverwrites.create(role, {
                                        VIEW_CHANNEL: false
                                    });

                                })

                            }

                            if (!categoryDenied) {

                                categoryDenied = await interaction.message.guild.channels.create("denied-applications", {
                                    type: 'category'
                                })

                                await client.calls.updateDbSetting(interaction.message.guild.id, `application.deny`, categoryDenied.id)

                                categoryDenied.permissionOverwrites.edit(interaction.message.guild.roles.everyone, {
                                    VIEW_CHANNEL: false
                                });

                                await interaction.message.guild.roles.cache.forEach(role2 => {

                                    categoryDenied.permissionOverwrites.create(role2, {
                                        VIEW_CHANNEL: false
                                    });

                                })
                            } else {

                                await client.calls.updateDbSetting(interaction.message.guild.id, `application.deny`, categoryDenied.id)

                                await interaction.message.guild.roles.cache.forEach(role2 => {

                                    categoryDenied.permissionOverwrites.create(role2, {
                                        VIEW_CHANNEL: false
                                    });

                                })

                            }

                            if (!categoryReview) {
                                categoryReview = await interaction.message.guild.channels.create("review-applications", {
                                    type: 'category'
                                })

                                await client.calls.updateDbSetting(interaction.message.guild.id, `application.review`, categoryReview.id)


                                categoryReview.permissionOverwrites.edit(interaction.message.guild.roles.everyone, {
                                    VIEW_CHANNEL: false
                                });


                                await interaction.message.guild.roles.cache.forEach(role3 => {

                                    categoryReview.permissionOverwrites.create(role3, {
                                        VIEW_CHANNEL: false
                                    });

                                })

                            } else {

                                await client.calls.updateDbSetting(interaction.message.guild.id, `application.review`, categoryReview.id)

                                await interaction.message.guild.roles.cache.forEach(role3 => {

                                    categoryReview.permissionOverwrites.create(role3, {
                                        VIEW_CHANNEL: false
                                    });

                                })

                            }

                            if (!categoryVote) {
                                let categoryVote = await interaction.message.guild.channels.create("vote-applications", {
                                    type: 'category'
                                })

                                categoryVote.permissionOverwrites.edit(interaction.message.guild.roles.everyone, {
                                    VIEW_CHANNEL: false
                                });

                                await client.calls.updateDbSetting(interaction.message.guild.id, `application.vote`, categoryVote.id)


                                if (!channelVote) {
                                    channelVote = await interaction.message.guild.channels.create("vote-channel", {
                                        type: 'text'
                                    })

                                    channelVote.permissionOverwrites.edit(interaction.message.guild.roles.everyone, {
                                        VIEW_CHANNEL: false
                                    });

                                    channelVote.setParent(categoryVote)

                                    await client.calls.updateDbSetting(interaction.message.guild.id, `application.votech`, channelVote.id)


                                    await interaction.message.guild.roles.cache.forEach(role5 => {

                                        channelVote.permissionOverwrites.create(role5, {
                                            VIEW_CHANNEL: false
                                        });

                                    })



                                } else {

                                    channelVote.setParent(categoryVote)

                                    await client.calls.updateDbSetting(interaction.message.guild.id, `application.votech`, channelVote.id)


                                    await interaction.message.guild.roles.cache.forEach(role5 => {

                                        channelVote.permissionOverwrites.create(role5, {
                                            VIEW_CHANNEL: false
                                        });

                                    })

                                }

                                await client.calls.updateDbSetting(interaction.message.guild.id, `application.vote`, categoryVote.id)


                                await interaction.message.guild.roles.cache.forEach(role4 => {

                                    categoryVote.permissionOverwrites.create(role4, {
                                        VIEW_CHANNEL: false
                                    });

                                })

                                categoryVote = categoryVote

                            } else {

                                if (!channelVote) {
                                    channelVote = await interaction.message.guild.channels.create("vote-channel", {
                                        type: 'text'
                                    })

                                    channelVote.permissionOverwrites.create(interaction.message.guild.roles.everyone, {
                                        VIEW_CHANNEL: false
                                    });

                                    channelVote.setParent(categoryVote)

                                    await client.calls.updateDbSetting(interaction.message.guild.id, `application.votech`, channelVote.id)


                                    interaction.message.guild.roles.cache.forEach(role5 => {

                                        channelVote.permissionOverwrites.create(role5, {
                                            VIEW_CHANNEL: false
                                        });


                                    })

                                } else {

                                    channelVote.setParent(categoryVote)

                                    await client.calls.updateDbSetting(interaction.message.guild.id, `application.votech`, channelVote.id)

                                    await interaction.message.guild.roles.cache.forEach(role5 => {

                                        channelVote.permissionOverwrites.create(role5, {
                                            VIEW_CHANNEL: false
                                        });

                                    })

                                }

                                await client.calls.updateDbSetting(interaction.message.guild.id, `application.vote`, categoryVote.id)

                                await interaction.message.guild.roles.cache.forEach(role5 => {

                                    categoryVote.permissionOverwrites.create(role5, {
                                        VIEW_CHANNEL: false
                                    });

                                })

                            }

                            if (!channelStatus) {
                                channelStatus = await interaction.message.guild.channels.create("application-status", {
                                    type: 'text'
                                })

                                await client.calls.updateDbSetting(interaction.message.guild.id, `application.status`, channelStatus.id)

                            } else {

                                await client.calls.updateDbSetting(interaction.message.guild.id, `application.status`, channelStatus.id)


                            }

                            let applicationSetupEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.check} Application categories have been setup give it a minute to update perms`)
                                .setColor(client.color)
                            interaction.message.channel.send({ embeds: [applicationSetupEmbed] })
                        } catch (err) {
                            console.log(err)
                        }

                        break;

                    case 'questions':
                        waitingForInput = await interaction.message.channel.send("Send a list of questions with Q:<Question> Q:<Question> max 12 **ALL IN ONE LINE**...")
                        input = await interaction.message.channel.awaitMessages({
                            filter: filter,
                            max: 1,
                            time: 60000,
                            errors: ["time"]
                        });
                        finalInput = input ? input.first() : "";
                        let questions = ''
                        let showQuestions = ''
                        let givenQuestions = finalInput.content.split('Q:')

                        let errorQuestionEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.cross} 12 Questions is max more will be added later`)
                            .setColor(client.color)
                        if (givenQuestions.length > 13) return interaction.message.channel.send({ embeds: [errorQuestionEmbed] })

                        let i = 1
                        await givenQuestions.forEach((question) => {
                            if (question == '') return;
                            questions += `${i}. ${question}_`
                            showQuestions += `${i}. ${question} \n`
                            i = i + 1
                        })

                        await client.calls.updateDbSetting(interaction.message.guild.id, `application.${interactionCategory[1]}`, questions)

                        let savedQuestionsEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.info} These questions have been saved \`\`\`${showQuestions}\`\`\``)
                            .setColor(client.color)
                        interaction.message.channel.send({ embeds: [savedQuestionsEmbed] })

                        break;

                    case 'toggle':

                        if (!data.application.accept || !data.application.deny || !data.application.review || !data.application.votech || !data.application.vote || !data.application.status || !data.application.accept) return interaction.message.channel.send({ embeds: [errorSetupEmbed] })
                        let toggle = data.application.toggle ? false : true
                        await client.calls.updateDbSetting(interaction.message.guild.id, `application.${interactionCategory[1]}`, toggle)
                        let status = toggle ? 'enabled' : 'disabled'

                        let toggleApplicationEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.check} Applications are \`${status}\``)
                            .setColor(client.color)
                        interaction.message.channel.send({ embeds: [toggleApplicationEmbed] })

                        break;

                    case 'delete':
                        interaction.message.channel.send('Deleting this channel in 5 seconds')
                        setTimeout(function () {
                            interaction.message.channel.delete()
                        }, 5000)
                        break;

                    case 'accept':
                        try {
                            let channelStatusAccept = client.convertChannel(interaction.message.guild, data.application.status)

                            let errorStatusChannel = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.cross} No status channel set`)
                                .setColor(client.color)
                            if (!channelStatusAccept) return interaction.message.channel.send({ embeds: [errorStatusChannel] })

                            let acceptCategory = client.convertCategory(interaction.message.guild, data.application.accept)

                            let errorAcceptChannel = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.cross} No accept category sett`)
                                .setColor(client.color)
                            if (!acceptCategory) return interaction.message.channel.send({ embeds: [errorAcceptChannel] })

                            await interaction.message.channel.setParent(acceptCategory)
                            let userTag = interaction.message.channel.name.split(`-`)

                            let applicationAcceptEmbeds = new Discord.MessageEmbed()
                                .setDescription(`${userTag[0]} has been accepted`)
                                .setColor(client.color)
                            channelStatusAccept.send({ embeds: [applicationAcceptEmbeds] })
                        } catch (err) {
                            console.log(err)
                        }
                        break;

                    case 'deny':
                        try {
                            let channelStatusDeny = client.convertChannel(interaction.message.guild, data.application.status)


                            let erroStatusApplication = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.cross} No status channel set`)
                                .setColor(client.color)
                            if (!channelStatusDeny) return interaction.message.channel.send({ embeds: [erroStatusApplication] })

                            let denyCategory = client.convertCategory(interaction.message.guild, data.application.deny)

                            let errorDenyEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.cross} No deny category set`)
                                .setColor(client.color)
                            if (!denyCategory) return interaction.message.channel.send({ embeds: [errorDenyEmbed] })

                            await interaction.message.channel.setParent(denyCategory)
                            let userTag = interaction.message.channel.name.split(`-`)

                            let applicationDeniedEmbeds = new Discord.MessageEmbed()
                                .setDescription(`${userTag[0]} has been denied`)
                                .setColor(client.color)
                            channelStatusDeny.send({ embeds: [applicationDeniedEmbeds] })
                        } catch (err) {
                            console.log(err)
                        }
                        break;

                }

                break;

            case "help":
                switch (interactionCategory[1]) {

                    case "general":

                        helpGeneralEmbed = interaction.message.embeds[0]
                            .setTitle("General Commands")
                            .setDescription(`**${client.prefix}apply** *Start a application*\n **${client.prefix}avatar (@user)** *Get a avatar*\n **${client.prefix}invitetop / inviteleaderboard** *Get top 10 inviters*\n **${client.prefix}suggest / suggestion <suggestion>** *Make a suggestion*`)
                            .setColor(client.color)
                        await interaction.message.edit({
                            embeds: [helpGeneralEmbed]
                        })

                        break;

                    case "moderation":

                        helpModerationEmbed = interaction.message.embeds[0]
                            .setTitle("Moderation Commands")
                            .setDescription(`**${client.prefix}setup** *Get all the setup features*\n**${client.prefix}ban <@user>** *Ban the mentioned user*\n **${client.prefix}unban <userId>** *Unban a user by id*\n **${client.prefix}banlist / blist** *Get a list of all the banned users*\n **${client.prefix}kick <@user>** *Kick a user*\n **${client.prefix}mute <@user> (time)** *Mute a user*\n **${client.prefix}unmute <@user>** *Unmute a user* \n **${client.prefix}addrole / promote <@user> <@role / roleid>** *Give a user a role*\n **${client.prefix}removerole <@user> <@role / roleid>** *Take a role from a user*\n **${client.prefix}demote <@user> <new @role> <old @role>** *Add and take a role from the user*\n **${client.prefix}lock** *Put the server in lockdown*\n **${client.prefix}unlock** *Take the server out of lockdown* \n **${client.prefix}purge <1/100>** *Remove a x amount of messages* \n **${client.prefix}simleave / simwelcome** *Simulate a leave or welcome message* \n **${client.prefix}slowmode / sm** *Put a cooldown on a channel* \n **${client.prefix}premium** *Info about the paid features*`)
                            .setColor(client.color)
                        await interaction.message.edit({
                            embeds: [helpModerationEmbed]
                        })

                        break;

                    case "info":

                        helpModerationEmbed = interaction.message.embeds[0]
                            .setTitle("Info Commands")
                            .setDescription(`**${client.prefix}botinfo** *Get all the info of the bot*\n**${client.prefix}roleinfo <@role / roleid>** *Get all the info of a role*\n **${client.prefix}serverinfo** *Get all the info of the server*\n **${client.prefix}userinfo <@user>** *Get all the info of a user*\n`)
                            .setColor(client.color)
                        await interaction.message.edit({
                            embeds: [helpModerationEmbed]
                        })

                        break;
                }
                break;

            case "premium":
                switch (interactionCategory[1]) {

                    case "color":

                        let errorPremiumEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.cross} This server is not allowed to use premium features type ${client.prefix}premium for more info`)
                            .setColor(client.color)
                        if (!data.premium) return interaction.message.channel.send({
                            embeds: [errorPremiumEmbed]
                        })

                        waitingForInput = await interaction.message.channel.send("Specify a valid hexcolor...")
                        input = await interaction.message.channel.awaitMessages({
                            filter: filter,
                            max: 1,
                            time: 60000,
                            errors: ["time"]
                        });
                        finalInput = input ? input.first() : "";
                        let color = finalInput.content
                        if (!color.includes('#')) color = `#${color}`

                        let errorColorEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.cross} \`${color}\` is not a valid hex color`)
                            .setColor(client.color)
                        if (!isHexValid(color)) return interaction.message.channel.send({
                            embeds: [errorColorEmbed]
                        })

                        await client.calls.updateDbSetting(interaction.message.guild.id, `customizations.embedcolor`, color)
                        data = await client.calls.getData(interaction.message.guild.id)
                        let embedColorEmbed = new Discord.MessageEmbed()
                            .setDescription(`\`${data.customizations.embedcolor}\` is the new embed color`)
                            .setColor(data.customizations.embedcolor)
                        interaction.message.channel.send({ embeds: [embedColorEmbed] })


                        break;

                }
                break;

            case 'verification':

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
                            let role = client.convertRole(interaction.message.guild, finalInput.content)
                            if (!role) return interaction.message.channel.send({ embeds: [errorNotValidRoleEmbed] })
                            else await client.calls.updateDbSetting(interaction.message.guild.id, `verification.${interactionCategory[1]}`, role.id)
                            let autoVerificationEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.check} Verification role has been set to \`${role.id}\``)
                                .setColor(client.color)
                            await interaction.message.channel.send({ embeds: [autoVerificationEmbed] })
                            waitingForInput.delete()
                        } catch (err) {
                            console.log(err)
                            let noInput = await interaction.message.channel.send({ embeds: [errorNotValidInputEmbed] })
                            waitingForInput.delete()
                            setTimeout(function () {
                                try {
                                    noInput.delete()
                                } catch { }
                            }, 10000)
                            return;
                        }

                        break;


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
                            let channel = client.convertChannel(interaction.message.guild, finalInput.content)
                            if (!channel) return interaction.message.channel.send({ embeds: [errorNotValidChannelEmbed] })
                            else await client.calls.updateDbSetting(interaction.message.guild.id, `verification.${interactionCategory[1]}`, channel.id)
                            let verificationChannelEmbed = new Discord.MessageEmbed()
                                .setDescription(`${client.config.emojis.check} Verification channel has set to the channel \`${channel.name}\``)
                                .setColor(client.color)
                            await interaction.message.channel.send({ embeds: [verificationChannelEmbed] })
                            waitingForInput.delete()
                        } catch (err) {
                            let noInput = await interaction.message.channel.send({ embeds: [errorNotValidInputEmbed] })
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

                        if (!data.verification.role) return interaction.message.channel.send({ embeds: [errorSetupEmbed] })
                        let toggle = data.verification.toggle ? false : true
                        await client.calls.updateDbSetting(interaction.message.guild.id, `verification.${interactionCategory[1]}`, toggle)
                        let status = toggle ? 'enabled' : 'disabled'
                        let toggleVerificationEmbed = new Discord.MessageEmbed()
                            .setDescription(`${client.config.emojis.check} Verification system has been \`${status}\``)
                            .setColor(client.color)
                        interaction.message.channel.send({ embeds: [toggleVerificationEmbed] })

                        break;


                }

                break;

        }



    }


};