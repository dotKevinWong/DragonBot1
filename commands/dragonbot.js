/*
    DRAGONBOT
    - Returns features of bot.
*/

exports.run = (discord, client, message, config, jsonconfig, request, args) => {
  message.channel
    .send({
      embed: {
        color: 16777215,
        title: "Hello, I'm DragonBot",
        description:
          "I'm a bot built for the Drexel Discord Server. ind out what I can do below:",
        fields: [
          {
            name: "Verify Users",
            value:
              "I handle all user verifications to make sure our users are actual Drexel Students!"
          },
          {
            name: "Moderate Chat",
            value:
              "If a chat is becoming off-topic, request the !offtopic command and I'll help moderate the chat"
          },
          {
            name: "+ More Features",
            value:
              "I'm continually adding features, just mention @KevinWong#0001 if you want something added"
          }
        ]
      }
    })
    .then(msg => {
      msg.delete(120000);
    });
};
