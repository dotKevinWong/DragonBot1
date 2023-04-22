exports.run = (discord, client, db, message, args) => {

  if(message.channel.id === process.env.VERIFICATION_CHANNEL_ID){
    
    if(message.member.roles.cache.has(process.env.VERIFICATION_ROLE_ID)){
     
      db.collection('users').doc(message.member.user.id).get().then(user => {
        if(!user.exists) {
          console.log("Error: The userID: " + message.member.user.id + " does not exist!");
          message.author.createDM().then(dmchannel => {
            dmchannel.send("Please use this DM Chat to update your profile.\n!set [Field] [Options]")
            dmchannel.send("Looks like you don't have a profile. Lets get that set up. Please call the command again!")
          });
          db.collection('users').doc(message.member.user.id).set({
            name: "_ _",
            pronouns: "_ _",
            major: "_ _",
            college: "_ _",
            year: "_ _",
            plan: "_ _",
            description: "_ _",
            coop1: "_ _",
            coop2: "_ _",
            coop3: "_ _",
            clubs: [],
            timestamp: 0,
            disabled: false
          })
        } else {
          message.author.createDM().then(dmchannel => {
            dmchannel.send("Please use this DM Chat to update your profile.\n!set [Field] [Options]")
          });
        }
      });
    } else {
      message.channel.send("You must be verified to use this feature.\nType !verify to start this process.")
    }
  } else {
    message.channel.send("Please use !set in #bot-commands.").then(msg => {msg.delete({ timeout: 3000 });});
  }
}