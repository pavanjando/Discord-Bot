const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const prefix = botSettings.prefix;
const bot = new Discord.Client({disableEveryone: true});
const streamOptions = { seek: 0, volume: 1 };

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

	if (message.member.voiceChannel) {
		if(command === `${prefix}join`){
      		message.member.voiceChannel.join()
        		.then(connection => { // Connection is an instance of VoiceConnection
          			message.reply('Connected');
          			const stream = ytdl('https://www.youtube.com/watch?v=6fB8QiPTadY', { filter : 'audioonly' });
    				const dispatcher = connection.playStream(stream, streamOptions);
        		})
        		.catch(console.error);
    	} else if(command === `${prefix}leave`){
    		message.member.voiceChannel.leave()
    	} else if(command === `${prefix}play`){
    		message.member.voiceChannel.join()
        		.then(connection => {
          			const stream = ytdl(args.toString(), { filter : 'audioonly' });
    				const dispatcher = connection.playStream(stream, streamOptions);
        		})
        		.catch(console.error);
    	}
	} else {
      	message.reply('You need to join a voice channel first!');
    }

	if(command === `${prefix}ping`){
		message.reply('pong');
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