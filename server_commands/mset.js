exports.run = (discord, client, db, message, args) => {
  const instructEmbed = new discord.MessageEmbed()
    .setColor("0099ff")
    .setTitle("Moderator Profile Options\nEnter a User ID and Choose from the following profile fields")
    .setDescription("Make sure to copy the user id and not just @ them\nThis command is to be used only to reset inappropriate fields\n!set [userID] [Field] [Options]")
    .addField("Name", "Reset Name field to [Redacted]")
    .addField("Major", "Reset Major field to [Redacted]")
    .addField("Description", "Reset Description field to [Redacted]")
    .addField("Co-Ops", "Reset a specific Co-Op field to [Redacted]")
    .addField("Clubs", "[add] the Drexel Clubs you're in. No more than 5....you can always [sub]tract one.")
    .addField("Ban", "Ban the user from pulling profiles")
    .addField("Unban", "Unban the user from pulling profiles")
    .addField("Enable", "Enable a users profile")
    .addField("Disable", "Disable a users profile")

  
  if(message.channel.id === process.env.MOD_LOGS_CHANNEL_ID && message.member.roles.cache.has(process.env.MODERATOR_ROLE_ID)) {
    if(args.length < 2){
      message.channel.send(instructEmbed)
    } else {
      let userID = args.shift();
      message.guild.members.fetch(userID)
        .then(datuser => {
             var username = datuser.user.username;
        });
      //datuser.then(info => console.log(info.GuildMember));
      db.collection('users').doc(userID).get().then(user => {
        if(!user.exists) {
          message.channel.send("Error: The userID: " + userID + " does not exist!");
        } else {
          let data = user.data();
          let key = args.shift().toLowerCase();
          switch(key){
            case "name":
              db.collection('users').doc(userID).update({
                name: "[Redacted]"
              });
                        
              message.channel.send({
                embed: {
                  color: 39423,
                  title: "Profile Moderation Log",
                  fields: [
                    {
                      name: "Offending User",
                      value: "<@" + userID + ">"
                    },
                    {
                      name: "Field",
                      value: key
                    },
                    {
                      name: "Offending Entry",
                      value: data.name
                    }
                  ]
                }
              });  
              
              break;

            case "major":
              db.collection('users').doc(userID).update({
                major: "[Redacted]"
              });
              message.channel.send({
                embed: {
                  color: 39423,
                  title: "Profile Moderation Log",
                  fields: [
                    {
                      name: "Offending User",
                      value: "<@" + userID + ">"
                    },
                    {
                      name: "Field",
                      value: key
                    },
                    {
                      name: "Offending Entry",
                      value: data.major
                    }
                  ]
                }
              });               
              break;

            case "description":
              db.collection('users').doc(userID).update({
                description: "[Redacted]"
              });
              message.channel.send({
                embed: {
                  color: 39423,
                  title: "Profile Moderation Log",
                  fields: [
                    {
                      name: "Offending User",
                      value: "<@" + userID + ">"
                    },
                    {
                      name: "Field",
                      value: key
                    },
                    {
                      name: "Offending Entry",
                      value: data.description
                    }
                  ]
                }
              });           
              break;

            case "coop":
              if(args.length < 1){
                message.channel.send("Please choose which Co-Op Field to Reset\n!mset [userID] coop #");
              }else{
                let coop = args.shift();
                switch(coop){
                  case "1":
                    db.collection('users').doc(userID).update({
                      coop1: "[Redacted]"
                    });
                    message.channel.send({
                      embed: {
                        color: 39423,
                        title: "Profile Moderation Log",
                        fields: [
                          {
                            name: "Offending User",
                            value: "<@" + userID + ">"
                          },
                          {
                            name: "Field",
                            value: key
                          },
                          {
                            name: "Offending Entry",
                            value: data.coop1
                          }
                        ]
                      }
                    });
                    break;

                  case "2":
                    db.collection('users').doc(userID).update({
                      coop2: "[Redacted]"
                    });     
                    message.channel.send({
                      embed: {
                        color: 39423,
                        title: "Profile Moderation Log",
                        fields: [
                          {
                            name: "Offending User",
                            value: "<@" + userID + ">"
                          },
                          {
                            name: "Field",
                            value: key
                          },
                          {
                            name: "Offending Entry",
                            value: data.coop2
                          }
                        ]
                      }
                    });
                    break;
                  case "3":
                    db.collection('users').doc(userID).update({
                      coop3: "[Redacted]"
                    });     
                    message.channel.send({
                      embed: {
                        color: 39423,
                        title: "Profile Moderation Log",
                        fields: [
                          {
                            name: "Offending User",
                            value: "<@" + userID + ">"
                          },
                          {
                            name: "Field",
                            value: key
                          },
                          {
                            name: "Offending Entry",
                            value: data.coop3
                          }
                        ]
                      }
                    });
                    break;
                }
                                 
                
              }
              break;

            case "clubs":
              if(args.length < 1){
                // Not sure if remove club from list or leave as redacted to force the user to act on it????
                // Implementation will follow prior option and can be changed later

                message.channel.send("Please choose which Club to remove from the list.\n!mset [userID] clubs #")
              }else{
                let club_list = data.clubs;
                let club_len = club_list.length;
                let club_sub = args[0];
                if(club_len < club_sub || club_sub > 5 || data.clubs === "_ _"){
                  message.channel.send("The user does not have that many clubs listed.");
                }else{ 
                  let rem_club = club_list[club_sub-1];
                  club_list.splice((club_sub-1), 1);
                  db.collection('users').doc(userID).update({
                    clubs: club_list
                  });
                  message.channel.send({
                    embed: {
                      color: 39423,
                      title: "Profile Moderation Log",
                      fields: [
                        {
                          name: "Offending User",
                          value: "<@" + userID + ">"
                        },
                        {
                          name: "Field",
                          value: key
                        },
                        {
                          name: "Offending Entry",
                          value: rem_club
                        }
                      ]
                    }
                  });                  
                }
              }
              break;
              
            case "disable":
                db.collection('users').doc(userID).update({
                  disabled: true
                });
                message.channel.send({
                  embed: {
                    description: "The user <@" + userID + ">\'s profile has been disabled from viewing."
                  }
                });
              break;
              
            case "enable":
                db.collection('users').doc(userID).update({
                  disabled: false
                });
                message.channel.send({
                  embed: {
                    description: "The user <@" + userID + ">\'s profile has been enabled for viewing."
                  }
                });
              break;
              
          
            case "ban":
                db.collection('banned').doc(userID).set({
                  banned: true
                });
                message.channel.send({
                  embed: {
                    description: "The user <@" + userID + "> is banned from viewing profiles."
                  }
                });
              break;
            
            case "unban":
                db.collection('banned').doc(userID).delete();
                message.channel.send({
                  embed: {
                    description: "The user <@" + userID + "> is unbanned from viewing profiles."
                  }
                });
              break;

            default:
              message.channel.send("Sorry that isn't a profile option, here are the list of fields to choose from");

              //PRINT LIST OF FIELDS
              message.channel.send(instructEmbed);   
          }

        }
      });
    }
  }
}