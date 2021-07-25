const Discord = require('discord.js');
const { botColour } = require('../../config.json');
const fs = require('fs');

module.exports = {
	name: 'createsnippet',
	description: 'Info on the dev',
	category: 'Bot',
	execute(message, client, args) {

		if(!args[0]) return message.channel.send('You havent defined a valid file name! Example of running the command: `!createsnippet dictionary txt`');

		if(!args[0].endsWith('.js') && !args[0].endsWith('.py') && !args[0].endsWith('.txt')) return message.channel.send('You havent defined a valid file type! Valid file types contain `.js`, `.py` and `.txt`. Example of running the command: `!createsnippet dictionary txt`. More may come in the future');

		const filename = args[0];

		if (fs.existsSync(`snippets/${filename}`)) return message.channel.send('A snippet with this name already exists!');

		args.shift();

		const snippet = args.join(' ');

		fs.writeFile(`snippets/${filename}`, snippet, function(err) {
			if (err) return console.log(err);
			console.log(`Created new snippet > ${filename}`);
		});

		message.channel.send(`Your snippet has been saved with the name \`${filename}\``);
	},
};