

exports.run = (discord, client, db, message, args) => {
  if(args.length > 100){
    message.channel.send("Please keep your suggestion to under 100 words :)")
  } else {
    console.log(args.join(" "))
    
    /* Send a rich embed message into channel */
    client.channels.cache
      .get(process.env.VERIFICATION_LOG_CHANNEL_ID)
      .send({
        embed: {
          color: 39423,
          title: "Server Suggestion Request",
          fields: [
            {
              name: "Suggestion",
              value: args.join(" ")
            }
          ],
          footer: {
            text: "Requested by " + message.author.username,
            icon_url: message.author.displayAvatarURL
          }
        }
      })
      .then(function(msg){
        msg.react('👍')
        msg.react('👎')
      })
      .then(() => message.channel.send("Feedback noted - Thanks!"))
      .catch(reason => console.log(reason));
  }
}