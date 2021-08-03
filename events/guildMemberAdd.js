const Calls = require('../database/monk')
const { convertChannel, convertRole } = require("../utils/functions");
const Discord = require('discord.js')

module.exports = async (client, member) => {
 
    const {
        convertChannel,
        convertCategory,
        convertRole,
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
    
    let data = await client.calls.getData(member.guild.id)

    if (data.verification.role && data.verification.channel && data.verification.toggle) {

    }

    if (data.customizations.embedcolor) {
        client.color = data.customizations.embedcolor
    } else {
        client.color = "#fd5392"
    }
    
    try {
        let data = await Calls.getData(member.guild.id)
        if (!data.autorole.toggle || !data.autorole.role);
        else {
            try {
                let role = convertRole(member.guild, data.autorole.role)
                if (!role);
                else member.roles.add(role);
            } catch (err) {
                console.log(err)
            }
        }
        if (!data.welcome.toggle || !data.welcome.message || !data.welcome.channel);
        else {
            try {
                let channel = convertChannel(member.guild, data.welcome.channel)
                if (!channel);
                else {
                    let message = data.welcome.message
                    message = message.includes(`{User}`) ? message.replace(`{User}`, `<@${member.id}>`) : message
                    message = message.replace(`{Guild}`) ?  message.replace(`{Guild}`, `\`${member.guild.name}\``) : message
                    message = message.includes(`{user}`) ? message.replace(`{user}`, `<@${member.id}>`) : message
                    message = message.replace(`{guild}`) ?  message.replace(`{guild}`, `\`${member.guild.name}\``) : message

                    let welcomeEmbed = new Discord.MessageEmbed()
                    .setAuthor(`| ${member.guild.name}`, `${member.guild.iconURL()}`)
                    .setDescription(message)
                    .setColor(client.color)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter(`Member count: ${member.guild.memberCount.toString()}` )

                    channel.send({embeds:[welcomeEmbed]})
                }
            } catch (err) {
                console.log(err)
            }
        }
    } catch (err) {
        console.log(err)
    }
};