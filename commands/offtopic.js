/* 
    OFF-TOPIC
    - This pulls from an array of images and return to the chat a custom off-topic messsage.
*/

exports.run = (discord, client, message, config, jsonconfig, request, args) => {
  message.channel.send({
    embed: {
      color: 16777215,
      title: "The Conversation is Off-Topic",
      description: config.OFFTOPIC_DESCRIPTION,
      image: {
        url:
          jsonconfig.IMAGE_ARRAY[
            Math.floor(Math.random() * jsonconfig.IMAGE_ARRAY.length)
          ]
      },
      footer: {
        text: "Requested by " + message.author.username,
        icon_url: message.author.displayAvatarURL
      }
    }
  });
};
