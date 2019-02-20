
const Discord = require('discord.js')
const extras = require('../utilitarios/extras.js')
module.exports = async message => {
    if(!message.content || !message.guild) return
    let client = await message.client;
    let guild = message.guild
    if(!guild) return
    let servidor = message.guild.dados || client.servidores[message.guild.id] || await extras.Servidor(message.guild.id,client)

    if(!guild.me.hasPermission('VIEW_AUDIT_LOG')) return
    message.guild.fetchAuditLogs()
    .then(async audit => {
       let log = audit.entries.first()
       if(log.action == 'MESSAGE_DELETE'){
           let filtrada  = message.cleanContent
           filtrada = filtrada.replace(/```/g,' ').replace(/||/g, '')
           if(servidor.canais.logs == "false") return
           const embed = new Discord.RichEmbed()
               .setTitle('Mensagem Deletada')   
               .setColor('#ffffff')
               .setThumbnail(log.executor.avatarURL)
               .setDescription(`${log.executor.tag} deletou uma mensagem de ${log.target.tag} no canal <#${message.channel.id}>.`)
               .addField(`Conteúdo`,`\`\`\`${filtrada}\`\`\``)
               .addField(`Menções`,`Autor da Mesagem: <@${log.target.id}>\nQuem Deletou: <@${log.executor.id}>\nCanal: <#${message.channel.id}>`)
               .setFooter(log.executor.tag, log.executor.avatarURL)
               .setTimestamp()
       
                   try{client.channels.get(servidor.canais.logs).send(embed)}catch{return}
       }
    }).catch()
}