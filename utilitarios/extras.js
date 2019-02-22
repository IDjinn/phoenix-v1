const Discord = require('discord.js');
const Servidor = require('../database/servidor.js')
const Usuarios = require('../database/usuario')
const Local = require('../database/local.js')
const TempRole = require('../database/temprole')
const ReactionsRole = require('../database/reaction')
module.exports = {
    async TempRoles(guildID,client){
        await TempRole.find({
            servidor: guildID
        },async (erro, roles) => {
        if(erro) return console.log(erro)
        if(!roles) return 
        else {
            roles.forEach(async r =>{
                let role = {
                    servidor: r.servidor,
                    roleid: r.roleid,
                    userid: r.userid,
                    criadoem: r.criadoem,
                    expiraem: r.expiraem,
                    expirado: r.expirado
                }
                let g = await client.guilds.get(guildID)
                if(!g.tempRole) g.tempRole = new Discord.Collection()
                g.tempRole[r._id] = role

                if(r.expirado == 'false'){
                client.tempRole[r._id] = {
                    servidor: r.servidor,
                    roleid: r.roleid,
                    userid: r.userid,
                    criadoem: r.criadoem,
                    expiraem: r.expiraem,
                    expirado: r.expirado
                }
            }})
            }
        })
        return 
    },
    async ReactionRoles(guildID,client){
        await ReactionsRole.find({
            servidor: guildID
        },async (erro, roles) => {
        if(erro) return console.log(erro)
        if(!roles) return 
        else {
            roles.forEach(async r =>{
                let rrole = {
                    servidor: r.servidor,
                    emoji: r.emoji,
                    roleid: r.roleid,
                    mensagemid: r.mensagemid,
                    canal: r.canal,
                    apenasUma: r.apenasUma,
                    estaMensagem: r.estaMensagem
                }
                let g = await client.guilds.get(guildID)
                if(!g.reactionRole) g.reactionRole = new Discord.Collection()
                g.reactionRole[`${r.mensagemid}-${r.emoji}`] = rrole

                client.reactionRole[`${r.mensagemid}-${r.emoji}`] = {
                    servidor: r.servidor,
                    emoji: r.emoji,
                    roleid: r.roleid,
                    mensagemid: r.mensagemid,
                    canal: r.canal,
                    apenasUma: r.apenasUma,
                    estaMensagem: r.estaMensagem
                }
            })
        }
        })
        return 
    },
    async Local(userID,guildID,client){
        if(userID == '1' || guildID == '1') return//Não cacheados, retorna!
        if(!client.servidores[guildID]) await this.Servidor(guildID,client)
        let g = await client.guilds.get(guildID)
        let membro = await g.members.get(userID)
        if(membro.local) return
        else{
            await Local.findOne({
                id: userID,
                servidor: guildID
            },async (erro, local) =>  {
                if(erro) return console.log(erro)
                if(!local) return this.CriarLocal(userID,guildID,client)
                else {
                    let l = {
                        id: userID,
                        servidor: guildID,
                        xp: local.xp,
                        level: local.level,
                        moedas: local.moedas
                    }
                    membro.local = l
                }
            })
        return
        }
    },
    async CriarLocal(userID,guildID,client){
        if(userID == '1' || guildID == '1') return
        let g = await client.guilds.get(guildID)
        let membro = await g.members.get(userID)
        let local = {
            id: userID,
            servidor: guildID,
            xp: 0,
            moedas: 0,
            level: 0
        }
        const l = new Local({
            id: userID,
            servidor: guildID,
            xp: 0,
            moedas: 0,
            level: 0})
        l.save()
        membro.local = local
        return
    },
    async Servidor(id,client){
        if(id == "1") return //Não registrar não cacheados.
        let g = await client.guilds.get(id)
        if(g.dados && !client.servidores[id]) client.servidores[id] = g.dados//Caso tenha salvo já no guild, ele vai usar
        else if(!g.dados && client.servidores[id]) g.dados = client.servidores[id]//Caso tenha salvo já no client, ele vai usar
        else{//Se não tem nem no guild nem no client tem que buscar na database
            await Servidor.findOne({
                id: id
            },async (erro, servidor) => {
        if(erro) return console.log(erro)
        if(!servidor) return //this.CriarServidor(id,client)
        else {
            client.servidores[id] = {
                id: id,
                canais:{
                    entrada: !isNaN(servidor.canais.entrada) ? servidor.canais.entrada : 'false',
                    saida: !isNaN(servidor.canais.saida) ? servidor.canais.saida : 'false',
                    comandos: !isNaN(servidor.canais.comandos) ? servidor.canais.comandos : 'false',
                    anunciar: !isNaN(servidor.canais.anunciar) ? servidor.canais.anunciar : 'false',
                    logs: !isNaN(servidor.canais.logs) ? servidor.canais.logs : 'false',
                    niveis: !isNaN(servidor.canais.niveis) ? servidor.canais.niveis : 'false',
                    verificar: !isNaN(servidor.canais.verificar) ? servidor.canais.verificar : 'false',
                    punicao: !isNaN(servidor.canais.punicao) ? servidor.canais.punicao : 'false',
                    contadorbot: !isNaN(servidor.canais.contadorbot) ? servidor.canais.contadorbot : 'false',
                    contadormembro: !isNaN(servidor.canais.contadormembro) ? servidor.canais.contadormembro : 'false',
                    sugestao: !isNaN(servidor.canais.sugestao) ? servidor.canais.sugestao : 'false',
                },
                cargos: {
                    adm: !isNaN(servidor.cargos.adm) ? servidor.cargos.adm : 'false',
                    mod: !isNaN(servidor.cargos.mod) ? servidor.cargos.mod : 'false',
                    inicial: !isNaN(servidor.cargos.inicial) ? servidor.cargos.inicial : 'false',
                    verificado:!isNaN(servidor.cargos.verificado) ? servidor.cargos.verificado : 'false',
                },
                automod: {
                    autowarn: servidor.automod.autowarn,
                    antiraid: servidor.automod.antiraid,
                    antispamemoji: servidor.automod.antispamemoji,
                    antispaminvite: servidor.automod.antispaminvite,
                    antispammention: servidor.automod.antispammention,
                    blacklink: servidor.automod.blacklink != 'false' ? servidor.automod.blacklink.split(',') : 'false',
                    whitelink: servidor.automod.whitelink != 'false' ? servidor.automod.whitelink.split(',') : 'false',
                    antispamcaps: servidor.automod.antispamcaps,
                    lockserver: servidor.automod.lockserver,
                    serverislocked: servidor.automod.serverislocked,
                    textdup: servidor.automod.textdup
                },
                eco:{
                    singular: servidor.eco.singular == undefined ? 'Real' : servidor.eco.singular,
                    plural: servidor.eco.plural == undefined ? 'Reais' : servidor.eco.plural,
                    valor: servidor.eco.valor == undefined ? '1000' : servidor.eco.valor,
                },
                welcome: servidor.welcome,
                leave: servidor.leave,
                vip: servidor.vip,
                counterb: servidor.counterb,
                counterm: servidor.counterm,
                prefixo: servidor.prefixo != undefined ? servidor.prefixo : '>',
                playList: [],
                ultimosMembros: []
                }
                if(client.servidores[id].canais.sugestao != 'false') client.canalSugestao.add(client.servidores[id].canais.sugestao)
                if(client.servidores[id].canais.contadorbot != 'false'){
                    let guild = client.guilds.get(id)
                    let canal = client.channels.get(client.servidores[id].canais.contadorbot)
                    if(canal) if(!canal.name.match(guild.members.filter(m => m.user.bot).size)) {
                        if(client.servidores[id].counterb != 'false') canal.setName(client.servidores[id].counterb.replace(/{bots}/g,guild.members.filter(m => m.user.bot).size))
                        else canal.setName(`${guild.members.filter(m => m.user.bot).size}`)
                    }
                }
                if(client.servidores[id].canais.contadormembro != 'false'){
                    let guild = client.guilds.get(id)
                    let canal = client.channels.get(client.servidores[id].canais.contadormembro)
                    if(canal) if(!canal.name.match(guild.members.filter(m => m.user.bot).size)) {
                        if(client.servidores[id].counterm != 'false') await canal.setName(client.servidores[id].counterm.replace(/{members}/g,guild.members.filter(m => !m.user.bot).size))
                        else canal.setName(`${guild.members.filter(m => !m.user.bot).size}`)
                    }
                }
            }
        })
    }
    g.dados = client.servidores[id]
    return client.servidores[id]
},
    async CriarServidor(id,client){
        if(id == "1") return //Não registrar não cacheados.
        const servidor = new Servidor({
            id: id,
            canais:{
                logs: 'false',
                punicao: 'false',
                canalentrada: 'false',
                canalsaida: 'false',
                entrada: 'false',
                saida: 'false',
                sugestao: 'false',
                anunciar: 'false',
                contador: 'false',
                comandos: 'false',
                niveis: 'false',
                verificar: 'false',
                contadorbot: 'false',
                contadormembro: 'false'
            },
            cargos:{
                adm: 'false',
                mod: 'false',
                inicial: 'false',
                verificado: 'false'
            },
            automod:{
                autowarn: 'false',
                antiraid: 'false',
                antispamemoji: 'false',
                antispaminvite: 'false',
                antispammention: 'false',
                blacklink: 'false',
                whitelink: 'false',
                antispamcaps: 'false',
                lockserver: 'false',
                serverislocked: 'false',
                textdup: 'false'
            },
            eco:{
                singular: 'Real',
                plural: 'Reais',
                valor: '1000',
            },
            counterb: 'false',
            counterm: 'false',
            welcome: 'false',
            leave: 'false',
            prefixo: '>',
            vip: 'false'
        })
        servidor.save().then(r => console.log(`Hihihi! Entrei em mais um servidor! ID: ${id}`)).catch(e => console.log(`Erro ao criar um servidor: ${e}`))
        
        client.servidores[id] = {
            id: id,
            canais:{
                entrada: servidor.canais.entrada,
                saida: servidor.canais.saida,
                comandos: servidor.canais.comandos,
                anunciar: servidor.canais.anunciar,
                logs: servidor.canais.logs,
                niveis: servidor.canais.niveis,
                verificar: servidor.canais.verificar,
                punicao: servidor.canais.punicao,
                contadorbot: servidor.canais.contadorbot,
                contadormembro: servidor.canais.contadormembro,
            },
            cargos: {
                adm: servidor.cargos.adm,
                mod: servidor.cargos.mod,
                inicial: servidor.cargos.inicial,
                verificado: servidor.cargos.verificado
            },
            automod: {
                autowarn: servidor.automod.autowarn,
                antiraid: servidor.automod.antiraid,
                antispamemoji: servidor.automod.antispamemoji,
                antispaminvite: servidor.automod.antispaminvite,
                antispammention: servidor.automod.antispammention,
                blacklink: servidor.automod.blacklink != 'false' ? servidor.automod.blacklink.split(',') : 'false',
                whitelink: servidor.automod.whitelink != 'false' ? servidor.automod.whitelink.split(',') : 'false',
                antispamcaps: servidor.automod.antispamcaps,
                lockserver: servidor.automod.lockserver,
                serverislocked: servidor.automod.serverislocked,
                textdup: servidor.automod.textdup
            },
            eco:{
                singular: servidor.eco.singular,
                plural: servidor.eco.plural,
                valor: servidor.eco.valor
            },
            welcome: servidor.welcome,
            leave: servidor.leave,
            vip: servidor.vip,
            counterb: servidor.counterb,
            counterm: servidor.counterm,
            prefixo: servidor.prefixo,
            playList: [],
            ultimosMembros: []
        }
        let g = await client.guilds.get(id)
        g.dados = client.servidores[id]
        return
    },
    async CriarUsuario(id,client){
        if(id == '1') return 
        const usuario = new Usuarios({
            id: id,
            level: 0,
            xp: 0,
            moedas: 0,
            rep: 0,
            sobremim: 'Nada definido ainda! use >sobremim para colocar uma mensagem aqui.',
            criado: Date.now(),
            nbanido: 'false',
            gbanido: 'false',
            motivoAfk: 'false',
            recompensas: {
                diaria: {
                    tempo: Date.now(),
                    bonus: 5,
                    record: 0
                }
            }})
            client.usuarios[id] = {
              id: id,
              level: 0,
              xp: 0,
              moedas: 0,
              rep: 0,
              sobremim: 'Nada definido ainda! use >sobremim para colocar uma mensagem aqui.',
              criado: Date.now(),
              nbanido: 'false',
              gbanido: 'false',
              motivoAfk: 'false',
              recompensas: {
                  diaria: {
                      tempo: Date.now(),
                      bonus: 5,
                      record: 0
                  }
              }
            }
            if(client.usuarios[id].motivoAfk != 'false') client.afk[id] = {
                usuario: await client.users.get(id),
                motivo: usuario.motivoAfk
            }
            await usuario.save()
            let usercache = await client.users.get(id)
            usercache.dados = client.usuarios[id]
            return
    },
    async Usuario(id,client){
        if(id == "1") return //Não registrar não cacheados.
        let usuariocache = await client.users.get(id)
        if(usuariocache.dados && !client.usuarios[id]) return client.usuarios[id] = usuariocache.dados//Caso não tenha no client, use do user!
        else if(!usuariocache.dados && client.usuarios[id]) return usuariocache.dados = client.usuarios[id]//Caso não tenha no user, use do client!
        else{
            Usuarios.findOne({
                id: id
            },(erro, usuario) => {
            if(erro) return console.log(erro)
            if(!usuario) return this.CriarUsuario(id,client)
            else {
            client.usuarios[id] = {
              id: id,
              level: usuario.level,
              xp: usuario.xp,
              moedas: usuario.moedas,
              rep: usuario.rep,
              sobremim: usuario.sobremim,
              criado: usuario.criado,
              nbanido: usuario.nbanido,
              gbanido: usuario.gbanido,
              motivoAfk: usuario.motivoAfk,
              recompensas: {
                  diaria: {
                      tempo: usuario.recompensas.diaria.tempo,
                      bonus: usuario.recompensas.diaria.bonus,
                      record: usuario.recompensas.diaria.record
                  }
              }
            }
            if(client.usuarios[id].motivoAfk != 'false') client.afk[id] = {
                usuario: client.users.get(id),
                motivo: usuario.motivoAfk
            }
            usuariocache.dados = client.usuarios[id]
        return client.usuarios[id]
        }
    })}}
}