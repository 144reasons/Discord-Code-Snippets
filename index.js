// ──────────────────────────────────────────────────────────────────── [ Start of index.js & dependencies ]

const Discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const { inspect } = require('util');
const Josh = require('@joshdb/core');
const provider = require('@joshdb/sqlite');

// ──────────────────────────────────────────────────────────────────── [ Start DB ]

const db = new Josh({
	name: 'db',
	provider,
});

db.defer.then(() => {
	console.log('Connected to the database.');
	client.db = db;
});

// ──────────────────────────────────────────────────────────────────── [ Check if config exists ]

if (!fs.existsSync('./config.json')) {
	return console.log('Your config hasnt been created!');
}

const { token } = require('./config.json');

// ──────────────────────────────────────────────────────────────────── [ Client start ]

// const client = new Discord.Client({
// 	ws: { properties: { $browser: 'Discord iOS' } },
// });

const client = new Discord.Client();

const eventFiles = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));
client.commands = new Discord.Collection();

// ──────────────────────────────────────────────────────────────────── [ Event handler ]

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

// ──────────────────────────────────────────────────────────────────── [ Part of command handler ]

const { readdirSync } = require('fs');
const commandFolders = readdirSync('./commands');
commandFolders.forEach((x) => {
	const commandFiles = fs
		.readdirSync(`./commands/${x}`)
		.filter((file) => file.endsWith('.js'));
	commandFiles.forEach((d) => {
		const command = require(`./commands/${x}/${d}`);

		client.commands.set(command.name, command);
	});
});

// ──────────────────────────────────────────────────────────────────── [ Pretty exiting reminder ]

process.on('SIGINT', async () => {
	console.log(chalk.bold.red('Process ended! Exiting...'));
	process.exit();
});

// ──────────────────────────────────────────────────────────────────── [ Login ]

client.login(token);