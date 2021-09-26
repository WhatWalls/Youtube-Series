const Discord = require('discord.js');


module.exports = async (client, member) => {
 
    if (client.config.autorole.toggle) {
        
        try {

            let role = client.convertRole(member.guild, client.config.autorole.roleid) //Convert the role id to a role
            await member.roles.add(role) // Add the role to the member
            member.send(`<@!${member.user.id}> you have been given the role ${role.name}`) //Send a confermation message to the member

        } catch (err) {
            return console.log(err)
        }

    }

};