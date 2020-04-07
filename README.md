# Info

Built using [Discord.js](https://discord.js.org), [KeyV](https://github.com/lukechilds/keyv), [Cheerio.js](https://cheerio.js.org), [Nightmare](https://github.com/segmentio/nightmare), [Sendgrid-Nodejs](https://github.com/sendgrid/sendgrid-nodejs)

Some code based on [seanbudd](https://github.com/seanbudd)/[discord-email-verification](https://github.com/seanbudd/discord-email-verification) bot.

# Setup

Requires node/npm

Run `npm install .`

# Config

Make a copy of config.json.template named config.json. You can alternatively use process.env for the same data.


```js
{
    "NAME": "Drexel",
    "DISCORD_API_TOKEN": "<discordAPIToken>",
    "SERVER_NAME": "<XYZ> Discord Server",
    "SERVER_ID": "<guildID>",
    "VERIFICATION_CHANNEL_ID": "",
    "MEE6_LEADERBOARD_URL": "https://mee6.xyz/leaderboard/<MEE6_ID>",
    "MEE6_LEADERBOARD_DESCRIPTION": "These are the top members of the <XYZ> Discord Server",
    "RICH_PRESCENCE_TYPE": "Watching",
    "RICH_PRESCENCE_TEXT": "over the Students",
    "OFFTOPIC_DESCRIPTION": "Please move off topic conversation to [#random](https://discordapp.com/channels/<guidID>/<channelID>) or appropriate channel",
    "OFFTOPIC_IMAGE_ARRAY": [
        "https://example.com/gif1.gif",
        "https://example.com/gif2.gif"
    ],
    "CAMPUSLABS_URL": "https://org.campuslabs.com/",
    "ROLE_NAME": "Verified",
    "EMAIL_REGEX": ".*@.*",
    "FROM_EMAIL": "noreply@xyz.com",
    "EMAIL_SUBJECT": "XYZ Verification",
    "EMAIL_API_KEY": "<SEND GRID API KEY>",
    "EMAIL_BODY1": "Your code is: "
    "EMAIL_BODY2": "Thank You!",
    "WELCOME_USER_DM": "Welcome to the **XYZ Discord Server!** In <#ChannelID>, please type !verify to verify yourself! Under <#ChannelID>, make sure to add your Major and Class Year!"
}
```

# Running

Start the bot by running

`>>> node bot.js`

or

`>>> npm start`
