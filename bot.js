const discord = require("discord.js");
const cheerio = require("cheerio");
const Nightmare = require("nightmare");
const Keyv = require("keyv");
const ElasticEmail = require("nodelastic");

// config file
const config =
	process.env.DISCORD_API_TOKEN == undefined
		? require("./config.json")
		: process.env;

// intalize discord
const client = new discord.Client();
client.once("ready", () => console.log("Starting DragonBot!"));
client
	.login(config.DISCORD_API_TOKEN)
	.then(console.log("Logged In to Discord API!"));

const Email = new ElasticEmail(config.EMAIL_API);

// discord rich presense
client.on("ready", () => {
	client.user.setActivity(config.RICH_PRESCENCE_TEXT, {
		type: config.RICH_PRESCENCE_TYPE
	});
});

client.on("guildMemberAdd", member => {
	member.send(config.WELCOME_USER_DM);
});

/* 
    LEADERBOARD
    - This uses cheerio.js and Nightmare to parse the MEE6 Leaderboard website and returns the result of the top 3 users.
*/
client.on("message", message => {
	if (message.content === "!leaderboard") {
		message.channel.send("Fetching...").then(msg => {
			msg.delete(5000);
		});
		const nightmare = Nightmare({ show: false, waitTimeout: 10000 });
		nightmare
			.goto(config.MEE6_LEADERBOARD_URL)
			.wait(".leaderboardContainer")
			.evaluate(() => document.querySelector(".leaderboardContainer").innerHTML)
			.end()
			.then(response => {
				console.log(getData(response));
			})
			.catch(err => {
				console.log(err);
			});

		let getData = html => {
			data = [];
			const $ = cheerio.load(html);
			$(".leaderboardPlayer > .leaderboardPlayerLeft").each((i, elem) => {
				data.push({
					rank: $(elem)
						.find(".leaderboardRank")
						.text(),
					username: $(elem)
						.find("div.leaderboardPlayerUsername")
						.text(),
					icon: $(elem)
						.find("div.leaderboardPlayerIcon > img")
						.attr("src")
				});
			});
			const rankEmbed = new discord.RichEmbed()
				.setColor("0099ff")
				.setTitle("Top Members")
				.setURL(config.MEE6_LEADERBOARD_URL)
				.setDescription(config.MEE6_LEADERBOARD_DESCRIPTION)
				.addField(":crown:", data[0].username)
				.addField(":second_place:", data[1].username)
				.addField(":third_place:", data[2].username)
				.addField(":four:", data[3].username)
				.addField(":five:", data[4].username)
				.setTimestamp();
			message.channel.send(rankEmbed);
		};
	}
});

client.on("message", message => {
	if (message.content === "!dragonbot") {
		message.delete(1000);
		message.channel
			.send({
				embed: {
					color: 16777215,
					title: "Hello, I'm DragonBot",
					description:
						"I'm a bot built for the Drexel Discord Server. Fork Me on [GitHub](https://github.com/dotKevinWong/DragonBot/). Find out what I can do below:",
					fields: [
						{
							name: "Verify Users",
							value:
								"I handle all user verifications to make sure our users are actual Drexel Students!"
						},
						{
							name: "Moderate Chat",
							value:
								"If a chat is becoming off-topic, request the !offtopic command and I'll help moderate the chat"
						},
						{
							name: "+ More Features",
							value:
								"I'm continually adding features, just mention @KevinWong#0001 if you want something added"
						}
					]
				}
			})
			.then(msg => {
				msg.delete(120000);
			});
	}
});

client.on("message", message => {
	if (message.content === "!membercount") {
		message.channel.send({
			embed: {
				color: 16777215,
				title: "Member Count",
				fields: [
					{
						name: "Members",
						value: message.channel.guild.memberCount
					},
					{
						name: "Humans",
						value:
							message.channel.guild.memberCount -
							message.channel.guild.members.filter(member => member.user.bot)
								.size
					},
					{
						name: "Bots",
						value: message.channel.guild.members.filter(
							member => member.user.bot
						).size
					}
				]
			}
		});
	}
});

