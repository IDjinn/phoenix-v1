
const Discord = require('discord.js')
module.exports = async role => {
    if(role.guild == undefined) return
    const client = await role.client
    const guild = role.guild
    const extras = require('../utilitarios/extras.js')
    let servidor = guild.dados || client.servidores[guild.id] || await extras.Servidor(guild.id,client)
    var permsUtil = require("../utilitarios/perms.js");
    
    if(!guild.me.hasPermission('VIEW_AUDIT_LOG')) return
    guild.fetchAuditLogs()
    .then(async audit => {
       let log = audit.entries.first()
       if(log.action == 'ROLE_UPDATE'){
       let alterado = ""
       for(let c in log.changes){
           let antigo = "" + log.changes[c].old
           let novo = "" + log.changes[c].new
           let tipo = "" + log.changes[c].key
           if(log.changes[c].key == 'permissions'){
            var antigas = permsUtil.converterPermissoes(log.changes[c].old,true)
            var novas = permsUtil.converterPermissoes(log.changes[c].new,true)
            let antes = ""
            let depois = ""
            for(let n in novas){
                if(novas[n].permitido && antigas[n].permitido) continue
                else if(!novas[n].permitido && !antigas[n].permitido) continue
                else antes = antes + antigas[n].valor + ": " + antigas[n].permitido + ", "
                depois = depois + novas[n].valor + ": " + novas[n].permitido + ", "
            }
            antigo = depois.replace(/true/g,'Sim').replace(/false/g,'Não')
            novo = antes.replace(/true/g,'Sim').replace(/false/g,'Não')
           }
           tipo = tipo.replace('name','Nome').replace('permissions','Permissões').replace('mentionable','Mencionável?')
           .replace('hoist','Destacádo?').replace('color','Cor').replace('position','Posição')
           antigo = antigo.replace('true','Sim').replace('false','Não')
           novo = novo.replace('true','Sim').replace('false','Não')
           alterado = alterado + tipo + ": Antes: " + antigo + " -  Agora: " + novo + "\n"
       }

       const embed = new Discord.RichEmbed()
           .setTitle(`Cargo Atualizado`)   
           .setColor('#ffffff')
           .setDescription(`Nome: ${role.name}\nAtualizado por: <@${log.executor.id}>\nMenção: <@&${role.id}>\n\nAlterações: \`${alterado}\``)
           .setTimestamp()
   
           try{return client.channels.get(servidor.canais.logs).send(embed)}catch{return}
    }
       else if(log.action == 'ROLE_DELETE'){
           
        //Verificar se bots estão deletando os cargos
        if(servidor.automod.antiraid == 'true'){
            if(guild.cargosDeletados){
                guild.cargosDeletados.quantidade += 1
                if(guild.cargosDeletados.quantidade > 2){
                    if(guild.cargosDeletados.tempo >= Date.now()) guild.ban(log.executor.id,{reason: 'Possível Raid, deletar cargos muito rápido.'}).catch()
                    else delete guild.cargosDeletados
                }
            }
            else{
                guild.cargosDeletados = {
                    quantidade: 1,
                    tempo: Date.now() + 500
                }
            }
        }

       const embed = new Discord.RichEmbed()
           .setTitle(`Cargo Deletado`)   
           .setColor('#ffffff')
           .setDescription(`Nome: ${role.name}\nCriado por: <@${log.executor.id}>\nMenção: <@&${role.id}>`)
           .setTimestamp()
   
           try{return client.channels.get(servidor.canais.logs).send(embed)}catch{return}
    
    }
    else if(log.action == 'ROLE_CREATE'){

       const embed = new Discord.RichEmbed()
           .setTitle(`Cargo Criado`)   
           .setColor('#ffffff')
           .setDescription(`Nome: ${role.name}\nCriado por: <@${log.executor.id}>\nMenção: <@&${role.id}>`)
           .setTimestamp()
   
           try{return client.channels.get(servidor.canais.logs).send(embed)}catch{return}
    
    }})
    .catch();
}