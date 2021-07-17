require('dotenv-flow').config();
const Bot = require('./classes/Bot');
const client = new Bot();


(async function () {

    await client.registerClient();
    client.login(process.env.BOT_TOKEN);

})();