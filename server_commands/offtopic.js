/* 
    OFF-TOPIC
    - This pulls from an array of images and return to the chat a custom off-topic messsage.
*/

const config = require("../config.json");

exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
  message.channel.send({
    embed: {
      color: 16777215,
      title: "The Conversation is Off-Topic",
      description: process.env.OFFTOPIC_DESCRIPTION,
      image: {
        url:
          config.IMAGE_ARRAY[
            Math.floor(Math.random() * config.IMAGE_ARRAY.length)
          ]
      },
      footer: {
        text: "Requested by " + message.author.username,
        icon_url: message.author.displayAvatarURL
      }
    }
  });
};
