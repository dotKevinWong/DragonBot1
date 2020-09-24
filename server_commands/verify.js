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
            "Please reply using !email followed by a space and your Drexel E-Mail for Verification\n*(For example, '!email xyz123@drexel.edu' or '!email xyz@dragons.drexel.edu')*\n\nOur Privacy Policy is pretty simple. We do not collect your email address once you’ve been verified. We have a channel on the server that will log your email just in case there are issues with verification and once you are verified, the bot will delete the details of your email. Our email provider (SendGrid, a parent company of Twilio) will log your email for 3 days but it is not shown to us after 3 days. We will never inform Drexel or provide Drexel the email addresses of students associated with this server. As such, we are not accountable for the privacy policies in place by both Discord and SendGrid. By submitting your email, you agree to the privacy policies of all parties involved."
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