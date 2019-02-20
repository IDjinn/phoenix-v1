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

await util.Sleep(2);
/*
client.appInfo = await client.fetchApplication().then(application => console.log(`Obtained application with name: ${application.name}`))
.catch(console.error)
setInterval(async () => {
	client.appInfo = await client.fetchApplication().then(application => console.log(`Obtained application with name: ${application.name}`))
    .catch(console.error)
}, 60000);*/


var cMembers = client.users.filter(u => u.id !== '1').size; // Get's number of members cached. (Filters out Clyde)
var gCount = client.guilds.size;
// Both `wait` and `client.log` are in `./modules/functions`.
client.log('EVENT', `Logged into '${client.user.tag}' (${client.user.id}). Ready to serve ${cMembers} users in ${gCount} guilds. Bot Version: ${client.version}`);

// Ensure that any guild added while the bot was offline gets a default configuration.
var g = [];
client.guilds.forEach(guild => g.push(guild.id));

client.guilds.forEach(g => {
    if(g.me.hasPermission('MANAGE_CHANNELS')){
    g.fetchInvites().then(convites => {
    client.convites[g.id] = convites
    }).catch()
}})

for (let i in g) {
    await Servidor.findOne({
        id: g[i]
    },(erro, servidor) => {
    if(erro) return console.log(erro)
    if(!servidor) return extras.CriarServidor(g[i],client)
    else {
        const s = {
        logs: servidor.canais.logs,
        punicao: servidor.canais.punicao,
        entrada: servidor.canais.entrada,
        saida: servidor.canais.saida,
        welcome: servidor.welcome,
        leave: servidor.leave,
        sugestao: servidor.canais.sugestao,
        anunciar: servidor.canais.anunciar,
		contadormembro: servidor.canais.contadormembro,
		contadorbot: servidor.canais.contadorbot,
		counterb: servidor.counterb,
		counterm: servidor.counterm,
        comandos: servidor.canais.comandos,
        niveis: servidor.canais.niveis,
        verificar: servidor.canais.verificar,
        adm: servidor.cargos.adm,
        mod: servidor.cargos.mod,
        inicial: servidor.cargos.inicial,
        verificado: servidor.cargos.verificado,
        prefixo: servidor.prefixo,
		autowarn: servidor.automod.autowarn,
		antiraid: servidor.automod.antiraid,
		antispamemoji: servidor.automod.antispamemoji,
        antispaminvite: servidor.automod.antispaminvite,
        antispammention: servidor.automod.antispammention,
		blacklink: servidor.automod.blacklink,
		whitelink: servidor.automod.whitelink,
		antispamcaps: servidor.automod.antispamcaps,
		lockserver: servidor.automod.lockserver,
		serverislocked: servidor.automod.serverislocked,
		textdup: servidor.automod.textdup,
        singular: servidor.eco.singular,
        plural: servidor.eco.plural,
        valor: servidor.eco.valor
    }
        client.settings.set(g[i], s);
    }})
}

//Registrar comandos para o >ajuda
index.atualizarComandos()
.then(async () => {console.log("[INFO] - Comandos PRONTOS!")})


require('../modulos/dashboard')(client);
}
