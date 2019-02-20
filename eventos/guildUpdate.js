
const Discord = require('discord.js')
module.exports = async (guild) => {
    const client = await guild.client
    const extras = require('../utilitarios/extras.js')
    let servidor = guild.dados || client.servidores[id] || await extras.Servidor(guild.id,client)
    
    if(!guild.me.hasPermission('VIEW_AUDIT_LOG')) return
    guild.fetchAuditLogs()
    .then(audit => {
       let log = audit.entries.first()
       if(log.action != 'GUILD_UPDATE') return
           let alterado = ""
           for(let c in log.changes){
               let antigo = "" + log.changes[c].old
               let novo = "" + log.changes[c].new
               let tipo = "" + log.changes[c].key
               if(log.changes[c].key == 'default_message_notifications'){
                   novo = novo.replace('0','Todas as Mensagens').replace('1','Apenas @menções')
                   antigo = antigo.replace('0','Todas as Mensagens').replace('1','Apenas @menções')
               }
               if(log.changes[c].key == 'afk_timeout'){
                   novo = novo / 60 + " minuto(s)"
                   antigo = antigo / 60 + " minuto(s)"
               }
               if(log.changes[c].key == 'system_channel_id'){
                if(novo != 'undefined') novo = guild.channels.get(novo).name
                if(antigo != 'undefined') antigo = guild.channels.get(antigo).name
               }
               if(log.changes[c].key == 'afk_channel_id'){
                   if(novo != 'undefined') novo = guild.channels.get(novo).name
                   if(antigo != 'undefined') antigo = guild.channels.get(antigo).name
               }
               tipo = tipo.replace('name','Nome').replace('region','Região')
               .replace('verification_level','Nível de Proteção').replace('explicit_content_filter','Filtro de Conteúdo Explícito').replace('afk_channel_id','Canal AFK')
               .replace('system_channel_id','Canal de Boas-Vindas').replace('afk_timeout','Tempo AFK').replace('widget_enabled','Widget Ativo?')
               .replace('icon_hash','Ícone ID').replace('owner','Dono(a)').replace('default_message_notifications','Configurações de Notificação Padrão')
               antigo = antigo.replace('true','Sim').replace('false','Não').replace('undefined','Não Definido!')
               novo = novo.replace('true','Sim').replace('false','Não').replace('undefined','Não Definido!')
                alterado = alterado + tipo + ": Antes: " + antigo + " -  Agora: " + novo + "\n"
           }
    

       const embed = new Discord.RichEmbed()
           .setTitle(`Configurações do Servidor Atualizadas`)   
           .setColor('#ffffff')
           .setDescription(`Atualizado por: ${log.executor.username}\nAtualizações: \`${alterado}\`\nTag: ${log.executor.username + "#" + log.executor.discriminator}\nMenção: <@${log.executor.id}>`)
           .setTimestamp()
   
           try{client.channels.get(servidor.canais.logs).send(embed)}catch{return}
       
    })
    .catch();
}