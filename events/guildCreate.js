const Calls = require('../database/monk')

module.exports = async (client, guild) => {

    try {
        await Calls.insertGuild(guild.id);
    } catch (error) {
        console.error(error);
    }

};