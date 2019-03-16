const index = require('../index.js')
const util = require('../utilitarios/util.js')
const Servidor = require('../database/servidor')
const extras = require('../utilitarios/extras.js')
const Roles = require('../database/temprole.js')
module.exports = async client => {
	let jogando = [`Estou em ${client.guilds.size} servidores`,'>Ajuda - Saiba todos os meus comandos!','Me adicione usando >Convite!']
	await index.cache()
client.setInterval(async () => {
		client.user.setPresence({game: { name: jogando[(Math.floor((Math.random()*jogando.length)))] }})
    
        for(let i in client.tempRole){
            let temprole = await client.tempRole[i]
            if(temprole.expirado == 'true') continue
            let guild = client.guilds.get(temprole.servidor)
            let role = guild.roles.get(temprole.roleid)
            let usuario = guild.members.get(temprole.userid)

            if(temprole.expiraem < Date.now()){
                await usuario.removeRole(role).catch(e => console.log(e))
                client.tempRole[i].expirado = 'true'
                await Roles.findByIdAndUpdate(i, {expirado: 'true'}, {upsert: false});
            }
            else if(!usuario.roles.has(role.id)){
                client.tempRole[i].expirado = 'true'
                await Roles.findByIdAndUpdate(i, {expirado: 'true'}, {upsert: false});
            }
        };
/*
        for (let i in client.reactionRole){
        let reaction = client.reactionRole[i]
            let guild = await client.guilds.get(reaction.servidor)
            let canal = await guild.channels.get(reaction.canal)
            let mensagem = await canal.fetchMessage(reaction.mensagemid)
              await mensagem.reactions.forEach(r=> {
                r.users.forEach(async u => {
                    let membro = await guild.members.get(u.id)
                    if(!reaction.roleid || !membro) return
                    await membro.addRole(reaction.roleid).catch()
                })
              })
        }
        */

		for(let i in client.silenciados){
			let tempo = client.silenciados[i].tempo;

				let guildId = client.silenciados[i].servidor;
				let guild = client.guilds.get(guildId)
				let membro = guild.members.get(i)
				let role = guild.roles.get(client.silenciados[i].role)
				if(!role) continue;
				membro.removeRole(role).then(()=>{
				if(Date.now() > tempo){
				delete client.silenciados[i]
				//Silenciado.findOneAndDelete({id:i})
			}
			else{
				membro.addRole(role).catch()
			}
			}).catch()
		}
}, 10000);

console.log(`Discord bot online\nTag:${client.user.tag}\nID:${client.user.id}\nServidores:${client.guilds.size}\nCanais:${client.channels.size}\nUsuários:${client.users.size}`);
}
