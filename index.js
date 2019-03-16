const { Collection, Client } = require('discord.js');
const fs = require('fs');
const moment = require('moment')
const settings = require('./settings.js');
const CommandManager = require('./modulos/comandos.js')
const BanManager = require('./modulos/banidos.js')
const AntiRaidManager = require('./modulos/antiraid.js')
const AutoModManager = require('./modulos/automod.js')
const DatabaseManager = require('./estruturas/mongoose.js')

new DatabaseManager(settings.mongoose)

class Phoenix extends Client{
    constructor(token){
        super();
        this.disableEveryone = true,
        this.messageCacheMaxSize = 45,
        this.fetchAllMembers = true,
        this.start(token);
    }
    start(token) { this.login(token); }
}

const client = new Phoenix(settings.token);

new CommandManager();
new BanManager(client);
new AntiRaidManager(client);
new AutoModManager(client);

require('./collections.js')(client);
require('./eventos/eventLoader')(client);
const extras = require('./utilitarios/extras.js')
const Silenciados = require('./database/silenciados.js')
const Punicoes = require('./database/punicoes.js')
const Timers = require('./database/timers.js')
const Temporizador = require('./modulos/timers.js')
const Banimentos = require('./database/banimentos.js')
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
}

exports.cache = async () => Cache()

exports.atualizarComandos = async () => RegistrarComandos()

async function RegistrarComandos(){
    //nada aqui
}

const log = (msg) => {
    console.log(`[${moment().format('HH:mm:ss')}] ${msg}`);
};


client.login(settings.token);