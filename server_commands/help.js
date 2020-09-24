exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
  let text = args.shift()
  if(text == null){
    const HelpEmbed = new discord.MessageEmbed()
    .setColor("0099ff")
    .setThumbnail('https://i.imgur.com/Wl8O6jV.png')  // replace with dragonbot logo
    .setAuthor('Server Commands', 'https://i.imgur.com/Wl8O6jV.png')
    .addField("**Moderator**", "``!help moderator``", true)
    .addField("**Levels**", "``!help levels``", true)
    .addField("**DragonBot**", "``!help dragonbot``", true)
    
    message.channel.send(HelpEmbed)
  } else if(text === "levels"){
    const HelpEmbed = new discord.MessageEmbed()
    .setColor("0099ff")
    .setTitle("Levels Plugin")
    .addField("``!levels``", "Get a link to the leaderboard\n\u200B")
    .addField("``!rank (optional member)``", "Get the rank of anyone in the server")
    message.channel.send(HelpEmbed)
  } else if(text === "moderator"){
    const HelpEmbed = new discord.MessageEmbed()
    //	39423
    .setColor("0099ff")
    .setTitle("Moderator Plugin")
    .setThumbnail('https://imgur.com/JsgxK3Y.png')
    .addField("``!ban [member] (optional reason)``", "Temporarily bans a member from the server\n\u200B")
    .addField("``!tempban [member] [duration] (optional reason)``", "Temporarily bans a member from the server\n\u200B")
    .addField("``!clear (optional member) (optional count)``", "Clears messages in a particular channel\n\u200B")
    .addField("``!clear-all-infractions``", "Remove all the infractions of everyone in the server\n\u200B")
    .addField("``!infractions [member]``", "Displays how many infractions this member has\n\u200B")
    .addField("``!kick [member] (optional reason)``", "Kicks a member from the server\n\u200B")
    .addField("``!mute [member] (optional reason)``", "Mutes a member in the whole server\n\u200B")
    .addField("``!tempmute [member] [duration] (optional reason)``", "Temporarily mutes a member in the server\n\u200B")
    .addField("``!role-info [role]``", "Gets information about a role\n\u200B")
    .addField("``!server-info``", "Gets information about your server\n\u200B")
    .addField("``!slowmode (optional timeout) (optional off)``", "Enables/Disables slowmode in a channel\n\u200B")
    .addField("``!unban [member]``", "Unbans a member\n\u200B")
    .addField("``!unmute [member]``", "Unmutes a member\n\u200B")
    .addField("``!user-info (optional member)``", "Gets information about a user\n\u200B")
    .addField("``!warn [member] (optional reason)``", "Warns a member")
    message.channel.send(HelpEmbed)
  } else if(text === "dragonbot"){
  
    const HelpEmbed = new discord.MessageEmbed()
    //	39423
    .setColor("0099ff")
    .setTitle("DragonBot")
    .setThumbnail('https://i.imgur.com/Wl8O6jV.png')
    .addField("``!leaderboard (optional #)``", "Pull up the Server's Mee6 EXP Leaderboard.\n# can be any non-zero number less than 20. Default is 10\n\u200B")
    .addField("``!membercount``", "Pull up the number of Users, Bots and verified Students/Alumni in the Server.\n\u200B")
    .addField("``!setup-profile``", "Start the process to create and fill your Server Profile.\n\u200B")
    .addField("``!verify``", "Start the verification process. Expect a DM from our very own DragonBot!\n\u200B")
    .addField("``!whois (optional @user)``", "Show the profile of the user you mentioned.\nWith no argument, your profile is shown.\nProfile Showings have a cool-down of 3 minutes in the Server, but you can pull your own Profile as much as you like in your DM with DragonBot.")
    
    message.channel.send(HelpEmbed);
  }
}
