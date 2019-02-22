const requerEvento = (event) => require(`../eventos/${event}`)
const constantes = require('../utilitarios/constantes.js')
const extras = require('../utilitarios/extras.js')
module.exports = async client => {
	client.on('ready', () => requerEvento('ready')(client));

	//Mensagem
	client.on('message', requerEvento('message'));
	client.on('messageDelete', requerEvento('messageDelete'));
	client.on('messageUpdate', requerEvento('messageUpdate'));

	//Servidores
    client.on('guildMemberAdd', requerEvento('guildMemberAdd'));
	client.on('guildMemberRemove', requerEvento('guildMemberRemove'));
	//client.on("guildCreate", guild => extras.CriarServidor(guild))
	client.on('guildBanAdd', requerEvento('guildBan'));
	client.on('guildBanRemove', requerEvento('guildBan'));
	client.on('guildUpdate', requerEvento('guildUpdate'));
	client.on('guildMemberUpdate',requerEvento('member'))

	//Cargos
	client.on('roleCreate', requerEvento('role'));
	client.on('roleUpdate', requerEvento('role'));
	client.on('roleDelete', requerEvento('role'));

	//Canais
	client.on('channelCreate', requerEvento('channel'));
	client.on('channelDelete', requerEvento('channel'));
	client.on('channelUpdate', requerEvento('channel'));

	//Extras
	client.on('ajudaComando', requerEvento('ajudaComando'));
	client.on('semPermissao', requerEvento('semPermissao'));
	client.on('embedDescricao', requerEvento('embedDescricao'));
	client.on('oopsEmbed', requerEvento('oopsEmbed'));
	client.on('verificar', requerEvento('verificar'));

	//Erros
	client.on("warn", (err) => {
		console.log(err.message)
	});
	client.on("error", (err) => {
		console.log(err.message)
	});
	client.on("disconnect", (err) => {
		console.log(err.message)
	});
	client.on("reconnect", (err) => {
		console.log(err.message)
	});
	client.on("unhandledRejection", (err) => {
		console.log(err.message)
	});
	client.on("UnhandledPromiseRejectionWarning", (err) => {
		if(err.code == 50013) return
		console.log(err.message)
	});
	client.on('raw', async event => {
		if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
		requerEvento('reaction')(event,client)
	}})

	client.on('unhandledRejection', err => {
		if (err.code === 'ENOTFOUND' || err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
			client.log('ERROR', `Bot connection error: ${err.code}`);
		} else {
			client.log('ERROR', `Uncaught Promise Error: \n${err}`);
		}
	});

	/*
if(args[0] == "3"){
	client.on('raw', async event => {
		if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
			
			let channel = await client.channels.get(event.d.channel_id);
			let message = channel.fetchMessage(event.d.message_id).then(async msg=> {
			let user = await msg.guild.members.get(event.d.user_id);
			console.log(channel + event.d.message_id + user)})}})
};*/
};