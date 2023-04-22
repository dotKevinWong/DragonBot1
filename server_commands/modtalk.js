exports.run = (discord, client, db, message, args) => {
  //process.env.MODERATOR_ROLE_ID
  if (message.member.roles.cache.has(process.env.MODERATOR_ROLE_ID)) {
    message.channel.send({
      embed: {
        color: 16777215,
        title: "Mod Announcement: ",
        description: args.join(" "),
        footer: {
          text: "Posted by " + message.author.username,
          icon_url: message.author.displayAvatarURL({ dynamic: true }),
        },
      },
    });
    message.delete({ timeout: 1000 });
  }
};
