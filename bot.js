const discord = require("discord.js");
const admin = require('firebase-admin');
const serviceAccount = require('./serviceKey.json');
const sgMail = require("@sendgrid/mail");
const Keyv = require("keyv")

// config files
const config_env =
  process.env.DISCORD_API_TOKEN == undefined ? require("./.env") : process.env;

const config = require("./config.json");

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
let db = admin.firestore();

// intalize discord
const client = new discord.Client();
client.once("ready", () => console.log("Starting DragonBot!"));
client
  .login(process.env.DISCORD_API_TOKEN)
  .then(console.log("Logged In to Discord API!"));

// Discord Rich Presense
client.on("ready", () => {
  client.user.setActivity(process.env.RICH_PRESCENCE_TEXT, {
    type: process.env.RICH_PRESCENCE_TYPE
  });
});


// DM new user on join
client.on("guildMemberAdd", member => {
  member.send(config.WELCOME_USER_DM);
  member.guild.channels.cache.get(process.env.VERIFICATION_CHANNEL_ID).send("Please welcome " + member.user.username +"#" + member.user.discriminator + " ( <@" + member.id + "> ) to the unofficial Drexel University Discord!"); 
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

sgMail.setApiKey(process.env.EMAIL_API_KEY);

setInterval(function() {
  code_discord_temp.clear();
  code_email_temp.clear();
}, 60 * 60 * 500);

client.on("message", message => {
  if (message.author.bot) {
    return;
  }
  if (message.content.charAt(0) == process.env.PREFIX) {
    const args = message.content.slice(process.env.PREFIX.length).split(" ");
    const command = args.shift().toLowerCase();
    
    if (message.channel.guild == null) {
      let in_config = false;
      for (let j = 0; j < config.DM_COMMAND_ARRAY.length; j++) {
        if (command === config.DM_COMMAND_ARRAY[j]) in_config = true;
      }
      if (in_config) {
        try {
          let commandFile = require(`./dm_commands/${command}.js`);
          commandFile.run(
            discord,
            client,
            db,
            message,
            args,
            discord_email,
            code_email_temp,
            code_discord_temp
          );
        } catch (err) {
          console.error(err);
        }
      }
    
    } else if (message.channel.guild.id == process.env.SERVER_ID) {      
      let in_config = false;
      for (let j = 0; j < config.SERVER_COMMAND_ARRAY.length; j++) {
        if (command === config.SERVER_COMMAND_ARRAY[j]) in_config = true;
      }
      if (in_config) {
        try {
          let commandFile = require(`./server_commands/${command}.js`);
          commandFile.run(
            discord,
            client,
            db,
            message,
            args
          );
        } catch (err) {
          console.error(err);
        }
      }
    } else if (message.type === "GUILD_MEMBER_JOIN") {
      message.channel
        .send("Send '!verify' to access other channels")
        .catch(reason => console.log(reason));
    }
  }
});
