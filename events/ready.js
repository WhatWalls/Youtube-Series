require('dotenv').config()
let config = require('../config.json')

module.exports = async client => {
    client.user.setActivity(config.defaults.statusMessage, { type: config.defaults.statusType })
    console.log('\x1b[33m%s\x1b[0m', 'The bot is online');
};