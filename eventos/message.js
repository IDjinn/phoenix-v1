const Discord = require('discord.js');
const util = require('../utilitarios/util.js')
const permissoes = require('../utilitarios/permissoes.json')
const extras = require('../utilitarios/extras.js')

const nomeRegex = /[0-9A-Za-z!@#$%&*()_\-+={[}\]|\:;"'<,>.?\/\\~`]+[0-9A-Za-z!@#$%&*()_\-+={[}\]|\:;"'<,>.?\/\\~`]*/gim

//Módulos
const afk = require('../modulos/afk.js')
const xp = require('../modulos/xp.js')
const automod = require("../modulos/automod.js")
const antiRaider = require('../modulos/antiraid.js')
const bans = require("../modulos/bans.js")
const comandos = require('../modulos/comandos.js')

/* VERIFICAR NOME
	let b = message.content.match(nomeRegex) || []
	let a = message.content.replace(nomeRegex, '')

	console.log(a.length / (b.length + a.length) * 100)
	*/


module.exports = async message => {
	if (message.author.bot || message.channel.type != 'text') return;

	const client = message.client;

	//Servidor
    let servidor = message.guild.dados || client.servidores[message.guild.id] || await extras.Servidor(message.guild.id,client)
	
	//Moderação
	bans(client,message)
	await automod(client,message)

	//Definir usuário
	let usuario = message.author.dados || client.usuarios[message.guild.id] || await extras.Usuario(message.author.id,client)
	let membro = message.member.local || await extras.Local(message.author.id, message.guild.id, client)

	//Sugestão
	if(client.canalSugestao.has(message.channel.id)){
		await message.react('538036543080890368').catch()
		await message.react('538036569060278273').catch()
		await message.react('❓').catch()
	}		

	//Comandos
	comandos(message)

	//AFK
	afk(message)

	//XP
	xp(message)

	//Anti-Raider
	antiRaider(client, message, servidor)

};
