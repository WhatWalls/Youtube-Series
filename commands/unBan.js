let config = require('../config.json')

exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${config.emojis.cross} You don't have the right perms for this command`);

    let id = args[0]

    if (!id) return message.channel.send(`No id supplied`)

    let bans = await message.guild.bans.fetch()
    if (bans.size == 0) return message.channel.send(`There aren't any users banned in this guild`)

    try {

        let bannedUser = bans.find(b => b.user.id == id)
        message.guild.members.unban(bannedUser.user)
        message.channel.send(`\`${bannedUser.user.username}\` has been unbanned`)

    } catch (err) {

        console.log(err)
        return message.channel.send(`Couldn't unban the user with the id \`${id}\``)

    }
}

exports.help = {
    name: 'unBan',
    aliases: ['unban'],
    description: 'Unban a member.',
    usage: ''
};