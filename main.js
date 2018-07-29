const botSettings = require("./botsettings.json");
const prefix = botSettings.prefix;
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);

	if(!command.startsWith(prefix)) return;

	if(command === `${prefix}userinfo`){
		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.username)
			.setDescription("This is the user's info")
			.setColor("#9B59B6")
			.addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
			.addField("ID", message.author.id)
			.addField("Created At", message.author.createdAt);

		message.channel.send(embed);
		return;
	}

	if(message.content == "ping"){
		message.reply('pong');
		//message.channel.send("OH MY WHAT ROBIN?!?!?!");
	}
});

bot.on("ready", async() => {
	console.log(`Bot is ready! ${bot.user.username}`);
	try{
		let link = await bot.generateInvite(["ADMINISTRATOR"]);
		console.log(link);
	} catch(e){
		console.log(e.stack);
	}
});

bot.login(botSettings.token);