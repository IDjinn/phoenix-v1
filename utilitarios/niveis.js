const Discord = require('discord.js')
module.exports = {
    async VerificarNivel(id){
        return
    },
    async VerificarXP(id){
        return
    },
    async DefinirXP(id,valor){
        Usuarios.findOneAndUpdate({id: id}, {$set: {xp: valor}}, {upsert:false},async function(err, sucesso){
        if (err) retur
        client.usuarios[id].xp = valor
        return
    });
        return
    },
    //----LOCAL//
    async AdicionarXPLocal(message,valor){
        Locais.findOneAndUpdate({id: message.author.id, servidor: message.guild.id}, {$inc: {xp: valor}}, {upsert:false},async function(err, sucesso){
        if (err) return
        message.member.local.xp += valor
        niveis.PassouDeNivelLocal(message)
        return
    });
        return
    },
    async PassouDeNivelLocal(message){
        let u = message.member.local
            let xp = u.xp
            let requer = getXp(u.level + 1)
            if(xp > requer) {
            message.guild.channels.get(message.guild.dados.canais.niveis != 'false' ? message.guild.dados.canais.niveis : message.channel.id).send(new Discord.RichEmbed().setDescription(`Parabéns ${message.author}, você acaba de passar para o nível ${u.level + 1}!`).setColor("#ffffff"))
                let moedas = u.level * constMoedas
                //niveis.PassarNivel(message,moedas)
                niveis.PassarNivelLocal(message,moedas)
                return true
        }
    return false
    },
    async PassarNivelLocal(message,valorMoedas){
        let client = message.client
        Locais.findOneAndUpdate({id: message.author.id, servidor: message.guild.id}, {$inc: {level: 1}}, {upsert:false},async function(err, sucesso){
        if (err) return
        message.member.local.level += 1
        moedas.AdicionarMoedasLocal(message,valorMoedas)
    })
        return
    },
    //----FIM LOCAL//
    async AdicionarXP(message,valor){
        let client = message.client
        Usuarios.findOneAndUpdate({id: message.author.id}, {$inc: {xp: valor}}, {upsert:false},async function(err, sucesso){
        if (err) return
        if(!message.author.dados && !client.usuarios[message.author.id]) await extras.Usuario(message.author.id,client)
        else if(!message.author.dados && client.usuarios[message.author.id]) message.author.dados = client.usuarios[message.author.id].xp 
        else await extras.Usuario(message.author.id,client)
        client.usuarios[message.author.id].xp += valor
        message.author.dados.xp += valor
        niveis.PassouDeNivel(message)
        return
    });
        return
    },
    async PassarNivel(message,valorMoedas){
        let client = message.client
        Usuarios.findOneAndUpdate({id: message.author.id}, {$inc: {level: 1}}, {upsert:false},async function(err, sucesso){
        if (err) return
        if (sucesso)
        client.usuarios[message.author.id].level += 1
        message.author.dados.level += 1
        moedas.AdicionarMoedas(message,valorMoedas)
        return
    });
        return
    },
    async DefinirNivel(id,valor){
        Usuarios.findOneAndUpdate({id: id}, {$set: {level: valor}}, {upsert:false},async function(err, sucesso){
        if (err) retur
        client.usuarios[id].level = valor
        return
    });
        return
    },
    async RequerAinda(id){
        Usuarios.findOne({id: id}, {upsert:false},async function(err, sucesso){
        if (err) return
        if(sucesso){
        let xp = sucesso.xp
        let requerXp = getXp(sucesso.level + 1)
        return requerXp - xp
        }
    }) 
        return
    },
    async PassouDeNivel(message,client){
        Usuarios.findOne({id: message.author.id}, {upsert:false},async function(err, sucesso){
        if (err) return
        if(sucesso){
        let xp = sucesso.xp
        let requerXp = getXp(sucesso.level + 1)
        if(xp > requerXp) {
            let moedas = sucesso.level * constMoedas
            niveis.PassarNivel(message,moedas,client)
            return true
        }
        return false
        }
    }) 
    return false
    }
}
const constMoedas = 15
const getXp = (nivel) => Math.floor(((nivel / 0.2) * (nivel / 0.3)) * Math.PI)

const niveis = require('./niveis.js')
const moedas = require('./moedas.js')
const Usuarios = require('../database/usuario.js')
const Locais = require('../database/local.js')
const extras = require('./extras.js')
/*
    let xp = usuario.xp
    let nivel = usuario.level + 1
    let requer = nivel * constXp
    let porcentagem = (xp / requer) * 100
    */