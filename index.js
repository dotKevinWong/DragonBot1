const CONFIG = process.env.DISCORD_LOGIN_API_TOKEN == undefined ? require('./config.json') : process.env

// const cryptoJSON = require('crypto-json')

// const ENCRYPTED_MEMBERS = require('./members.json')

// const MEMBERS =
//  (CONFIG.CRYPTO_JSON_MEMBER_ENCRYPT_KEY != undefined
//    ? cryptoJSON.decrypt(ENCRYPTED_MEMBERS, CONFIG.CRYPTO_JSON_MEMBER_ENCRYPT_KEY, {
//      encoding: CONFIG.CRYPTO_JSON_ENCODING,
//      keys: ['members'],
//      algorithm: CONFIG.CRYPTO_JSON_ALGORITHM
//    }).members
//    : ENCRYPTED_MEMBERS.members).map(email => email.toLowerCase())

const { Email } = require('./smtp.js')

const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

const Keyv = require('keyv')
const discord_email = new Keyv(CONFIG.DATABASE_URL, { namespace: 'discord_email' })
const code_email_temp = new Keyv(CONFIG.DATABASE_URL, { namespace: 'code_email_temp' })
const code_discord_temp = new Keyv(CONFIG.DATABASE_URL, { namespace: 'code_discord_temp' })
const ALPHANUM = '0123456789'

code_discord_temp.clear()
code_email_temp.clear()

// Conolse Log Startup of Bot
client.once('ready', () => console.log('Starting!'))
client.login(CONFIG.DISCORD_LOGIN_API_TOKEN).then(console.log('Logged In!'))

// Discord Rich Presence
client.on("ready", () => {
    client.user.setActivity("with Shafted Machines", { type: "PLAYING" })
})

// Welcome DM User
client.on('guildMemberAdd', member => {
  member.send("Welcome to the **Unofficial Drexel University Discord Server!** " + "In <#493535288661114881>, please type !verify to verify yourself! Under <#578369377607352321>, make sure to add your Major and Class Year!");
});

// Message Listening

client.on('message', message => {
	if (message.author.bot) {
	    return
	}
	switch(message){


	default:
		const command = message.content.slice(1);
		try{
			let commandFile = require(`./commands/${command}.js`);
			commandFile.run(client, message, Keyv, config);
		} catch (err) {
			console.error(err);
		}
	}
	
});

/*

client.on('message', message => {
  if (message.content === '!offtopic') {
    message.delete(1000)
    message.channel.send ( {
      embed : {
        color : 16777215,
        title : "The Conversation is Off-Topic",
        description : "Please move off topic conversation to [#random](https://discordapp.com/channels/323942271550750720/493532569657278476) or appropriate channel",
        image : {
          url: "https://media1.tenor.com/images/68f72afcab3ef633a9eac5d446864acc/tenor.gif"
        },
        footer : {
          text: "Requested by " +message.author.username,
          icon_url: client.user.avatarURL
        }
      }
    })
    .then(msg => {
      msg.delete(30000)
    })
  }
  if (message.content === '!dragonbot') {
    message.delete(1000)
    message.channel.send ( {
      embed : {
        color : 16777215,
        title : "Hello, I'm DragonBot",
        description : "I'm a bot built for the Drexel Discord Server. Fork Me on [GitHub](https://github.com/dotKevinWong/DragonBot/). Find out what I can do below:",
        fields : [
          {
            name : 'Verify Users',
            value : 'I handle all user verifications to make sure our users are actual Drexel Students!',
          },
          {
            name : 'Moderate Chat',
            value : "If a chat is becoming off-topic, request the !offtopic command and I\'ll help moderate the chat",
          },
          {
            name : '+ More Features',
            value : "I'm continually adding features, just mention @KevinWong#0001 if you want something added",
          },     
        ],
      }
    })
    .then(msg => {
      msg.delete(120000)
    })
  }
  if (message.content === '!membercount') {
    message.channel.send ( {
      embed : {
        color : 16777215,
        title : "Member Count",
        fields : [
          {
            name : 'Members',
            value : message.channel.guild.memberCount
          },
          {
            name : 'Humans',
            value : message.channel.guild.memberCount - message.channel.guild.members.filter(member => member.user.bot).size
          },
          {
            name : 'Bots',
            value : message.channel.guild.members.filter(member => member.user.bot).size
          }
        ],
      }
      })
}});
*/

// User Verification 
client.on('message', message => {
  if (message.author.bot) {
    return
  }
  const MESSAGE_PREFIX = 'Hey ' + message.author.username + '! '
  let text = message.content.trim()
  if (message.channel.id === CONFIG.WELCOME_CHANNEL_ID) {
    if (message.content === '!verify') {
      message.author
        .createDM()
        .then(dmchannel =>
          dmchannel.send('Please reply with your Drexel E-Mail for Verification').catch(reason => console.log(reason))
        )
        .catch(reason => console.log(reason))
    } else if (message.type === 'GUILD_MEMBER_JOIN') {
      message.channel
        .send(MESSAGE_PREFIX + "Send '!verify' to access other channels")
        .catch(reason => console.log(reason))
    }
  } else if (message.channel.guild == null) {
    if (new RegExp(CONFIG.EMAIL_REGEX).test(text)) {
      let email_address = text
      if (email_address) {
        let code = makeid(6)
        code_email_temp.set(code, email_address, 10 * 60 * 1000)
        code_discord_temp.set(code, message.author.id, 10 * 60 * 1000)
        sendEmail(email_address, code)
          .then(
            message.channel
              .send(MESSAGE_PREFIX + 'Please check your email and reply with the code we sent you! It may be in your **JUNK** or **SPAM** folder')
              .catch(reason => console.log(reason))
          )
          .catch(reason => console.log(reason))
      } else { 
        message.channel.send(MESSAGE_PREFIX + CONFIG.MEMBER_JOIN_MESSAGE).catch(reason => console.log(reason))
      }
    } else if (text.match(/^[a-zA-Z0-9]{6}$/)) {
      Promise.all([code_email_temp.get(text), code_discord_temp.get(text)])
        .then(([email_address, discord_id]) => {
          if (email_address && discord_id && discord_id === message.author.id) {
            discord_email.set(message.author.id, email_address)
            let guild = client.guilds.get(CONFIG.GUILD_ID)
            let role = guild.roles.find(role => role.name === CONFIG.ROLE_NAME)
            guild
              .fetchMember(message.author)
              .then(member =>
                member
                  .addRole(role)
                  .then(message.channel.send('You are now **verified!**').catch(reason => console.log(reason)))
              )
              .catch(reason => console.log(reason))
          } else {
            message.channel.send(MESSAGE_PREFIX + "That code isn't right. Please make sure you have the right code.")
          }
        })
        .catch(reason => console.log(reason))
    }
  }
})

isMember = email_address => MEMBERS.indexOf(email_address.toLowerCase()) > -1

// STMPJS E-Mail
// https://www.smtpjs.com/
sendEmail = (email_address, code) =>
  Email.send({
    SecureToken: CONFIG.SMTP_JS_LOGIN_TOKEN,
    To: email_address,
    From: CONFIG.FROM_EMAIL,
    Subject: CONFIG.EMAIL_SUBJECT,
    Body: 'Your code is: ' + code
  })

makeid = length => [...Array(length)].map(() => ALPHANUM.charAt(Math.floor(Math.random() * ALPHANUM.length))).join('')
