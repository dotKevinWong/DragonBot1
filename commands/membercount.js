/*
    MEMBER COUNT
    - Returns number of users, bots, and humans from the server.
*/

exports.run = (discord, client, message, config, jsonconfig, request, args) => {
  message.channel.send({
    embed: {
      color: 16777215,
      title: "Member Count",
      fields: [
        {
          name: "Members",
          value: message.channel.guild.memberCount
        },
        {
          name: "Humans",
          value:
            message.channel.guild.memberCount -
            message.channel.guild.members.filter(member => member.user.bot).size
        },
        {
          name: "Bots",
          value: message.channel.guild.members.filter(member => member.user.bot)
            .size
        }
      ]
    }
  });
};
