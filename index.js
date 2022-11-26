// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { guildId } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// sends message depending on nomral message text
client.on('messageCreate', (message) => {

	if (!message.author.bot && message.content.toLowerCase().includes('ratjam')){
		message.channel.send('https://tenor.com/view/ratatouille-rat-ratjam-catjam-ratjammers-gif-21929051')
	}

	if(!message.author.bot && message.content.toLowerCase().includes('super')){
		const randNum = Math.floor(Math.random() * 4) + 1
		switch (randNum) {
			case 1:
				message.channel.send('https://tenor.com/view/one-piece-franky-super-dance-gif-13405960')
				break;
			case 2:
				message.channel.send('https://tenor.com/view/franky-super-one-piece-anime-funny-gif-17807980')
				break;
			case 3:
				message.channel.send('https://tenor.com/view/one-piece-luffy-monkey-d-luffy-franky-franky-super-gif-24670944')
				break;
			case 4:
				message.channel.send('https://tenor.com/view/franky-suuuuper-gif-18135924')
				break;
		}
	}
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//TODO to test use your bottest server ewd, right click and copy id and past
// on to guildId in config file
// Login to Discord with your client's token
client.login(token);
