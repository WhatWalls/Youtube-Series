const { Client: DiscordClient, Collection } = require('discord.js');
const path = require('path');
const fs = require('fs').promises;

class Bot extends DiscordClient {
    constructor() {
        super({
            intents: ["DIRECT_MESSAGES",
            "GUILDS",
            "GUILD_MEMBERS",
            "GUILD_MESSAGES",
            "GUILD_PRESENCES",
            "GUILD_BANS",
            "GUILD_MESSAGE_REACTIONS",
            "DIRECT_MESSAGE_REACTIONS",
            "GUILD_EMOJIS_AND_STICKERS",
            "GUILD_MESSAGE_TYPING",
            "GUILD_WEBHOOKS",
            "GUILD_INTEGRATIONS",
            "GUILD_PRESENCES",
            "GUILD_INVITES"]
        });        /**
         * @type {Collection<string, {run: function(...args), help: { name:string, aliases: string[] }}>}
         */
        this.commands = new Collection();
    }
    /**
     * @returns {Promise<import('discord.js').User>|null}
     * @param {string} search
     */
    async resolveUser(search) {
        if (!search || typeof search !== 'string') return null;
        let user = null;
        if (search.match(/^<@!?(\d+)>$/)) user = await this.users.fetch(search.match(/^<@!?(\d+)>$/)[1]).catch(() => { });
        if (search.match(/^!?(\w+)#(\d+)$/) && !user) user = this.users.cache.find((u) => u.username === search.match(/^!?(\w+)#(\d+)$/)[0] && u.discriminator === search.match(/^!?(\w+)#(\d+)$/)[1]);
        if (!user) user = await this.users.fetch(search).catch(() => { });
        return user;
    }
    async registerClient() {
        await this.registerCommands();
        await this.registerEvents();
    }
    /**
     * @private
     */
    async registerCommands() {
        const filePath = path.join(__dirname, '..', 'commands');
        const files = await fs.readdir(filePath);
        for (const file of files) {
            if (file.endsWith('.js')) {
                /**
                 * @type {{run: function(...args), help: { name:string }}}
                */
                const command = require(path.join(filePath, file));
                this.commands.set(command.help.name, command);
                
            }
        }
    }
    /**
     * @private
     */
    async registerEvents() {
        const filePath = path.join(__dirname, '..', 'events');
        const files = await fs.readdir(filePath);
        for (const file of files) {
            if (file.endsWith('.js')) {
                /**
                 * @type {function(Bot, ...args)}
                 */
                const event = require(path.join(filePath, file));
                this.on(file.split('.')[0], (...args) => event(this, ...args));
                delete require.cache[require.resolve(path.join(filePath, file))];
            }
        }
    }

    clean = (text) => {
        if (typeof (text) === "string") {
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    };
}

module.exports = Bot;