var moment = require('moment');

module.exports = (client) => {

	/*
	LOGGING FUNCTION

	Logs to console. Future patches may include time+colors
	*/
	client.log = (type, msg, title) => {
		var time = moment().format(client.config.logTimeFormat);
		if (!title) title = 'Log';
		console.log(`${time}: [${type}] [${title}] ${msg}`);
	};


	/*
	SINGLE-LINE AWAITMESSAGE

	A simple way to grab a single reply, from the user that initiated
	the command. Useful to get "precisions" on certain things...

	USAGE

	const response = await client.awaitReply(msg, "Favourite Color?");
	msg.reply(`Oh, I really love ${response} too!`);

	*/
	client.awaitReply = async (msg, question, limit = 60000) => {
		const filter = m => m.author.id = msg.author.id;
		await msg.channel.send(question);
		try {
			const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
			return collected.first().content;
		} catch (e) {
			return false;
		}
	};

	client.version = require('../package.json').version;

	// These 2 simply handle unhandled things. Like Magic. /shrug
	process.on('uncaughtException', (err) => {
		const errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './'); // eslint-disable-line no-useless-escape
		console.error('Uncaught Exception: ', errorMsg);
	});

	process.on('unhandledRejection', err => {
		console.error('Uncaught Promise Error: ', err);
	});
};
