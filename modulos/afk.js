module.exports = async (message) => {
    let client = message.client
	if(client.afk[message.author.id]) {
		delete client.afk[message.author.id]
		await Usuarios.findOneAndUpdate({id: message.author.id},{motivoAfk: 'false'}, {upsert: false})
	}

	if(message.mentions.size == 1){
	for(let i in message.mentions){
		if(client.afk[message.mentions[i].id]) return client.emit("embedDescricao",message,"O usuário " + client.afk[message.mentions[i].id].usuario.username + " está afk!\nMotivo: `" + client.afk[message.mentions[i].id].motivo + "`!",false)
		}
	}
	else if(message.mentions.size > 1){
		let motivos = '$'
		let usuarios = '$'
	for(let i in message.mentions){
		if(!client.afk[message.mentions[i].id]) continue
		motivos = motivos + ', ' + client.afk[message.mentions[i].id].motivo
		usuarios = usuarios + + ', ' + client.afk[message.mentions[i].id].usuario.username
		}
		return client.emit("embedDescricao",message,"Os usuários " +usuarios.replace(/$,/,'') + " estão afk!\nMotivo: `" + motivos.replace(/$,/,'') + "` respectivamente!",false)
	}
}
const Usuarios = require('../database/usuario')