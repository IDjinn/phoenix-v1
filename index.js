const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment')
const mongoose = require('mongoose')
const settings = require('./settings.json');

mongoose.connect(`mongodb://${settings.mongoose.usuario}:${settings.mongoose.senha}@${settings.mongoose.link}`,{ useNewUrlParser: true,
reconnectTries: Number.MAX_VALUE, 
reconnectInterval: 1000,
keepAlive: 1, 
connectTimeoutMS: 30000, }).then(c => {
    console.log('Concectado à Database!')
}).catch(e => {
    console.log(`Ocorreu um erro ao contectar à database: ${e.message}`)
})

const client = new Discord.Client({
    disableEveryone: true,
    messageCacheMaxSize: 45,
    fetchAllMembers: true
});

client.canalSugestao = new Set()

client.tempRole = new Discord.Collection()

client.reactionRole = new Discord.Collection()

client.entradas = new Discord.Collection()

client.comandosExe = 0

client.modPerms = ['KICK_MEMBERS','BAN_MEMBERS','MOVE_MEMBERS','MUTE_MEMBERS','MENTION_EVERYONE']

client.admPerms = ['MANAGE_GUILD','MANAGE_CHANNELS','MANAGE_NICKNAMES','MANAGE_ROLES','MANAGE_WEBHOOKS','MANAGE_EMOJIS','ADMINISTRATOR']

client.comandos = new Discord.Collection();

client.configuracoes = new Discord.Collection();

client.afk = new Discord.Collection();

client.settings = new Discord.Collection()

client.userRaider = new Discord.Collection()

client.playList = new Discord.Collection()

client.ticketsAbertos = new Discord.Collection();

client.servidores = new Discord.Collection();

client.nbanidos = new Set()

client.sbanidos = new Set()

client.gbanidos = new Set()

client.local = new Discord.Collection()

client.usuarios = new Discord.Collection();

client.aliases = new Discord.Collection();

require('./eventos/eventLoader')(client);
const extras = require('./utilitarios/extras.js')

//Comandos
client.Diversao = new Discord.Collection();
client.Moderacao = new Discord.Collection();
client.Administracao = new Discord.Collection();
client.Utilitarios = new Discord.Collection();
client.Jogos = new Discord.Collection();
client.Imagens = new Discord.Collection();
client.Economia = new Discord.Collection();
client.Especiais = new Discord.Collection();
client.Outros = new Discord.Collection();
//

client.silenciados = new Discord.Collection()
client.punicoes = new Discord.Collection()
client.convites = new Discord.Collection()
client.timers = new Discord.Collection()

const Silenciados = require('./database/silenciados.js')
const Punicoes = require('./database/punicoes.js')
const Timers = require('./database/timers.js')
const Temporizador = require('./modulos/timers.js')
const Banimentos = require('./database/banimentos.js')
require('./modulos/functions.js')(client);
//require('./modulos/music.js')(client);
let lTotal = 0


