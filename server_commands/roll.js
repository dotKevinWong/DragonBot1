/*
    D20
    - Roll dice. A random number from 1 to 20
*/

exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
  n = args[0]
  message.channel.send("Ya boi rolled: " + Math.floor((Math.random() * n.replace('d','')) + 1));
};
