const Calls = require('../database/monk');
let config = require('../config.json');

module.exports = {
    convertChannel(guild, channel) {
        channel = channel.replace("<#", "")
        channel = channel.replace(">", "")
        channel = guild.channels.cache.find(c => c.id == channel && c.type == "text")
        if (channel) return channel;
        else return false;
    },
    convertRole(guild, role) {
        role = role.replace("<@&","")
        role = role.replace(">","")    
        role = guild.roles.cache.find(c => c.id == role)
        if (role) return role;
        else return false;
    },
    isHexValid (hex) {
        const cRegex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
        if(hex.match(cRegex)) return true
        else return false
    },
    async checkFilter (message) {
        if (message.author.bot) return false
        let data = await Calls.getData(message.guild.id)
        let words = data.filter.words
        let args = message.content.split(" ");
        let inFilter = false
        args.forEach((arg) => {
            if (words.includes(arg.toLowerCase()+',')) inFilter = true            
        })
        return inFilter
    }

    
}