/*
    NOHORNY
    - Idek. Jon wanted it.
*/

const config = require("../config.json");

exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
  message.channel.send({
    files: [
      config.NO_HORNY_ARRAY[Math.floor(Math.random() * config.IMAGE_ARRAY.length) ]
      ]
  });
};
