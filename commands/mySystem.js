const Discord = require('discord.js')
const si = require('systeminformation');


exports.run = async (client, message, args) => {
    let cpu = await si.cpu()
    let graphics = await si.cpuTemperature()

    console.log(await si.graphics().display())

};

exports.help = {
    name: 'mySystem',
    aliases: ['system', 'mysystem'],
    description: 'My system.',
    usage: ''
};