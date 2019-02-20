const Discord = require('discord.js')
const util = require('../utilitarios/util.js')
const extras = require('../utilitarios/extras.js')

async function VerificarDominio (dominio, link) {
    if (typeof dominio !== 'string') return dominio;
    let regex = new RegExp(`^(http[s]?://)?${dominio.replace(/\*/g, '[\\w\\d.-]*')}`);
    return regex.test(link);
  };

module.exports = async (client,message) => {
var automod = await extras.Servidor(message.guild.id,client)
if(!automod) return
else automod = automod.automod

if(message.author.id == '376460601909706773' /*&& client.checarPermissoesServidor(message) == 0*/){
    if(automod.antispaminvite != 'true'){
             let convites = message.content.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
             if (message.content.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
             for(let e in message.embeds){
                 if(message.embeds[e].title) convites = convites + message.embeds[e].title.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
                 if(message.embeds[e].description) convites = convites + message.embeds[e].description.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
                 
                 if(message.embeds[e].fields){
                 for(let f in message.embeds[e].fields){
                    convites = convites + message.embeds[e].fields[f].name.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
                    convites = convites + message.embeds[e].fields[f].value.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
                     }
                 }
                 if(message.embeds[e].footer) convites = convites + message.embeds[e].footer.text.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
                 if(message.embeds[e].author) convites = convites + message.embeds[e].author.name.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
                 //if(message.embeds[e].provider) convites = convites + message.embeds[e].description.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
                 }
                }
             if(convites.length > 0){
             message.delete().catch()
             if(automod.autowarn != 'false'){
             const convite = new Discord.RichEmbed()
             .setTitle(`Oops!`)   
             .setColor('#ffffff')
             .setDescription("Você não tem permissão para enviar convites de outros servidores!")
             return message.reply(convite)
             }
             else{
               let a = await util.punir(message.guild.id, message.author.id, 'Enviar convites de servidores Discord', client.user.id, 4, 'true', client)
               if(a >= 3) return message.member.ban('Atingir 3 strikes').catch()
               const conviteWarn = new Discord.RichEmbed()
               .setTitle(`Oops!`)   
               .setColor('#ffffff')
               .setDescription(`Você não tem permissão para enviar convites de outros servidores! Atualmente você tem ${a} strikes. Quando chegar a 3 strikes será banido do servidor.`)
               return message.reply(conviteWarn)
             }
         }
        }
         //--------LINKS----------//
    /*if(automod.blacklink != 'false'){
      let links = message.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
      if (links){
      if (automod.whitelink.length) {
        let matches = [];
        for (let i in automod.whitelink) {
          matches[i] = links.filter(link => !VerificarDominio(whitelistedDomains[i], link));
        }
        links = matches.reduce((p, c) => p.filter(e => c.includes(e)))
      }
        if (links.length > 0)
        message.delete().catch()
            if(automod.autowarn == 'false'){
            const link = new Discord.RichEmbed()
            .setTitle(`Oops!`)   
            .setColor('#ffffff')
            .setDescription("Você não tem permissão para enviar convites de outros servidores!")
            return message.reply(link).then(msg => { msg.delete(3000) }).catch()
            }
            else{
              let a = util.punir(message.guild.id, message.author.id, 'Enviar convites de servidores Discord', client.user.id, 99, 'true', client)
              if(a >= 3) return message.member.ban('Atingir 3 strikes') 
              const link = new Discord.RichEmbed()
              .setTitle(`Oops!`)   
              .setColor('#ffffff')
              .setDescription(`Você não tem permissão para enviar convites de outros servidores! Atualmente você tem ${a} strikes. Quando chegar a 3 strikes será banido do servidor.`)
              return message.reply(link).then(msg => { msg.delete(3000) }).catch()
            }
        }
    }*/
    //--------MENÇÕES----------//

    if(automod.antispammention != 'false'){
        let mencao = message.mentions.members.size
        if(mencao > parseInt(automod.antispammention)) 
        if(automod.autowarn == 'false'){
        const mention = new Discord.RichEmbed()
        .setTitle(`Oops!`)   
        .setColor('#ffffff')
        .setDescription("Você não pode fazer massmention!")
        return message.reply(mention).then(msg => { msg.delete(3000) }).catch()
        }
        else{
          let a = await util.punir(message.guild.id, message.author.id, `Fazer massmention (${mencao})`, client.user.id, 4, 'true', client)
          if(a >= 3) return message.member.ban('Atingir 3 strikes').catch()
          const mentionwarn = new Discord.RichEmbed()
          .setTitle(`Oops!`)   
          .setColor('#ffffff')
          .setDescription(`Você não pode fazer massmention! Atualmente você tem ${a} strikes. Quando chegar a 3 strikes será banido do servidor.`)
          return message.reply(mentionwarn)
        }
    }    
}
}