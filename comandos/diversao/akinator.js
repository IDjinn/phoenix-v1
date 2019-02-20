
		let sessions = new Map();
		const request = require('node-superfetch');
		const { MessageEmbed } = require('discord.js');
		const Discord = require('discord.js');
		const { stripIndents } = require('common-tags');
		const { verificar } = require('../../utilitarios/util.js');
		

		async function createSession(channel) {
			const { body } = await request
				.get('http://62.4.22.192:8166/ws/new_session')
				.query({
					partner: '',
					player: 'website-desktop',
					uid_ext_session: '',
					frontaddr: 'NDYuMTA1LjExMC40NQ==',
					constraint: 'ETAT<>\'AV\'',
					soft_constraint: channel.nsfw ? '' : 'ETAT=\'EN\'',
					question_filter: channel.nsfw ? '' : 'cat=1'
				});
			if (body.completion !== 'OK') return null;
			const data = body.parameters;
			sessions.set(channel.id, {
				id: data.identification.session,
				signature: data.identification.signature,
				step: 0,
				progression: Number.parseInt(data.step_information.progression, 10)
			});
			return data.step_information;
		}
	
		async function progress(channel, answer) {
			const session = sessions.get(channel.id);
			const { body } = await request
				.get('http://62.4.22.192:8166/ws/answer')
				.query({
					session: session.id,
					signature: session.signature,
					step: session.step,
					answer,
					question_filter: channel.nsfw ? '' : 'cat=1'
				});
			if (body.completion !== 'OK') return null;
			const data = body.parameters;
			sessions.set(channel.id, {
				id: session.id,
				signature: session.signature,
				step: Number.parseInt(data.step, 10),
				progression: Number.parseInt(data.progression, 10)
			});
			return data;
		}
	
		async function Guess(channel) {
			const session = sessions.get(channel.id);
			const { body } = await request
				.get('http://62.4.22.192:8166/ws/list')
				.query({
					session: session.id,
					signature: session.signature,
					step: session.step,
					size: 2,
					max_pic_width: 246,
					max_pic_height: 294,
					pref_photos: 'VO-OK',
					duel_allowed: 1,
					mode_question: 0
				});
			if (body.completion === 'KO - ELEM LIST IS EMPTY') return 0;
			if (body.completion !== 'OK') return null;
			return body.parameters.elements[0].element;
		}
		
exports.run = async function(client, message, args) {
    
		if (sessions.has(message.channel.id)) return message.reply('Only one game may be occuring per channel.');
		try {
			let ans = null;
			sessions.set(message.channel.id, { progression: 0 });
			while (sessions.get(message.channel.id).progression < 95) {
				const data = ans === null ? await createSession(message.channel) : await progress(message.channel, ans);
				if (!data || !data.answers || sessions.get(message.channel.id).step >= 80) break;
				const answers = data.answers.map(answer => answer.answer.toLowerCase());

				let progressoTexto = ""
				let progresso = Math.round(Number.parseInt(data.progression, 10))
				for(i = 0; i <= 100; i++){
					if(progresso == 0) progressoTexto = progressoTexto + "__________"
					else if(progresso >= i) progressoTexto = progressoTexto + "█"
					else progressoTexto = progressoTexto + "_"
				}
				
				answers.push('end');
				const aaa = new Discord.RichEmbed()
					.setColor(0xF78B26)
					.setTitle(`Akinator`)
					.setDescription(stripIndents`**${++data.step}.** ${data.question}\n\n[${progressoTexto}] - ${progresso}%\n\n${data.answers.map(answer => answer.answer).join('\n')}`)
					//.setThumbnail(guess.absolute_picture_path || null)
				await message.reply(aaa);

				const filter = res => res.author.id === message.author.id && answers.includes(res.content.toLowerCase());
				const msgs = await message.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
				if (!msgs.size) {
					await message.reply('Sorry, time is up!');
					break;
				}
				if (msgs.first().content.toLowerCase() === 'end') break;
				ans = answers.indexOf(msgs.first().content.toLowerCase());
			}
			const guess = await Guess(message.channel);
			if (!guess) {
				sessions.delete(message.channel.id);
				if (guess === 0) return message.reply('I don\'t have any guesses. Bravo.');
				return message.reply('Hmm... I seem to be having a bit of trouble. Check back soon!');
			}
			const embed = new Discord.RichEmbed()
				.setColor(0xF78B26)
				.setTitle(`I'm ${Math.round(guess.proba * 100)}% sure it's...`)
				.setDescription(`${guess.name}${guess.description ? `\n_${guess.description}_` : ''}`)
				.setThumbnail(guess.absolute_picture_path || null);
			await message.reply(embed);
			const verification = await verificar(message.channel, message.author);
			sessions.delete(message.channel.id);
			if (verification === 0) return message.reply('I guess your silence means I have won.');
			if (!verification) return message.reply('Bravo, you have defeated me.');
			return message.reply('Guessed right one more time! I love playing with you!');
		} catch (err) {
			sessions.delete(message.channel.id);
			console.log(err)
			return message.reply(`Oh no, an error occurred: \`${err}\`. Try again later!`);
		}
	
};
exports.configuracao = {
    apenasCriador: true,
    modulo: 'especiais',
    aliases: ['aki'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'akinator',
    descricao: 'Pense em um personagem real ou fictício, tentarei adivinhar quem é.',
    usar: 'akinator',
    exemplos: []
};