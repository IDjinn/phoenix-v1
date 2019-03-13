//Slowmode
const falouRecentemente = new Map();
const jaAvisado = new Set()
const similar = require('string-similarity')
const Discord = require('discord.js')
function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
const extras = require('../utilitarios/extras.js')
//Caso não for um comando reconhecido, achar um mais próximo (erros gramaticais)
async function comandosSimilares(comando,client) {
	let comandos  = []
	let aliases = []
	for (let key of client.aliases.keys()) {
		await aliases.push(key)
	}
	await client.comandos.forEach(c => {
		if(similar.compareTwoStrings(c.nome.toString(), comando.toString()) > 0.65) comandos.push(c.nome.toString())
	}); 
	await aliases.forEach(a => {
		if(similar.compareTwoStrings(a.toString(), comando.toString()) > 0.65) comandos.push(a.toString())
	})
	return comandos
}

module.exports = async (message) => {
  let client = message.client
	let servidor = message.guild.dados || client.servidores[message.guild.id] || await extras.Servidor(message.guild.id,client)
	let prefixo = servidor.prefixo

	if(message.guild) if(message.content.startsWith(message.guild.me.toString()) && message.content.length <= 22) return client.emit("oopsEmbed",message,`Olá, meu nome é Phoenix, meu prefixo nesse servidor é \`${servidor.prefixo}\` e para ver todos os meus comandos use \`${servidor.prefixo}ajuda\`!`,false)
    
	let args = message.content.split(' ');
	let command = args.shift().slice(prefixo.length);
	if(command) command = command.toLowerCase()

	if (!message.content.startsWith(prefixo) && !message.content.startsWith(message.guild.me.toString())) return;

    
	try {
		let cmd = client.comandos.get(command) || client.comandos.get(client.aliases.get(command))
		if(!cmd){
			let mensagem = await comandosSimilares(command,client)
			if(mensagem.length > 0){
			mensagem = mensagem.join('\n•')
			const similares = new Discord.RichEmbed()
			.setTitle(`Oops!`)   
			.setColor('#ffffff')
			.setDescription(`Não encontrei esse comando, talvez você queria ter dito..\`\`\`${mensagem}\`\`\``)
			return message.reply(similares)
			}
			message.react('538036569060278273').catch()
		 }
		else {
			if(servidor.canais.comandos != "false"){
				if(message.channel.id != servidor.canais.comandos && message.member.permissoesServidor == 0){
					await message.delete().catch()
					return client.emit("oopsEmbed",message,`Você só pode usar comandos no canal <#${servidor.canais.comandos}>!`,true)
				}
			}
			if(client.nbanidos.has(message.author.id) && !jaAvisado.has(message.author.id)){
				 await message.delete().catch()
				 jaAvisado.add(message.author.id)
				 const embed = new Discord.RichEmbed()
				 .setTitle(`Oops!`)   
				 .setColor('#ffffff')
				 .setDescription("Você foi banido de minhas funcionalidades!")
				 return await message.reply(embed).then(msg => { msg.delete(3000) }).catch(/*ERRO!*/)
			 }
		 

			//Temporizador de Comando
			if (falouRecentemente.has(message.author.id)){
				message.delete().catch()
				if(!jaAvisado.has(message.author.id)){
				let mapIter = falouRecentemente.entries();
				let a = mapIter.next().value
				let faltaAinda = a[1] - Date.now()
				let tempo = faltaAinda
				faltaAinda = faltaAinda / 1000
				if(faltaAinda < 1) faltaAinda = `\` alguns milisegundos\``
				else{ 
					faltaAinda = `\`` + faltaAinda.toFixed(0) +` segundos\``
				}
				jaAvisado.add(message.author.id)

				const embed = new Discord.RichEmbed()
				.setColor('#ffffff')
				.setDescription(`Você deve esperar mais ${faltaAinda} para executar outro comando. Quando esse tempo acabar, reaja com ↩ para executar o comando novamente.`)
				message.reply(embed).then(async m =>{
					await sleep(tempo);
					m.react('↩').catch()
					const filter = (reaction, user) => reaction.emoji.name == '↩' && user.id === message.author.id
					const collector = m.createReactionCollector(filter, { time: 60000 });
					collector.on('collect', async () => {
						await m.delete().catch()
						return client.emit('message',message)
					})
				})
			}
			return
		}
		if(message.author.id != '376460601909706773'){
			falouRecentemente.set(message.author.id,Date.now() + 4000);
			setTimeout(() => {
			  falouRecentemente.delete(message.author.id);
			  jaAvisado.delete(message.author.id);
			}, 4000);
		}

			if(cmd.apenasCriador == true && message.author.id != '376460601909706773'){
				await message.delete().catch()
				return client.emit("oopsEmbed",message,"Apenas o criador tem permissão para executar esse comando!",true)
			}

			if(cmd.permissoesNecessarias){
				if (client.permissao(message,cmd.permissoesNecessarias) == false  && message.author.id != '376460601909706773'){
				await message.delete().catch()
				let lista = " "
				for(let i in cmd.permissoesNecessarias){
					lista = lista + permissoes[cmd.permissoesNecessarias[i]] + ", "
				}
				return client.emit("oopsEmbed",message,`Você precisa de alguma permissão como \`${lista}\` para poder usar esse comando!`,true)
			}
		}

			if(cmd.permissoesBot){
				if (client.permissaoBot(message,cmd.permissoesBot) == false/* && message.author.id != '376460601909706773'*/){
				 await message.delete().catch()
				let lista = " "
				for(let i in cmd.permissoesBot){
					lista = lista + permissoes[cmd.permissoesBot[i]] + ", "
				}
				return client.emit("oopsEmbed",message,`Eu preciso ter permissão de \`${lista}\` para poder executar esse comando!`,true)
			}
		}

			let ads = Math.floor((Math.random()* 100)+1)
			if(ads == 1) message.reply(`Ajude a espalhar minhas funcionalidades para outros servidores! envie para seus amigos meu link usando ${prefixo}convite, para que possam me adicionar!`)
			cmd.run(client, message, args);
			client.comandosExe = client.comandosExe + 1
			//message.delete().catch()
		}
	}
		catch (err) {
		console.log(err)
		message.delete().catch()
		return client.emit("oopsEmbed",message,'Ocorreu algum erro ao executar esse comando!',true)
    }
}