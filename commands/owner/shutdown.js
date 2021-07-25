const chalk = require('chalk');

module.exports = {
	name: 'shutdown',
	description: 'Shutdown',
	ownersOnly: true,
	hidden: true,
	async execute(message, client, args) {
		await message.channel.send('Shutting down...');

		console.log(
			chalk.red(
				`Shutdown has been requested by: ${message.author.username}#${message.author.discriminator} (ID: ${message.author.id})`,
			),
		);

		console.log('Goodbye!');

		process.exit(1);
	},
};