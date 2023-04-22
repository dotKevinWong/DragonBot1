var min = .25;

exports.run = (discord, client, db, message, args) => {
//let userID = args[0].slice(3, -1)
let userID = args[0].split("@")[1];
if (userID.charAt(0) === "!")
  userID = userID.slice(1, -1);
else
  userID = userID.slice(0, -1);
  
  db.collection('banned').doc(message.author.id).get().then(doc => {
    if (doc.exists) {
      message.channel.send("You are banned from viewing profiles!")
    
    } else if(message.member.roles.cache.has(process.env.VERIFICATION_ROLE_ID)) {
      if (args.length < 1) {
        message.channel.send("Please @ mention who's profile you would like to show\n!whois @somebody")
        .then(msg => {msg.delete({timeout: 5000})});

      } else {
        db.collection('users').doc(userID).get().then(doc => {
          if(!doc.exists) {
            console.log("Error: The userID: " + userID + " does not exist!");
            message.channel.send("You got shafted! This user doesn't have a profile setup! 😔");
          } else if (doc.data().disabled) {
            message.channel.send("This profile has been disabled.")
          } else {
            let data = doc.data()
            let cur_time = new Date().getTime();
            if (cur_time - data.timestamp > (min*60*1000)){  // "min" minutes
              const profileEmbed = new discord.MessageEmbed()
                //	39423
                .setColor("0099ff")
                .setTitle("User Profile")
                .addField('Name', data.name)
                .addField('Pronouns', data.pronouns)
                .addField('Major', data.major)
                .addField('College', data.college)
                .addField('Year', data.year)
                .addField('Plan', data.plan)
                .addField('Description', data.description)
              let coop = data.plan;
              if (coop === "5 Year/3 Co-Op"){
                profileEmbed.addField('Co-Op 1', data.coop1)
                .addField('Co-Op 2', data.coop2)
                .addField('Co-Op 3', data.coop3)
              } else if (coop === "4 Year/1 Co-Op"){
                profileEmbed.addField('Co-Op', data.coop1)
              } else if (coop === "4 Year/No Co-Op"){
                // Nothing to See Here
              } 
              let clubs = ""
              let club_list = data.clubs;
              let i;
              if (club_list.length > 0){
                console.log(club_list.length);
                for (i = 0; i < club_list.length; i++){
                  clubs = clubs + club_list[i];
                  if(i != (club_list.length-1)){
                    clubs = clubs + ", ";
                  }
                }
                profileEmbed.addField('Clubs', clubs)
              }

              message.channel.send(profileEmbed);
              db.collection('users').doc(userID).update({
                timestamp: cur_time
              });

            } else {
              message.channel.send("Whoops, somebody already pulled that Profile in the last " + min + " minutes.");
            }
          }
        })
      }
    } else {
      message.channel.send("You must be verified to view user profiles!")
    }
  })
}