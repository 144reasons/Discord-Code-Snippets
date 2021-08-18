module.exports = {
	name: 'removeblacklist',
	description: 'removeblacklist',
	async execute(message, client, args) {

		function getUserFromMention(mention) {
			if (!mention) return;

			if (mention.startsWith('<@') && mention.endsWith('>')) {
				mention = mention.slice(2, -1);

				if (mention.startsWith('!')) {
					mention = mention.slice(1);
				}

				return client.users.cache.get(mention);
			}
		}


		if (args[0]) {
			const user = getUserFromMention(args[0]);
			if (!user) {
				return message.reply('Please use a proper mention if you want to see unblacklist someone');
			}

			await client.db.delete(`${user.id}_blacklisted`);

			return message.channel.send('Unblacklisted that user!');
		}
		else {message.channel.send('You didnt mention anyone!');}
	},
};