const Calls = require('../database/monk');
let config = require('../config.json')

exports.run = async (client, message, args) => {

    if (message.author.id != '173347297181040640') return;

    Calls.removeGuild(message.guild.id)
    Calls.insertGuild(message.guild.id)

};

exports.help = {
    name: 'resetDatabase',
    aliases: ['resetdatabase'],
    description: 'Reset the database.',
    usage: ''
};