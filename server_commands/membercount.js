/*
    MEMBER COUNT
    - Returns number of users, bots, and humans from the server.
*/

exports.run = (discord, client, db, message, args) => {
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
          name: "Humans",
          value:
            message.channel.guild.memberCount -
            message.channel.guild.members.cache.filter(member => member.user.bot).size
        },
        {
          name: "Verified Students",
          value:
            message.guild.roles.cache.get(process.env.VERIFICATION_ROLE_ID).members.size
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
