
const Discord = require('discord.js')
const extras = require('../utilitarios/extras.js')
module.exports = async channel => {
    if(channel.guild == undefined) return
    const client = await channel.client
    const guild = channel.guild
    let servidor = guild.dados || client.servidores[guild.id] || await extras.Servidor(guild.id,client)
    
    if(!guild.me.hasPermission('VIEW_AUDIT_LOG')) return
    guild.fetchAuditLogs()
    .then(audit => {
       let log = audit.entries.first()
       if(log.action == 'CHANNEL_CREATE'){
       if (channel.type === 'text') {
         title = "Texto"
       }
       else if (channel.type === 'voice') {
         title = "Voz"
       }
       const embed = new Discord.RichEmbed()
           .setTitle(`Canal de ${title} Criado`)   
           .setColor('#ffffff')
           .setDescription(`Nome: ${channel.name}\nCriado por: <@${log.executor.id}>\nMenção: <#${channel.id}>`)
           .setTimestamp()
   
           try{return client.channels.get(servidor.canais.logs).send(embed)}catch{return}
      }
       else if(log.action == 'CHANNEL_DELETE'){

        //Verificar se bots estão deletando os canais
        if(servidor.automod.antiraid == 'true'){
            if(guild.canaisDeletados){
                guild.canaisDeletados.quantidade += 1
                if(guild.canaisDeletados.quantidade > 2){
                    let tempo = guild.canaisDeletados.tempo
                    if(tempo >= Date.now()) guild.ban(log.executor.id,{reason: 'Possível Raid, deletar canais muito rápido.'}).catch()
                    else delete guild.canaisDeletados
                }
            }
            else{
                guild.canaisDeletados = {
                    quantidade: 1,
                    tempo: Date.now() + 500
                }
            }
        }

       if (channel.type === 'text') {
         title = "Texto"
       }
       else if (channel.type === 'voice') {
         title = "Voz"
       }
       const embed = new Discord.RichEmbed()
           .setTitle(`Canal de ${title} Deletado`)   
           .setColor('#ffffff')
           .setDescription(`Nome: ${channel.name}\nDeletado por: <@${log.executor.id}>`)
           .setTimestamp()
   
           try{return client.channels.get(servidor.canais.logs).send(embed)}catch{return}
    
    }
      else if(log.action == 'CHANNEL_UPDATE'){
       if (channel.type === 'text') {
         title = "Texto"
       }
       else if (channel.type === 'voice') {
         title = "Voz"
       }
       let alterado = ""
       for(let c in log.changes){
           let antigo = "" + log.changes[c].old
           let novo = "" + log.changes[c].new
           let tipo = "" + log.changes[c].key
           tipo = tipo.replace('name','Nome').replace('position','Posição')
           .replace('topic','Tópico').replace('nsfw','NSFW?').replace('rate_limit_per_user','SlowMode')
           .replace('bitrate','BitRate').replace('userLimit','Limite de Usuários')
           antigo = antigo.replace('true','Sim').replace('false','Não').replace('undefined','Não Definido!')
           novo = novo.replace('true','Sim').replace('false','Não')
            alterado = alterado + tipo + ": Antes: " + antigo + " -  Agora: " + novo + "\n"
       }

       const embed = new Discord.RichEmbed()
           .setTitle(`Canal de ${title} Atualizado`)   
           .setColor('#ffffff')
           .setDescription(`Nome: ${channel.name}\nAtualizado por: <@${log.executor.id}>\nMenção: <#${channel.id}>\n\nAlterações: \`${alterado}\``)
           .setTimestamp()
   
           try{return client.channels.get(servidor.canais.logs).send(embed)}catch{return}
    
    }})
    .catch();
}