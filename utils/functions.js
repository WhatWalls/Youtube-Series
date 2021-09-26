let config = require('../config.json');

module.exports = {
    convertChannel(guild, channel) {//Takes a channel id and converts it to a channel
        channel = channel.replace("<#", "")
        channel = channel.replace(">", "")
        channel = guild.channels.cache.find(c => c.id == channel && c.type == "GUILD_TEXT")
        if (channel) return channel;
        else return false;
    },
    convertCategory(guild, category) {//Takes a category id and converts it to a category
        category = guild.channels.cache.find(c => c.id == category && c.type == "GUILD_CATEGORY")
        if (category) return category;
        else return false;
    },
    convertRole(guild, role) { //Takes a role id and converts it to a role
        role = role.replace("<@&","")
        role = role.replace(">","")    
        role = guild.roles.cache.find(c => c.id == role)
        if (role) return role;
        else return false;
    },
    isHexValid (hex) { //Takes a hex color and checks if it is valid
        const cRegex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
        if(hex.match(cRegex)) return true
        else return false
    },
   
    
}