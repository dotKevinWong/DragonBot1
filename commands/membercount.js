exports.run = (client, message, Keyv, config) => {
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
};
