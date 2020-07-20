/*
    DRAGONBOT
    - Returns features of bot.
*/

exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
  message.channel
    .send({
      embed: {
        color: 16777215,
        title: "Hello, I'm DragonBot",
        description:
          "I'm a custom bot built for the Drexel Discord Server. Find out what I can do below:",
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
            name: "User Profiles",
            value:
              "Learn more about your fellow Drexel students. Just do !whois @user"
          },
          {
            name: "+ More Features",
            value:
              "I'm continually adding features, just mention @Moderator if you want something added"
          }
        ]
      }
    })
};