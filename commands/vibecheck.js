/*
    VIBECHECK
    - Checks if user has specified role.
*/

exports.run = (discord, client, message, config, jsonconfig, request, args) => {
  if (message.member.roles.find(role => role.name === config.ROLE_NAME)) {
    message.channel.send(message.member + " passed the vibe check.");
  } else {
    message.channel.send(message.member + " doesn't pass the vibe check.");
  }
};
