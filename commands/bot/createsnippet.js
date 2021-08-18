const Discord = require('discord.js');
const fs = require('fs');
const { prefix } = require('../../config.json');

module.exports = {
	name: 'createsnippet',
	description: 'Info on the dev',
	category: 'Bot',
	async execute(message, client, args) {
		const file = args[0];

		if(!file) return message.channel.send('You havent defined a valid file name! Example of running the command: `!createsnippet dictionary txt`');

		if (fs.existsSync(`snippets/${file}`)) return message.channel.send('A snippet with this name already exists!');

		if(!file.endsWith('.js') && !file.endsWith('.py') && !file.endsWith('.txt')) return message.channel.send('You havent defined a valid file type! Valid file types contain `.js`, `.py` and `.txt`. Example of running the command: `!createsnippet dictionary txt`. More may come in the future');

		if(file.startsWith('.')) {
			message.channel.send('There was an issue with saving your snippet! You are now blacklisted till deemed suitable to return to society!');

			return await client.db.set(`${message.author.id}_blacklisted`, true);
		}

		args.shift();

		const snippet = args.join(' ');

		const fileDB = file.replace('.', '-');

		await client.db.set(fileDB, message.author.id);

		if(!await client.db.get(`${message.author.id}_snippets`)) await client.db.set(`${message.author.id}_snippets`, []);

		await client.db.push(`${message.author.id}_snippets`, `${fileDB}`);

		fs.writeFile(`snippets/${file}`, snippet, function(err) {
			if (err) {
				console.log(err);
				return message.channel.send('There was an issue with saving your snippet! Please contact the developer of the bot.');
			}
			console.log(`Created new snippet > ${file}`);

			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`Created a new snippet called ${file}`)
				.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
				.setDescription(`Your snippet has been saved with the name \`${file}\`\nRun the command \`${prefix}fetchsnippet ${file}\` to view your newly created snippet!`)
				.setTimestamp()
				.setFooter(
					`${client.user.username} || ${message.guild.name}`,
					client.user.displayAvatarURL(),
				);

			message.channel.send(embed);
		});
	},
};