/*
    LEADERBOARD
    - Uses Request and the MEE6 API to print out the top members of the server
*/

const request = require("request");

const dict = {
  0: ":crown:",
  1: ":second_place:",
  2: ":third_place:",
  3: ":four:",
  4: ":five:",
  5: ":six:",
  6: ":seven:",
  7: ":eight:",
  8: ":nine:",
  9: ":keycap_ten:",
  10: ":one::one:",
  11: ":one::two:",
  12: ":one::three:",
  13: ":one::four:",
  14: ":one::five:",
  15: ":one::six:",
  16: ":one::seven:",
  17: ":one::eight:",
  18: ":one::nine:",
  19: ":two::zero:"
};

exports.run = (discord, client, db, message, args) => {
  if (message.channel.id === process.env.VERIFICATION_CHANNEL_ID) {
    request(
      "https://mee6.xyz/api/plugins/levels/leaderboard/" + process.env.SERVER_ID,
      function(error, response, body) {
        var data = JSON.parse(body);
        let max =
          args[0] <= 20
            ? data.players.length < args[0]
              ? data.players.length
              : args[0]
            : data.players.length < 10
            ? data.players.length
            : 10;
        let count = 0;
        /* Add functionality to flexible amount of users */
        const rankEmbed = new discord.MessageEmbed()
          .setColor("0099ff")
          .setTitle("Top Members")
          .setURL(process.env.MEE6_LEADERBOARD_URL)
          .setDescription(process.env.MEE6_LEADERBOARD_DESCRIPTION);
        while (count < max) {
          rankEmbed.addField(
            dict[count],
            "<@" + message.guild.members.cache.get(data.players[count].id) + ">" +
              " | " +
              data.players[count].message_count +
              " Messages" +
              " | " +
              data.players[count].xp +
              " XP" +
              " | Level " +
              data.players[count].level
          );
          count++;
        }
        rankEmbed.setTimestamp();
        message.channel.send(rankEmbed);
      }
    );
  }
};
