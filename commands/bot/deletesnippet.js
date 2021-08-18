const { owner } = require('../../config.json');
const fs = require('fs');

module.exports = {
	name: 'deletesnippet',
	description: 'Delete your snippet',
	category: 'Bot',
	async execute(message, client, args) {

		if(!args[0]) return message.channel.send('You havent defined a valid file name! Example of running the command: `!deletesnippet dictionary txt`');

		const filename = args[0];

		if (!fs.existsSync(`snippets/${filename}`)) return message.channel.send('A snippet with this name doesnt exists!');

		const fileDB = args[0].replace('.', '-');

		const authorID = await client.db.get(fileDB);

		const author = client.users.cache.get(authorID);

		if(message.author.id !== authorID && message.author.id !== owner) return message.channel.send('You didnt create this snippet!');

		try {
			fs.unlinkSync(`snippets/${filename}`);
		}
		catch(err) {
			console.error(err);
		}

		message.channel.send('The specified snippet has been deleted');
	},
};