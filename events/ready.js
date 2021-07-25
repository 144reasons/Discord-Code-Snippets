const chalk = require('chalk');
const { textSync } = require('figlet');
const { botName, botColour } = require('../config.json');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		// ──────────────────────────────────────────────────────────────────── [ Prints the bot name in console ]

		console.log(
			chalk.hex(botColour)(
				textSync(`${botName}!`, {
					font: 'Slant',
					horizontalLayout: 'fitted',
					verticalLayout: 'default',
					width: 80,
					whitespaceBreak: true,
				}),
			),
		);

		// ──────────────────────────────────────────────────────────────────── [ Sets the bots activity ]

		client.user.setActivity('a Minecraft Tournament!', { type: 'COMPETING' });

		// ────────────────────────────────────────────────────────────────────  [ Adds a little indicator to indicate the bot is ready! (Runs for 30 seconds) ]

		console.log(`The bot is nice and set! Logged in as: ${client.user.tag}`);

		// ────────────────────────────────────────────────────────────────────
	},
};