
const Discord = require('discord.js')
module.exports = async (oldMember,newMember) => {
    if(oldMember.guild == undefined) return
    const client = await oldMember.client
    const guild = oldMember.guild
    const extras = require('../utilitarios/extras.js')
    let servidor = guild.dados || client.servidores[guild.id] || await extras.Servidor(guild.id,client)
    
    if(!guild.me.hasPermission('VIEW_AUDIT_LOG')) return
    guild.fetchAuditLogs()
    .then(audit => {
       let log = audit.entries.first()
       if(log.action == 'MEMBER_UPDATE'){
         let alterado = ""
             let antigo = "" + log.changes[0].old
             let novo = "" + log.changes[0].new
             let tipo = "" + log.changes[0].key
             tipo = tipo.replace('nick','Apelido').replace('roles','Cargos')
             .replace('mute','Silenciado').replace('deaf','deaf').replace('channel','Canal')
             antigo = antigo.replace('true','Sim').replace('false','Não').replace('undefined','Não Definido!')
             novo = novo.replace('true','Sim').replace('false','Não').replace('undefined','Não Definido!')
              alterado = tipo + ": `Antes: " + antigo + " -  Agora: " + novo + "`"
  

     const embed = new Discord.RichEmbed()
         .setTitle(`Membro ${log.target.tag} Atualizado!`)   
         .setColor('#ffffff')
         .setDescription(`Atualizado por: ${log.executor.username}\n${alterado}`)
         .addField(`Menções e Tags`,`<@${log.executor.id}> ${log.executor.username + "#" + log.executor.discriminator}\n<@${log.target.id}> ${log.target.username + "#" + log.target.discriminator}`)
         .setTimestamp()
 
         try{client.channels.get(servidor.canais.logs).send(embed)}catch{return}
     
    }
    else if(log.action == 'MEMBER_ROLE_UPDATE'){
        let alterado = ""
        let cargoId = 0
        if(log.changes[0].old) cargoId = log.changes[0].old[0].id
        else cargoId = log.changes[0].new[0].id

          let cargo = guild.roles.get(cargoId) ? guild.roles.get(cargoId).name : "erro"

            let tipo = "" + log.changes[0].key
            tipo = tipo.replace('$remove','Removido').replace('$add','Adicionado')
            alterado = tipo + ": @`" +cargo + "`"
 
        const embed = new Discord.RichEmbed()
            .setTitle(`Cargos de ${log.target.username} Atualizados`)   
            .setColor('#ffffff')
            .setDescription(`Nome: ${log.target.username}\nAtualizado por: <@${log.executor.id}>\n${alterado}`)
            .addField(`Menções`,`Executor: <@${log.executor.id}>\nAlvo: <@${log.target.id}>\nCargo: <@&${cargoId}>`)
            .setTimestamp()
    
            try{return client.channels.get(servidor.canais.logs).send(embed)}catch{return}
    
  }})
    .catch();
}