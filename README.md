## 🛑 **Attention** 🛑
🗣️ This project is no longer maintained. The bot has been completely re-written. The new project can be found [here](https://github.com/dotKevinWong/DragonBot). 

🏛️ This repository is archived for historical purposes. 
#
# 🤖 DragonBot
🐉 A general purpose moderation bot built for Drexel University's Discord Server.


## 💁‍♂️ Info

Built using [Discord.js](https://discord.js.org), [KeyV](https://github.com/lukechilds/keyv), [Cheerio.js](https://cheerio.js.org), [Puppeteer](https://github.com/puppeteer/puppeteer), [SendGrid](https://github.com/sendgrid/sendgrid-nodejs)

Some code based on [seanbudd](https://github.com/seanbudd)/[discord-email-verification](https://github.com/seanbudd/discord-email-verification) bot.

## 🛠️ Setup

Requires node/npm

Run `npm install .`

## ⚙️ Config

The current config scheme uses a `config.json` and `.env` file.

### `config.json`

```json
{
  "WELCOME_USER_DM":
  "PROFILE_DM_ERROR":
  "IMAGE_ARRAY":
  "NO_HORNY_ARRAY":
  "HORNY_ARRAY":
  "NFT_ARRAY":
  "SERVER_COMMAND_ARRAY":
  "DM_COMMAND_ARRAY":
}
```

### `.env`

```env
CAMPUSLABS_URL=
CLUBS_CHANNEL_ID=
DISCORD_API_TOKEN=
EMAIL_API_KEY=
EMAIL_REGEX1=
EMAIL_REGEX2=
EMAIL_SUBJECT=
FROM_EMAIL=
INTRODUCTIONS_ID=
MEE6_LEADERBOARD_DESCRIPTION=
MEE6_LEADERBOARD_URL=
MODERATOR_ROLE_ID=
MOD_LOGS_CHANNEL_ID=
NAME=
OFFTOPIC_DESCRIPTION=
PREFIX=
RICH_PRESENCE_TEXT=
RICH_PRESENCE_TYPE=
ROLE_NAME=
SERVER_ID=
SERVER_NAME=
VERIFICATION_CHANNEL_ID=
VERIFICATION_LOG_CHANNEL_ID=
VERIFICATION_ROLE_ID=
```

## 💫 Running

Start the bot by running

`>>> node bot.js`

or

`>>> npm start`

## 📝 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## 👨‍⚖️ Legal
This project is not affiliated with Drexel University. DragonBot is not an official Drexel University product and is not endorsed by Drexel University.