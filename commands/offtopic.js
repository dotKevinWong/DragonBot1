exports.run = (client, message, config) => {
	// Because this is more fun
	let ind = Math.floor(Math.random() * 3); // Change for number of gifs
	var gifs = ["https://media1.tenor.com/images/68f72afcab3ef633a9eac5d446864acc/tenor.gif",
		    "https://media1.tenor.com/images/fa2ecae62b5c4b3d48e70c8d1d5817c1/tenor.gif",
		    "https://media1.tenor.com/images/88be4d5fb27fe650bca1f5ac359791f0/tenor.gif"
	] 

	message.delete(1000)
    	message.channel.send ( {
      		embed : {
        		color : 16777215,
        		title : "The Conversation is Off-Topic",
        		description : "Please move off topic conversation to [#random](https://discordapp.com/channels/323942271550750720/493532569657278476) or appropriate channel",
        		image : {
        			url: gifs[ind] },
        		footer : {
         			text: "Requested by " +message.author.username,
        			icon_url: client.user.avatarURL
        		}
      		}
    	})
    	.then(msg => {
    		msg.delete(30000)
    	})
};
