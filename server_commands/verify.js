/* 
    VERIFICATION
    - This uses keyv store the generated codes in RAM or keyv database to check against users.
    - This compares a users e-mail address against a custom Regex
*/

exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
  if (message.channel.id === process.env.VERIFICATION_CHANNEL_ID) {
    message.author
      .createDM()
      .then(dmchannel =>
        dmchannel
          .send(
            "Please reply using !email followed by a space and your Drexel E-Mail for Verification\n*(For example, '!email xyz123@drexel.edu' or '!email xyz@dragons.drexel.edu')*"
          )
          .catch(reason => console.log(reason))
      )
      .catch(reason => console.log(reason));
  } else {
            message.channel
              .send("Please use '!verify' in the appropriate channel.")
              .catch(reason => console.log(reason));
  }
}