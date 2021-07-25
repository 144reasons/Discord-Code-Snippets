const Discord = require('discord.js');
const { botColour } = require('../../config.json');
const fs = require('fs');

module.exports = {
	name: 'deletesnippet',
	description: 'Info on the dev',
	category: 'Owner',
	execute(message, client, args) {

		if(!args[0]) return message.channel.send('You havent defined a valid file name! Example of running the command: `!deletesnippet dictionary txt`');

		const filename = args[0];

		if (!fs.existsSync(`snippets/${filename}`)) return message.channel.send('A snippet with this name doesnt exists!');

		const snippet = args.join(' ');

		try {
			fs.unlinkSync(`snippets/${filename}`);
		}
		catch(err) {
			console.error(err);
		}

		message.channel.send('The specified snippet has been deleted');
	},
};