async function Cache(){
    await client.users.forEach(async u =>{
        await extras.Usuario(u.id,client)
    })
    await client.guilds.forEach(async s =>{
        await extras.Servidor(s.id,client)
        await extras.TempRoles(s.id,client)
        await extras.ReactionRoles(s.id,client)
        await s.members.forEach(async u =>{
            lTotal += 1
            await extras.Local(u.id,s.id,client)
        })
    })
    console.log(`Carregando ${client.users.size} usuários!`)
    console.log(`Carregando ${client.guilds.size} servidores!`)
    console.log(`Carregando ${lTotal} Locais!`)

    Silenciados.find({}, function(err, usuarios) {
    console.log(`Carregando ${usuarios.length} usuários silenciados!`)
    usuarios.forEach(async function(u) {
        client.silenciados[u.id] = {
          id: u.id,
          servidor: u.guild,
          tempo: u.tempo,
          motivo: u.motivo,
          staff: u.staff,
          bot: u.bot,
          expirado: u.expirado,
          removidoPor: u.removidoPor
        }
        let s = {
            id: u.id,
            servidor: u.guild,
            tempo: u.tempo,
            motivo: u.motivo,
            staff: u.staff,
            bot: u.bot,
            expirado: u.expirado,
            removidoPor: u.removidoPor
        }
        let g = await client.guilds.get(u.guild)
        if(!g.silenciados) g.silenciados = new Discord.Collection()
        g.silenciados[u.id] = s
      });  
    });

    Punicoes.find({}, function(err, punicoes) {
        console.log(`Carregando ${punicoes.length} punições!`)
        punicoes.forEach(async function(p) {
            client.punicoes[p._id] = {
              servidor: p.servidor,
              id: p.id,
              tempo: p.tempo,
              motivo: p.motivo,
              staff: p.staff,
              tipo: p.tipo,
              bot: p.bot,
              removidoPor: p.removidoPor
            }
            let punicao = {
                servidor: p.servidor,
                id: p.id,
                tempo: p.tempo,
                motivo: p.motivo,
                staff: p.staff,
                tipo: p.tipo,
                bot: p.bot,
                removidoPor: p.removidoPor
            }
            let g = await client.guilds.get(punicao.servidor)
            if(!g.punicoes) g.punicoes = []
            g.punicoes.push(punicao)
            let membro = await g.members.get(p.id)
            if(membro){
            if(!membro.punicoes) membro.punicoes = []
            membro.punicoes.push({ 
                servidor: p.servidor,
                id: p.id,
                tempo: p.tempo,
                motivo: p.motivo,
                staff: p.staff,
                tipo: p.tipo,
                bot: p.bot,
                removidoPor: p.removidoPor
             })}
        });  
    });

    Banimentos.find({tipo: 1}, function(err, usuarios) {
    console.log(`Carregando ${usuarios.length} usuários banidos do bot!`)
    usuarios.forEach(function(u) {
        client.nbanidos.add(u.id)
      });  
    });

    Banimentos.find({tipo: 2}, function(err, usuarios) {
    console.log(`Carregando ${usuarios.length} usuários globalmente banidos do bot!`)
    usuarios.forEach(function(u) {
        client.nbanidos.add(u.id)
      });  
    });

    Banimentos.find({tipo: 3}, function(err, servidores) {
    console.log(`Carregando ${servidores.length} servidores banidos do bot!`)
    servidores.forEach(function(s) {
        client.nbanidos.add(s.id)
      });  
    });
    Timers.find({}, function(err, timers) {
        console.log(`Carregando ${timers.length} timers!`)
        timers.forEach(function(t) {
            if(t.ativo && t.quantidaderepetir > 0 && t.validade > Date.now()){
            client.timers[t.servidor] = {
                client: client,
                servidor: t.servidor,
                criado: t.criado,
                intervalo: t.intervalo,
                mensagem: t.mensagem,
                usuario: t.usuario,
                comando: t.comando,
                acao: t.acao,
                ativo: t.ativo,
                validade: t.validade,
                canal: t.canal,
                quantidaderepetir: t.quantidaderepetir
            }
        let timer = new Temporizador(client.timers[t.servidor])
        }
        });  
    });
}


exports.cache = async () => Cache()

exports.atualizarComandos = async () => RegistrarComandos()

async function RegistrarComandos(){
    //nada aqui
}

const log = (msg) => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${msg}`);
};
const path = require('path')
let modulos = fs.readdirSync('./comandos/').filter(file => fs.statSync(path.join('./comandos/', file)).isDirectory());
let totalCmd = 0
//Carregar arquivos de comandos
for(let modulo of modulos){
    fs.readdir(`./comandos/${modulo}/`, (err, arquivos) => {
    if (err) console.error(err);
        arquivos.forEach(cmd => {
            totalCmd = totalCmd + 1
            let comando = require(`./comandos/${modulo}/${cmd}`);
            log(`Carregando comando: "${comando.nome}"...`);
            client.comandos.set(comando.nome, comando);
            comando.aliases.forEach(alias => {
            client.aliases.set(alias, comando.nome)
        });
    });
})}


//Verificar permissões do usuário
client.permissao = function(msg,perms) {
    let permitido = false
    if(msg.author.id == '376460601909706773') return permitido = true
    if(perms.length == 0) return permitido = true

    if(perms.includes('ADM')) {
        let p = checarPermissoesServidor(msg)
        if(p == 2) return permitido = true
        else permitido = false
    }
    else if(perms.includes('MOD')) {
        let p = checarPermissoesServidor(msg)
        if(p > 1) return permitido = true
        else permitido = false
    }

    for(let i in perms){
    if (!msg.member.hasPermission(perms[i])) permitido = false
    else return permitido = true
    }

return permitido;
}

//Verificar permissões de Moderador e Administrador
client.checarPermissoesServidor = function (message){
    let nivelPermissao = 0
    if(!message.member) return nivelPermissao
    if(message.author.id == '376460601909706773') nivelPermissao = 10

    for(let i in client.modPerms){
        if(message.member.hasPermission(client.modPerms[i])) nivelPermissao = 1
    }
    for(let i in client.admPerms){
        if(message.member.hasPermission(client.admPerms[i])) nivelPermissao = 2
    }
    return nivelPermissao
}


//Verificar permissões do Bot
client.permissaoBot = function(msg,perms) {
    let permitido = false
    if(perms.length == 0) return permitido = true
    if(msg.author.id == '376460601909706773') return permitido = true
    for(let i in perms){
    if (!msg.guild.me.hasPermission(perms[i])) return permitido = false
    else permitido = true
}
return permitido;
}

client.login(settings.token);