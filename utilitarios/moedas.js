module.exports = {
    async VerificarMoedas(id){
        return usuario.moedas
    },
    async EditarMoedas(id,valor){
        return
    },
    async AdicionarMoedas(message,valor){
        let client = message.client
        Usuarios.findOneAndUpdate({id: message.author.id}, {$inc: {moedas: valor}}, {upsert:false}, function(err, sucesso){
        if (err) return
        if(sucesso) client.usuarios[message.author.id].moedas += valor
        message.author.dados.moedas += valor
        return message.author.dados.moedas
        })
    },
    //----LOCAL//
    async AdicionarMoedasLocal(message,valor){
        Local.findOneAndUpdate({id: message.author.id, servidor: message.guild.id}, {$inc: {moedas: valor}}, {upsert:false}, function(err, sucesso){
        if (err) return
        if(sucesso) 
        message.member.local.moedas += valor
        return
        })
    },
    //----FIM--LOCAL//
    async RemoverMoedas(message,valor){
        let client = message.client ? message.client : client
        Local.findOneAndUpdate({id: message.author.id, servidor: message.guild.id}, {$inc: {moedas: -valor}}, {upsert:false}, function(err, sucesso){
        if (err) return
        if(sucesso) 
        message.member.local.moedas -= valor
        return
        })
    },
    async DefinirMoedas(id,valor){
        return
    },
    async Rank(limite){
        return tabela
    }
}
const Usuarios = require('../database/usuario.js')
const Local = require('../database/local.js')