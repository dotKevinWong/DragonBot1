const discord = require("discord.js");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const Keyv = require("keyv");
const sgMail = require("@sendgrid/mail");
const request = require("request");

// config file
const config =
  process.env.DISCORD_API_TOKEN == undefined ? require("./.env") : process.env;

const jsonconfig = require("./config.json");

// intalize discord
const client = new discord.Client();
client.once("ready", () => console.log("Starting DragonBot!"));
client
  .login(config.DISCORD_API_TOKEN)
  .then(console.log("Logged In to Discord API!"));

sgMail.setApiKey(config.EMAIL_API_KEY);

// discord rich presense
client.on("ready", () => {
  client.user.setActivity(config.RICH_PRESCENCE_TEXT, {
    type: config.RICH_PRESCENCE_TYPE
  });
});

// DM new user on join
client.on("guildMemberAdd", member => {
  member.send(jsonconfig.WELCOME_USER_DM);
});

const discord_email = new Keyv("sqlite://database.sqlite", {
  namespace: "discord_email"
});
const code_email_temp = new Keyv("sqlite://database.sqlite", {
  namespace: "code_email_temp"
});
const code_discord_temp = new Keyv("sqlite://database.sqlite", {
  namespace: "code_discord_temp"
});
const ALPHANUM =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

setInterval(function() {
  code_discord_temp.clear();
  code_email_temp.clear();
}, 60 * 60 * 500);

