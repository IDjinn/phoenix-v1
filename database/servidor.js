var mongoose = require('mongoose');
var Servidor = mongoose.Schema({
    id: String,
    canais:{
        logs: String,
        punicao: String,
        entrada: String,
        saida: String,
        sugestao: String,
        anunciar: String,
        contadormembro: String,
        contadorbot: String,
        comandos: String,
        niveis: String,
        verificar: String
    },
    cargos:{
        adm: String,
        mod: String,
        inicial: String,
        verificado: String
    },
    automod:{
        autowarn: Boolean,
        antiraid: Boolean,
        antispamemoji: Boolean,
        antispaminvite: Boolean,
        blacklink: String,
        whitelink: String,
        antispamcaps: Number,
        lockserver: Boolean,
        serverislocked: Boolean,
        textdup: Number,
        antispammention: Number,
        globalban: Boolean
    },
    eco:{
        singular: String,
        plural: String,
        valor: String,
    },
    counterm: String,
    counterb: String,
    welcome: String,
    leave: String,
    prefixo: String,
    vip: String
});
module.exports = mongoose.model('Servidores', Servidor);