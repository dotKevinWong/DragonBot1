exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {

  if(message.channel.id === process.env.VERIFICATION_CHANNEL_ID){
    
    if(message.member.roles.cache.has(process.env.VERIFICATION_ROLE_ID)){
     
      db.collection('users').doc(message.member.user.id).get().then(user => {
        if(!user.exists) {
          console.log("Error: The userID: " + message.member.user.id + " does not exist! Creating profile...");
          message.channel.send("Hold up, we're creating your profile! You'll get a DM when it's created.").then(msg => {msg.delete({ timeout: 3000});})
          message.author.createDM().then(dmchannel => {
            dmchannel.send("Please note - all profile changes must be performed in this direct message. Use !set to find all available fields.\n**!set [Field] [Options]**\n\nYou can use **!whois** to view your profile or **!whois @user** in the server to view another users profile")
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
            dmchannel.send("Please note - all profile changes must be performed in this direct message. Use !set to find all available fields.\n**!set [Field] [Options]**\n\nYou can use **!whois** to view your profile or **!whois @user** in the server to view another users profile")
          });
        }
      });
    } else {
      message.channel.send("You must be verified to use this feature.\nType !verify to start this process.")
    }
  } else {
    message.channel.send("Please use !setup-profile in #bot-commands.").then(msg => {msg.delete({ timeout: 3000 });});
  }
}