client.on("message", message => {
  if (message.author.bot) {
    return;
  }
  if (message.channel.guild == null) {
    let text = message.content.trim();
    if (
      new RegExp(config.EMAIL_REGEX1).test(text) ||
      new RegExp(config.EMAIL_REGEX2).test(text)
    ) {
      let email_address = text;
      if (email_address) {
        let code = makeid(6);
        console.log(code);
        code_email_temp.set(code, email_address, 10 * 60 * 1000);
        code_discord_temp.set(code, message.author.id, 10 * 60 * 1000);
        /*
				message.channel.send(
					"Please check your email and reply with the code we sent you! It may be in your **JUNK** or **SPAM** folder."
				)
				.catch(reason => console.log(reason));
				*/
        sendEmail(email_address, code)
          .then(
            message.channel
              .send(
                "Please check your email and reply with the code we sent you! It may be in your **JUNK** or **SPAM** folder. **Please note that sometimes E-Mails may not send. In that case, a mod will manually verify you. :)**"
              )
              .catch(reason => console.log(reason))
          )
          .catch(reason => console.log(reason));

        /* Send a rich embed message into channel */
        client.channels
          .get(config.VERIFICATION_LOG_CHANNEL_ID)
          .send({
            embed: {
              color: 39423,
              title: "Verification Request",
              fields: [
                {
                  name: "E-Mail",
                  value: text
                },
                {
                  name: "Code",
                  value: code
                }
              ],
              footer: {
                text: "Requested by " + message.author.username,
                icon_url: message.author.displayAvatarURL
              }
            }
          })
          .catch(reason => console.log(reason));
      } else {
        message.channel
          .send("There was an error processing your request.")
          .catch(reason => console.log(reason));
      }
    } else if (text.match(/^[a-zA-Z0-9]{6}$/)) {
      Promise.all([code_email_temp.get(text), code_discord_temp.get(text)])
        .then(([email_address, discord_id]) => {
          if (email_address && discord_id && discord_id === message.author.id) {
            discord_email.set(message.author.id, email_address);
            let guild = client.guilds.get(config.SERVER_ID);
            let verif_log = guild.channels.get(
              config.VERIFICATION_LOG_CHANNEL_ID
            );
            let role = guild.roles.find(role => role.name === config.ROLE_NAME);
            guild
              .fetchMember(message.author)
              .then(member =>
                member
                  .addRole(role)
                  .then(
                    message.channel
                      .send("You are now **verified!**")
                      .catch(reason => console.log(reason))
                  )
              )
              .catch(reason => console.log(reason));
            verif_log
              .fetchMessages()
              .then(async messages => {
                for (const mess of messages.array()) {
                  if (!Array.isArray(mess.embeds) || !mess.embeds.length) {
                    /* Nothing to see here */
                  } else {
                    if (mess.embeds[0].fields[0].value === email_address) {
                      mess.delete();
                    }
                  }
                }
              })
              .catch(reason => console.log(reason));
          } else {
            message.channel.send(
              "That code isn't right. Please make sure you have the right code."
            );
          }
        })
        .catch(reason => console.log(reason));
    } else {
      message.channel
        .send("That is not a valid Drexel email address.")
        .catch(reason => console.log(reason));
    }
  } else if (message.channel.guild.id == config.SERVER_ID) {
    if (message.content.charAt(0) == config.PREFIX) {
      const args = message.content.slice(config.PREFIX.length).split(" ");
      const command = args.shift().toLowerCase();

      switch (command) {
        /* use to debug various functionality to check for embedded message 
				case "checked":
					message.channel.fetchMessages().then(async messages => {
						for (const mess of messages.array()){
							if (!Array.isArray(mess.embeds) || !mess.embeds.length){
							}else{
								console.log(mess.embeds[0].description);
							}
						}
					})
					.catch(reason => console.log(reason));
					break;
				*/

        /* 
					VERIFICATION
					- This uses keyv store the generated codes in RAM or keyv database to check against users.
					- This compares a users e-mail address against a custom Regex
				*/
        case "verify":
          if (message.channel.id === config.VERIFICATION_CHANNEL_ID) {
            message.author
              .createDM()
              .then(dmchannel =>
                dmchannel
                  .send(
                    "Please reply with your Drexel E-Mail for Verification *(For example, xyz123@drexel.edu or xyz@dragons.drexel.edu)*"
                  )
                  .catch(reason => console.log(reason))
              )
              .catch(reason => console.log(reason));
            /* Additional log queue to see ongoing verification process requests */
          } else {
            message.channel
              .send("Please use '!verify' in the appropriate channel.")
              .catch(reason => console.log(reason));
          }
          break;

        /* 
				Club Finder
				- This uses Cheerio.js and NightmareJS to search against the Drexel CampusLabs website
				for club information and photo.
				*/
        case "club":
          if (message.channel.id === config.CLUB_CHANNEL_ID) {
            const query = args[0] + "%20" + args[1] + "%20";
            message.channel.send("Fetching...").then(msg => {
              msg.delete(5000);
            });

            async () => {
              const browser = await puppeteer.launch({
                args: ["--no-sandbox"]
              });
              const page = await browser.newPage();
              await page.goto(
                config.CAMPUSLABS_URL + "/engage/organizations?query=" + query
              );

              /*
            const nightmare = Nightmare({ show: false, waitTimeout: 10000 });
            nightmare
              .goto(config.CAMPUSLABS_URL + "/engage/organizations?query=" + query)
              .wait("#org-search-results")
              .evaluate(() => document.querySelector("#org-search-results").innerHTML)
              .end()
              .then(response => {
                console.log(getData(response));
              })
              .catch(err => {
                console.log(err);
              });
              */

              const html = await page.$eval(
                "#org-search-results",
                e => e.innerHTML
              );
              data = [];
              const $ = cheerio.load(html);
              $("div > div > div > a").each((i, elem) => {
                data.push({
                  link: $(elem).attr("href"),
                  image: $(elem)
                    .find("div > div > div > span > div > div > img")
                    .attr("src"),
                  name: $(elem)
                    .find("div > div > div > span > div > div > div")
                    .text(),
                  alt: $(elem)
                    .find("div > div > div > span > div > div > p")
                    .text()
                });
              });
              for (i = 0; i < 3; i++) {
                const clubEmbed = new discord.RichEmbed()
                  .setColor("0099ff")
                  .setTitle(data[i].name)
                  .setURL(config.CAMPUSLABS_URL + data[i].link)
                  .setDescription(data[i].alt)
                  .setImage(data[i].image)
                  .setTimestamp();
                message.channel.send(clubEmbed);
              }
              await browser.close();
            };
            break;
          }

        default:
          let in_config = false;
          for (let j = 0; j < jsonconfig.COMMAND_ARRAY.length; j++) {
            if (command === jsonconfig.COMMAND_ARRAY[j]) in_config = true;
          }
          if (in_config) {
            try {
              let commandFile = require(`./commands/${command}.js`);
              commandFile.run(
                discord,
                client,
                message,
                config,
                jsonconfig,
                request,
                args
              );
            } catch (err) {
              console.error(err);
            }
          }
      }
    } else if (message.type === "GUILD_MEMBER_JOIN") {
      message.channel
        .send("Send '!verify' to access other channels")
        .catch(reason => console.log(reason));
    }
  }
});

/* 
    VERIFICATION EMAIL
    - This uses @sendgrid/mail to send email using the SendGrid API.
*/

sendEmail = (email_address, code) =>
  sgMail
    .send({
      from: config.FROM_EMAIL,
      subject: config.EMAIL_SUBJECT,
      to: email_address.replace("!", ""),
      html: "Your verification code is: " + code
    })
    .then(
      () => {},
      error => {
        console.log(error);
      }
    );

makeid = length =>
  [...Array(length)]
    .map(() => ALPHANUM.charAt(Math.floor(Math.random() * ALPHANUM.length)))
    .join("");