/* 
    OFF-TOPIC
    - This pulls from an array of images and return to the chat a custom off-topic messsage.
*/
client.on("message", message => {
	if (message.content === "!offtopic") {
		message.delete(1000);
		message.channel
			.send({
				embed: {
					color: 16777215,
					title: "The Conversation is Off-Topic",
					description: config.OFFTOPIC_DESCRIPTION,
					image: {
						url:
							config.OFFTOPIC_IMAGE_ARRAY[
								Math.floor(Math.random() * config.OFFTOPIC_IMAGE_ARRAY.length)
							]
					},
					footer: {
						text: "Requested by " + message.author.username,
						icon_url: client.user.avatarURL
					}
				}
			})
			.then(msg => {
				msg.delete(60000);
			});
	}
});

client.on("message", message => {
	if (!message.content.startsWith("!") || message.author.bot) return;
	const args = message.content.slice("!".length).split(" ");
	const command = args.shift().toLowerCase();

	if (command === "club") {
		const query = args[0] + "%20" + args[1] + "%20";
		message.channel.send("Fetching...").then(msg => {
			msg.delete(5000);
		});
		const nightmare = Nightmare({ show: false, waitTimeout: 10000 });
		nightmare
			.goto("https://drexel.campuslabs.com/engage/organizations?query=" + query)
			.wait("#org-search-results")
			.evaluate(() => document.querySelector("#org-search-results").innerHTML)
			.end()
			.then(response => {
				console.log(getData(response));
			})
			.catch(err => {
				console.log(err);
			});

		let getData = html => {
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
					.setURL("https://drexel.campuslabs.com" + data[i].link)
					.setDescription(data[i].alt)
					.setImage(data[i].image)
					.setTimestamp();
				message.channel.send(clubEmbed);
			}
		};
	}
});

/* 
    VERIFICATION
    - This uses keyv and a sqlite database to store the generated codes of verified users.
    - This compares a users e-mail address against a Regex.
*/
const discord_email = new Keyv("", {
	namespace: "discord_email"
});
const code_email_temp = new Keyv("", {
	namespace: "code_email_temp"
});
const code_discord_temp = new Keyv("", {
	namespace: "code_discord_temp"
});
const ALPHANUM = "0123456789";

code_discord_temp.clear();
code_email_temp.clear();

client.on("message", message => {
	if (message.author.bot) {
		return;
	}
	let text = message.content.trim();
	if (message.channel.id === config.VERIFICATION_CHANNEL_ID) {
		if (message.content === "!verify") {
			message.author
				.createDM()
				.then(dmchannel =>
					dmchannel
						.send("Please reply with your Drexel E-Mail for Verification")
						.catch(reason => console.log(reason))
				)
				.catch(reason => console.log(reason));
		} else if (message.type === "GUILD_MEMBER_JOIN") {
			message.channel
				.send("Send '!verify' to access other channels")
				.catch(reason => console.log(reason));
		}
	} else if (message.channel.guild == null) {
		if (new RegExp(config.EMAIL_REGEX).test(text)) {
			let email_address = text;
			if (email_address) {
				let code = makeid(6);
				code_email_temp.set(code, email_address, 10 * 60 * 1000);
				code_discord_temp.set(code, message.author.id, 10 * 60 * 1000);
				sendEmail(email_address, code)
					.then(
						message.channel
							.send(
								"Please check your email and reply with the code we sent you! It may be in your **JUNK** or **SPAM** folder."
							)
							.catch(reason => console.log(reason))
					)
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
					} else {
						message.channel.send(
							"That code isn't right. Please make sure you have the right code."
						);
					}
				})
				.catch(reason => console.log(reason));
		}
	}
});

sendEmail = (email_address, code) =>
	Email.send({
		from: config.FROM_EMAIL,
		fromName: config.SERVER_NAME,
		subject: config.EMAIL_SUBJECT,
		msgTo: [email_address],
		bodyHtml: "Your verification code is: " + code
	}).then(console.log);

makeid = length =>
	[...Array(length)]
		.map(() => ALPHANUM.charAt(Math.floor(Math.random() * ALPHANUM.length)))
		.join("");
