/*
    D20
    - Roll dice. A random number from 1 to 20
*/

exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
  n = args[0].replace('d', '')
  if (n > 0 && n < 1000) {
    message.channel.send("Ya boi rolled: " + Math.floor((Math.random() * n) + 1));
  } else if (n == 0) {
    message.channel.send("You can't roll a no-sided dice. Well... theoretically you can, but then that'd just be blank lol.")
  } else if (n < 0) {
    message.channel.send("You can't roll negative numbers silly... unless...")
    message.channel.send("You wanted it... " + Math.floor((Math.random() * n) + 1));
  } else if (n > 1000) {
    message.channel.send("Now... you're getting ridiclous. You want to roll an " + n + " sided dice?")
    message.channel.send("I mean you can but it's kinda crazy... " + Math.floor((Math.random() * n) + 1));
  }
};
