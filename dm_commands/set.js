let config = require('../config.json');

exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
  /* 
    const instructEmbed = new discord.MessageEmbed()
    .setColor("0099ff")
    .setTitle("Profile Options - Choose from the following profile fields")
    .setDescription("!set [Field] [Options]\nNote: don't include the brackets")
    .addField("Name", "Set your First and/or Last [name]\n'!set name [first name and/or last name]' to set")
    .addField("Pronouns", "Set the [pronouns] you use\n'!set pronouns options' to see what you can set")
    .addField("Major", "Set your [major] - Max of 4 Words\n'!set major [major]' to set")
    .addField("College", "Set the [college] you're under\n'!set college options' to see what you can set")
    .addField("Year", "Set you current Academic Standing [year] - Don't forget to change it every Year\n'!set year options' to see what you can set")
    .addField("Plan", "Set the Co-Op [plan] you're pursuing\n'!set plan options' to see what you can set")
    .addField("Description", "Give yourself a [description] - Try to keep it appropriate and under 20 words!\n'!set description [description]' to set")
    .addField("Co-Ops", "Set your [coops] Companies and Job Titles\n'!set coop options' to see what you can set")
    .addField("Clubs", "[add] the Drexel [clubs] you're in. No more than 5....you can always [sub]tract one.\n'!set clubs options' to see how to set")
  */
  
  const instructEmbed = new discord.MessageEmbed()
    .setColor("0099ff")
    .setTitle("Profile Options - Choose from the following profile fields")
    .setDescription("`!set [Field] [Options]`\nNote: Don't include the brackets")
    .addField("Name", "`!set name Mario Drexel`")
    .addField("Pronouns", "`!set pronouns options`")
    .addField("Major", "`!set major General Studies`")
    .addField("College", "`!set college options`")
    .addField("Year", "`!set year options`\nNote: Don't forget to change this annually!")
    .addField("Plan", "`!set plan options`\nNote: This must be done first before adding your co-ops")
    .addField("Description", "`!set description Big Phillies fan - and cheesesteak connoisseur.`\nNote: Keep it appropriate - 20 words maximum")
    .addField("Co-Ops", "`!set coop 1 Intern at Hooli`")
    .addField("Clubs", "`!set clubs [add]/[sub] options`\nNote: 5 club maximum")

  db.collection("users").doc(message.author.id).get().then(user => {
    if (user.data().disabled) {
      message.channel.send("Your profile has been disabled from editing")
    } else if (args.length < 1) {
      message.channel.send(instructEmbed);
    } else {
      db.collection("users")
        .doc(message.author.id)
        .get()
        .then(user => {
          if (!user.exists) {
            console.log(
              "Error: The userID: " + message.author.id + " does not exist!\nPlease use this command in the #bot-commands channel in the server"
            );
            message.channel.send(config.PROFILE_DM_ERROR)
            /* Determined not safe incase user isn't verified first
            message.channel.send(
              "Looks like you don't have a profile. Lets get that set up. Please call the command again!"
            );
            db.collection("users")
              .doc(message.author.id)
              .set({
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
                timestamp: 0
              });*/
          } else {
            let key = args.shift().toLowerCase();
            switch (key) {
              case "name":
                if (args.length == 1) {
                  db.collection("users")
                    .doc(message.author.id)
                    .update({
                      name: args[0]
                    });
                  message.channel.send("Your name has been set.").then(msg => {msg.delete({ timeout: 3000 });});
                } else if (args.length == 2) {
                  db.collection("users")
                    .doc(message.author.id)
                    .update({
                      name: args[0] + " " + args[1]
                    });
                  message.channel.send("Your name has been set.").then(msg => {msg.delete({ timeout: 3000 });});
                } else {
                  message.channel.send("Please only use first and/or last name.");
                }
                break;

              case "pronouns":
                if (args.length < 1) {
                  message.channel.send({
                    embed: {
                      color: 39423,
                      title: "Pronouns - Choose from these options:",
                      description: "!set pronouns #",
                      fields: [
                        {
                          name: "He/Him",
                          value: 1
                        },
                        {
                          name: "She/Her",
                          value: 2
                        },
                        {
                          name: "They/Them",
                          value: 3
                        },
                        {
                          name: "Ask Me!",
                          value: 4
                        }
                      ]
                    }
                  });
                  break;
                }
                if (!args[0].match(/^[1-4]{1}$/)) {
                  message.channel.send({
                    embed: {
                      color: 39423,
                      title: "Pronouns - Choose from these options:",
                      description: "!set pronouns #",
                      fields: [
                        {
                          name: "He/Him",
                          value: 1
                        },
                        {
                          name: "She/Her",
                          value: 2
                        },
                        {
                          name: "They/Them",
                          value: 3
                        },
                        {
                          name: "Ask Me!",
                          value: 4
                        }
                      ]
                    }
                  });
                } else {
                  switch (args[0]) {
                    case "1":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          pronouns: "He/Him"
                        });
                      break;

                    case "2":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          pronouns: "She/Her"
                        });
                      break;

                    case "3":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          pronouns: "They/Them"
                        });
                      break;

                    case "4":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          pronouns: "Ask Me!"
                        });
                      break;
                  }
                  message.channel.send("Good to go!").then(msg => {msg.delete({ timeout: 3000 });});
                }
                break;

              case "major":
                if (args.length < 1) {
                  message.channel.send(
                    "Please provide a Major with no longer than 4 words"
                  );
                } else {
                  let text = args.shift();
                  if (args.length < 4) {
                    for (let i = 0; i < args.length; i++) {
                      text = text + " " + args[i];
                    }
                  } else {
                    for (let i = 0; i < 3; i++) {
                      text = text + " " + args[i];
                    }
                  }
                  db.collection("users")
                    .doc(message.author.id)
                    .update({
                      major: text
                    });
                  message.channel.send("Good to go!").then(msg => {msg.delete({ timeout: 3000 });});
                }
                break;

              case "college":
                if (args.length < 1) {
                  message.channel.send({
                    embed: {
                      color: 39423,
                      title: "College - Choose from these options:",
                      description: "!set college #",
                      fields: [
                        {
                          name:
                            "Antoinette Westphal College of Media Arts & Design",
                          value: 0
                        },
                        {
                          name: "Bennett S. LeBow College of Business",
                          value: 1
                        },
                        {
                          name: "Close School of Entrepreneurship",
                          value: 2
                        },
                        {
                          name: "College of Arts and Sciences",
                          value: 3
                        },
                        {
                          name: "College of Computing & Informatics",
                          value: 4
                        },
                        {
                          name: "College of Engineering",
                          value: 5
                        },
                        {
                          name: "College of Nursing and Health Professions",
                          value: 6
                        },
                        {
                          name: "Dornsife School of Public Health",
                          value: 7
                        },
                        {
                          name:
                            "School of Biomedical Engineering, Science and Health Systems",
                          value: 8
                        },
                        {
                          name: "School of Education",
                          value: 9
                        },
                        {
                          name: "College of Medicine",
                          value: 10
                        },
                        {
                          name: "Goodwin College of Professional Studies",
                          value: 11
                        },
                        {
                          name: "Thomas R. Kline School of Law",
                          value: 12
                        }
                      ]
                    }
                  });
                  break;
                }
                if (
                  !args[0].match(/^[10-12]{2}$/) &&
                  !args[0].match(/^[0-9]{1}$/)
                ) {
                  //have to change this to match 2 digit numbers
                  message.channel.send({
                    embed: {
                      color: 39423,
                      title: "College - Choose from these options:",
                      description: "!set college #",
                      fields: [
                        {
                          name:
                            "Antoinette Westphal College of Media Arts & Design",
                          value: 0
                        },
                        {
                          name: "Bennett S. LeBow College of Business",
                          value: 1
                        },
                        {
                          name: "Close School of Entrepreneurship",
                          value: 2
                        },
                        {
                          name: "College of Arts and Sciences",
                          value: 3
                        },
                        {
                          name: "College of Computing & Informatics",
                          value: 4
                        },
                        {
                          name: "College of Engineering",
                          value: 5
                        },
                        {
                          name: "College of Nursing and Health Professions",
                          value: 6
                        },
                        {
                          name: "Dornsife School of Public Health",
                          value: 7
                        },
                        {
                          name:
                            "School of Biomedical Engineering, Science and Health Systems",
                          value: 8
                        },
                        {
                          name: "School of Education",
                          value: 9
                        },
                        {
                          name: "College of Medicine",
                          value: 10
                        },
                        {
                          name: "Goodwin College of Professional Studies",
                          value: 11
                        },
                        {
                          name: "Thomas R. Kline School of Law",
                          value: 12
                        }
                      ]
                    }
                  });
                } else {
                  switch (args[0]) {
                    case "0":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          college:
                            "Antoinette Westphal College of Media Arts & Design"
                        });
                      break;

                    case "1":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          college: "Bennett S. LeBow College of Business"
                        });
                      break;

                    case "2":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          college: "Close School of Entrepreneurship"
                        });
                      break;

                    case "3":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          college: "College of Arts and Sciences"
                        });
                      break;

                    case "4":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          college: "College of Computing & Informatics"
                        });
                      break;

                    case "5":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          college: "College of Engineering"
                        });
                      break;

                    case "6":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          college: "College of Nursing and Health Professions"
                        });
                      break;

                    case "7":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          college: "Dornsife School of Public Health"
                        });
                      break;

                    case "8":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          college:
                            "School of Biomedical Engineering, Science and Health Systems"
                        });
                      break;

                    case "9":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          college: "School of Education"
                        });
                      break;

                    case "10":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          college: "College of Medicine"
                        });
                      break;

                    case "11":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          college: "Goodwin College of Professional Studies"
                        });
                      break;

                    case "12":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          college: "Thomas R. Kline School of Law"
                        });
                      break;
                  }
                  message.channel.send("Good to go!").then(msg => {msg.delete({ timeout: 3000 });});
                }
                break;

              case "year":
                if (args.length < 1) {
                  message.channel.send({
                    embed: {
                      color: 39423,
                      title: "Year - Choose from these options:",
                      description: "!set year #",
                      fields: [
                        {
                          name: "Freshman",
                          value: 1
                        },
                        {
                          name: "Sophomore",
                          value: 2
                        },
                        {
                          name: "Pre-Junior",
                          value: 3
                        },
                        {
                          name: "Junior",
                          value: 4
                        },
                        {
                          name: "Senior",
                          value: 5
                        },
                        {
                          name: "Incoming/Transfer",
                          value: 6
                        },
                        {
                          name: "Alumni",
                          value: 7
                        }
                      ]
                    }
                  });
                  break;
                }
                if (!args[0].match(/^[1-7]{1}$/)) {
                  message.channel.send({
                    embed: {
                      color: 39423,
                      title: "Year - Choose from these options:",
                      description: "!set year #",
                      fields: [
                        {
                          name: "Freshman",
                          value: 1
                        },
                        {
                          name: "Sophomore",
                          value: 2
                        },
                        {
                          name: "Pre-Junior",
                          value: 3
                        },
                        {
                          name: "Junior",
                          value: 4
                        },
                        {
                          name: "Senior",
                          value: 5
                        },
                        {
                          name: "Incoming/Transfer",
                          value: 6
                        },
                        {
                          name: "Alumni",
                          value: 7
                        }
                      ]
                    }
                  });
                } else {
                  switch (args[0]) {
                    case "1":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          year: "Freshmen"
                        });
                      break;

                    case "2":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          year: "Sophomore"
                        });
                      break;

                    case "3":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          year: "Pre-Junior"
                        });
                      break;

                    case "4":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          year: "Junior"
                        });
                      break;

                    case "5":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          year: "Senior"
                        });
                      break;

                    case "6":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          year: "Incoming/Transfer"
                        });
                      break;

                    case "7":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          year: "Alumni"
                        });
                      break;
                  }
                  message.channel.send("Good to go!").then(msg => {msg.delete({ timeout: 3000 });});
                }
                break;

              case "plan":
                if (args.length < 1) {
                  message.channel.send({
                    embed: {
                      color: 39423,
                      title: "Plan - Choose from these options:",
                      description: "!set plan #",
                      fields: [
                        {
                          name: "5 Year/3 Co-Op",
                          value: 1
                        },
                        {
                          name: "4 Year/1 Co-Op",
                          value: 2
                        },
                        {
                          name: "4 Year/No Co-Op",
                          value: 3
                        }
                      ]
                    }
                  });
                  break;
                }
                if (!args[0].match(/^[1-4]{1}$/)) {
                  message.channel.send({
                    embed: {
                      color: 39423,
                      title: "Plan - Choose from these options:",
                      description: "!set plan #",
                      fields: [
                        {
                          name: "5 Year/3 Co-Op",
                          value: 1
                        },
                        {
                          name: "4 Year/1 Co-Op",
                          value: 2
                        },
                        {
                          name: "4 Year/No Co-Op",
                          value: 3
                        }
                      ]
                    }
                  });
                } else {
                  switch (args[0]) {
                    case "1":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          plan: "5 Year/3 Co-Op"
                        });
                      break;

                    case "2":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          plan: "4 Year/1 Co-Op"
                        });
                      break;

                    case "3":
                      db.collection("users")
                        .doc(message.author.id)
                        .update({
                          plan: "4 Year/No Co-Op"
                        });
                      break;
                  }
                  message.channel.send("Good to go!").then(msg => {msg.delete({ timeout: 3000 });});
                }
                break;

              case "description":
                if (args.length < 1) {
                  message.channel.send(
                    "Please provide a Description with no longer than 20 words"
                  );
                } else {
                  let text = args.shift();
                  if (args.length < 20) {
                    for (let i = 0; i < args.length; i++) {
                      text = text + " " + args[i];
                    }
                  } else {
                    for (let i = 0; i < 19; i++) {
                      text = text + " " + args[i];
                    }
                  }
                  db.collection("users")
                    .doc(message.author.id)
                    .update({
                      description: text
                    });
                  message.channel.send("Good to go!").then(msg => {msg.delete({ timeout: 3000 });});
                }
                break;

              case "coop":
                if (user.data().plan === "_ _") {
                  message.channel.send("Please set your COOP Plan first ");
                } else {
                  switch (user.data().plan) {
                    case "5 Year/3 Co-Op":
                      if (args.length < 2) {
                        message.channel.send(
                          "Please provide a job title and location, no longer than 10 words\n!set coop [#] [description]"
                        );
                      } else {
                        let num = args.shift();
                        if (num === "1" || num === "2" || num === "3") {
                          let text = args.shift();
                          if (args.length < 10) {
                            for (let i = 0; i < args.length; i++) {
                              text = text + " " + args[i];
                            }
                          } else {
                            for (let i = 0; i < 9; i++) {
                              text = text + " " + args[i];
                            }
                          }
                          switch (num) {
                            case "1":
                              db.collection("users")
                                .doc(message.author.id)
                                .update({
                                  coop1: text
                                });
                              break;

                            case "2":
                              db.collection("users")
                                .doc(message.author.id)
                                .update({
                                  coop2: text
                                });
                              break;
                            case "3":
                              db.collection("users")
                                .doc(message.author.id)
                                .update({
                                  coop3: text
                                });
                              break;
                          }
                          message.channel.send("Good to go!").then(msg => {msg.delete({ timeout: 3000 });});
                        } else {
                          message.channel.send(
                            "Please choose '1' '2' or '3' to choose which Co-Op you are adding\n!set coop [#] [description]"
                          );
                        }
                      }
                      break;

                    case "4 Year/1 Co-Op":
                      if (args.length < 1) {
                        message.channel.send(
                          "Please provide a job title and location, no longer than 10 words"
                        );
                      } else {
                        let text = args.shift();
                        if (args.length < 10) {
                          for (let i = 0; i < args.length; i++) {
                            text = text + " " + args[i];
                          }
                        } else {
                          for (let i = 0; i < 9; i++) {
                            text = text + " " + args[i];
                          }
                        }
                        db.collection("users")
                          .doc(message.author.id)
                          .update({
                            coop1: text
                          });
                        message.channel.send("Good to go!").then(msg => {msg.delete({ timeout: 3000 });});
                      }
                      break;

                    default:
                      message.channel.send(
                        "Your Plan indicates you do not have any Co-Ops, therefore you cannot set one."
                      );
                      break;
                  }
                }
                break;

              case "clubs":
                if (args.length < 1){
                  message.channel.send(
                      "Please use the clubs option like so:\n!set clubs [add]/[sub] options"
                    );
                } else {
                  let oper = args.shift();
                  if (oper === "add" || oper === "sub") {
                    if (args.length < 1) {
                      message.channel.send(
                        "Please provide the title of the Club you would like to add."
                      );
                    } else {
                      let club_list = [];
                      switch (oper) {
                        case "add":
                          if (user.data().clubs === "_ _") {
                            club_list = [];
                          } else if (user.data().clubs.length === 5) {
                            message.channel.send(
                              "You have already added the maximum amount of clubs, please remove one before attempting to add another."
                            );
                            break;
                          } else {
                            club_list = user.data().clubs;
                          }

                          let text = args.shift();
                          if (args.length < 5) {
                            for (let i = 0; i < args.length; i++) {
                              text = text + " " + args[i];
                            }
                          } else {
                            for (let i = 0; i < 4; i++) {
                              text = text + " " + args[i];
                            }
                          }

                          club_list.push(text);
                          db.collection("users")
                            .doc(message.author.id)
                            .update({
                              clubs: club_list
                            });
                          message.channel.send("Good to go!").then(msg => {msg.delete({ timeout: 3000 });});
                          break;

                        case "sub":
                          if (user.data().clubs === "_ _") {
                            message.channel.send(
                              "There aren't any clubs to remove."
                            );
                            break;
                          } else {
                            club_list = user.data().clubs;

                            let text = args.shift();
                            if (args.length < 5) {
                              for (let i = 0; i < args.length; i++) {
                                text = text + " " + args[i];
                              }
                            } else {
                              for (let i = 0; i < 4; i++) {
                                text = text + " " + args[i];
                              }
                            }

                            let j = club_list.indexOf(text);
                            if (j == -1) {
                              message.channel.send(
                                "Either the club you are trying to remove isn't in your list or you typed something incorrectly."
                              );
                              break;
                            } else {
                              club_list.splice(j, 1);
                              db.collection("users")
                                .doc(message.author.id)
                                .update({
                                  clubs: club_list
                                });
                              message.channel.send("Good to go!").then(msg => {msg.delete({ timeout: 3000 });});
                            }
                          }
                          break;
                      }
                    }
                  } else {
                    message.channel.send(
                      "Please use the clubs option like so:\n!set clubs [add/sub] [Club]"
                    );
                  }
                }
                break;

              default:
                message.channel.send(
                  "Sorry that isn't a profile option, here are the list of fields to choose from"
                );
                //PRINT LIST OF FIELDS
                message.channel.send(instructEmbed);

            }
          }
    });
  }
  });
};
