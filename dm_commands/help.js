exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
 const HelpEmbed = new discord.MessageEmbed()
          //	39423
          .setColor("0099ff")
          .setTitle("Direct Message Commands")
          .setThumbnail("https://i.imgur.com/Wl8O6jV.png")
          .addField("``!code (Code From Verification Email)``", "Provide the bot the verification code you received from the verification email.\n\u200B")
          .addField("``!email (Drexel Email to send Verification Email)``", "Provide the bot the Drexel email to which a verification email will be sent.\n\u200B")
          .addField("``!set (Field) (Options)``", "Add information to your profile. Valid fields include:\nName, Pronouns, Major, College, Year, Plan, Description, Coop, Clubs\n\u200B")
          .addField("``!whois``", "Show your profile. Can only view your profile.")
 
 message.channel.send(HelpEmbed);
}