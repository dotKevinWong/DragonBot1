/* 
    SUGGESTION
    - Sends the user a DM to start the suggestion process which will be sent back into mod-view only channel in the server.
*/

exports.run = (discord, client, db, message, args) => {
  message.author
    .createDM()
    .then(dmchannel =>
      dmchannel
        .send(
          "Please provide your suggestion in the following format:\n\n!suggest You can type up to a 100 words here.\n\nOnce submitted, your feedback will then be reviewed by the mod team. We may reach out to you for more information." 
        )
        .catch(reason => console.log(reason))
    )
    .catch(reason => console.log(reason));
  message.delete({ timeout: 3000 });
}