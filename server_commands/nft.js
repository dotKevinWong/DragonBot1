/*
    NOHORNY
    - Idek. Jon wanted it.
*/
const config = require("../config.json");

exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
  message.channel.send({
    files: [
      config.NFT_ARRAY[Math.floor(Math.random() * config.NFT_ARRAY.length) ]
      ]
  });
};
