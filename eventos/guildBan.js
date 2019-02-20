
const Discord = require('discord.js')
module.exports = async (guild) => {
    const client = await guild.client
    const extras = require('../utilitarios/extras.js')
    let servidor = guild.dados || client.servidores[id] || await extras.Servidor(guild.id,client)
    
    if(!guild.me.hasPermission('VIEW_AUDIT_LOG')) return
    guild.fetchAuditLogs()
    .then(audit => {
       let log = audit.entries.first()
       if(log.action == 'MEMBER_BAN_ADD'){
           
       //Verificar se bots estão banindo pessoas
       if(servidor.automod.antiraid == 'true'){
        if(guild.banimentosAdicionados){
            guild.banimentosAdicionados.quantidade += 1
            if(guild.banimentosAdicionados.quantidade > 3){
                let tempo = guild.banimentosAdicionados.tempo
                if(tempo >= Date.now()) guild.ban(log.executor.id,{reason: 'Possível Raid, banir pessoas muito rápido.'}).catch()
                else delete guild.banimentosAdicionados
            }
        }
        else{
            guild.banimentosAdicionados = {
                quantidade: 1,
                tempo: Date.now() + 500
            }
        }
    }

       const embed = new Discord.RichEmbed()
           .setTitle(`Usuário Banido!`)   
           .setColor('#ffffff')
           .setDescription(`Nome: ${log.target.username}\nId: ${log.target.id}\nBanido por: <@${log.executor.id}>\nTag: ${log.target.username + "#" + log.target.discriminator}`)
           .setTimestamp()
   
           try{client.channels.get(servidor.canais.logs).send(embed)}catch{return}
       }
       else if(log.action == 'MEMBER_BAN_REMOVE'){

        const embed = new Discord.RichEmbed()
        .setTitle(`Usuário Desbanido!`)   
        .setColor('#ffffff')
        .setDescription(`Nome: ${log.target.username}\nId: ${log.target.id}\nDesbanido por: <@${log.executor.id}>\nTag: ${log.target.username + "#" + log.target.discriminator}`)
        .setTimestamp()
    
            try{client.channels.get(servidor.canais.logs).send(embed)}catch{return}
     }
    })
    .catch();
}