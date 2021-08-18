const Discord = require('discord.js');
const { botColour } = require('../../config.json');
const fs = require('fs');

module.exports = {
	name: 'fetchsnippet',
	description: 'Info on the dev',
	category: 'Bot',
	async execute(message, client, args) {

		if(!args[0]) return message.channel.send('You havent defined a valid file name! Example of a valid file name: `dictionary.txt`');

		const filename = args[0];

		let fileextention;

		if(args[0].endsWith('.js')) fileextention = 'js';

		if(args[0].endsWith('.py')) fileextention = 'py';

		if(args[0].endsWith('.txt')) fileextention = '';

		fs.readFile(`snippets/${filename}`, async (err, buff) => {
			if (err) {
				message.channel.send('The snippet you requested doesnt exist!');
				return;
			}
			console.log('Fetched a snippet > ' + filename);

			const fileDB = filename.replace('.', '-');

			const authorID = await client.db.get(fileDB);

			const author = client.users.cache.get(authorID);

			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(filename)
				.setAuthor(`${author.username}#${author.discriminator}`, author.displayAvatarURL())
				.setDescription(`\n\`\`\`${fileextention}\n${buff.toString()}\`\`\``)
				.setTimestamp()
				.setFooter(
					`${client.user.username} || ${message.guild.name}`,
					client.user.displayAvatarURL(),
				);

			message.channel.send(embed);
		});
	},
};