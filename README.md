# Info

Built using [Discord.js](https://discord.js.org), [KeyV](https://github.com/lukechilds/keyv), [Cheerio.js](https://cheerio.js.org), [Puppeteer](https://github.com/puppeteer/puppeteer), [SendGrid](https://github.com/sendgrid/sendgrid-nodejs)

Some code based on [seanbudd](https://github.com/seanbudd)/[discord-email-verification](https://github.com/seanbudd/discord-email-verification) bot.

# Setup

Requires node/npm

Run `npm install .`

# Config

The current config uses a .env file.


```js
{
  NAME=
  DISCORD_API_TOKEN=
  SERVER_NAME=
  SERVER_ID=
  VERIFICATION_CHANNEL_ID=
  VERIFICATION_LOG_CHANNEL_ID=
  CLUB_CHANNEL_ID=
  PREFIX=
  MEE6_LEADERBOARD_URL=
  MEE6_LEADERBOARD_DESCRIPTION=
  RICH_PRESCENCE_TYPE=
  RICH_PRESCENCE_TEXT=
  OFFTOPIC_DESCRIPTION=
  CAMPUSLABS_URL=
  ROLE_NAME=
  EMAIL_REGEX1=
  EMAIL_REGEX2=
  FROM_EMAIL=
  EMAIL_SUBJECT=
  EMAIL_API_KEY=
}
```

# Running

Start the bot by running

`>>> node bot.js`

or

`>>> npm start`
