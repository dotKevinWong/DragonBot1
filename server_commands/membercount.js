/*
    MEMBER COUNT
    - Returns number of users, bots, and humans from the server.
*/

exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
  message.channel.send({
    embed: {
      color: 16777215,
      title: "Member Count",
      fields: [
        {
          name: "Members",
          value: message.guild.memberCount
        },
        {
          name: "Students",
          value:
            message.channel.guild.memberCount -
            message.channel.guild.members.cache.filter(member => member.user.bot).size
        },
        {
          name: "Verified Students",
          value: message.channel.guild.roles.cache.get("621512736442023956").members.size
        },
        {
          name: "Bots",
          value: message.channel.guild.members.cache.filter(member => member.user.bot)
            .size
        }
      ]
    }
  });
};