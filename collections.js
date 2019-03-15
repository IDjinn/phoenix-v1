const { Collection } = require('discord.js')
module.exports = client => {
    client.canalSugestao = new Set()
    client.tempRole = new Collection()
    client.reactionRole = new Collection()
    client.entradas = new Collection()
    client.comandosExe = 0
    client.modPerms = ['KICK_MEMBERS','BAN_MEMBERS','MOVE_MEMBERS','MUTE_MEMBERS','MENTION_EVERYONE']
    client.admPerms = ['MANAGE_GUILD','MANAGE_CHANNELS','MANAGE_NICKNAMES','MANAGE_ROLES','MANAGE_WEBHOOKS','MANAGE_EMOJIS','ADMINISTRATOR']
    client.comandos = new Collection();
    client.configuracoes = new Collection();
    client.afk = new Collection();
    client.settings = new Collection()
    client.userRaider = new Collection()
    client.playList = new Collection()
    client.ticketsAbertos = new Collection();
    client.servidores = new Collection();
    client.nbanidos = new Set()
    client.sbanidos = new Set()
    client.gbanidos = new Set()
    client.local = new Collection()
    client.usuarios = new Collection();
    client.aliases = new Collection();
    client.silenciados = new Collection()
    client.punicoes = new Collection()
    client.convites = new Collection()
    client.timers = new Collection()
}