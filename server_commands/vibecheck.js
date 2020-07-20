/*
    VIBE CHECK
    - Checks if user has specified role.
*/

exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
  if (message.member.roles.cache.find(role => role.name === process.env.ROLE_NAME)) {
    message.channel.send("<@" + message.member + ">" + " passed the vibe check.");
  } else {
    message.channel.send("<@" + message.member + ">" + " doesn't pass the vibe check.");
  }
};
