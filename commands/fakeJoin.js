const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    if (client.config.autorole.toggle) {
        
        try {

            let role = client.convertRole(message.member.guild, client.config.autorole.roleid)
            await message.member.roles.add(role)
            message.member.send(`<@!${message.member.user.id}> you have been given the role \`${role.name}\``)


        } catch (err) {
            return console.log(err)
        }

    }

};

exports.help = {
    name: 'fakeJoin',
    aliases: ['fjoin'],
    description: 'Fake join to test join functions.',
    usage: ''
};