const monk = require('monk');
const db = monk(process.env.DATABASE_STRING);

class Calls {

    //Ticket System
    //Suggestion System
    //Logging system
    //Moderation
    //

    static async insertGuild(id) {
        const collection = db.get('guilds')
        return (await collection.insert({
            guild_id: id,
            welcome: {
                channel: '',
                message: '',
                toggle: false
            },
            leave: {
                channel: '',
                message: '',
                toggle: false
            },
            autorole: {
                role: '',
                toggle: false
            }, 
            ticket: {
                channel: '',
                logchannel: '',
                message: '',
                categories: '',
                toggle: false
            },
            suggestion: {
                channel: '',
                toggle: false
            },
            customizations: {
                embedcolor: '#808080'
            },
            mute: {
                role: ''
            },
            filter: {
                words: '',
                toggle: false
            },
            
        }))
    }

    static async removeGuild(id) {
        const collection = db.get('guilds')
        return (await collection.findOneAndDelete({ guild_id: id }))
    }

    static async updateDbSetting(id, props, value) {
        const collection = db.get('guilds')
        return (await collection.findOneAndUpdate({ guild_id: id }, { $set: { [props]: value } }))
    }

    static async getData(id) {
        const collection = db.get('guilds')
        return (await collection.findOne({ guild_id: id }))
    }

    static async updateFilterPushOrPull(id, props, value, pop) {
        const collection = db.get('guilds')
        if (pop = 'push') {
            return (await collection.update({ id: id }, { $push: { [props]: value } }));
        } else {
            return (await collection.update({ id: id }, { $pull: { [props]: value } }));
        }
    }
    
}

module.exports = Calls;

