const Discord = require('discord.js');
  module.exports = async (reaction,client) => {
    let tipo = reaction.t == 'MESSAGE_REACTION_ADD' ? 1 : 2
    reaction = reaction.d
    let emoji = reaction.emoji.id ? reaction.emoji.id : reaction.emoji.name
    if(client.reactionRole[`${reaction.message_id}-${emoji}`]){
      r = await client.reactionRole[`${reaction.message_id}-${emoji}`]
      if(r.emoji == emoji
        && r.canal == reaction.channel_id && r.servidor == reaction.guild_id){
          let guild = await client.guilds.get(reaction.guild_id)
          let canal = await guild.channels.get(reaction.channel_id)
          let mensagem = await canal.fetchMessage(reaction.message_id)
          if(r.apenasUma == 'true') {
            let jaReagiu = false
            mensagem.reactions.forEach(r=> {
              r.users.forEach(async u => {
                if(u.id == reaction.user_id && jaReagiu == false) jaReagiu = true
                else if(u.id == reaction.user_id && jaReagiu == true) await r.remove(u).catch()
              })
            })
          }
          let membro = await guild.members.get(reaction.user_id)
          if(!r.roleid || !membro) return
          if(tipo == 1) await membro.addRole(r.roleid).catch()
          else if(tipo == 2) await membro.removeRole(r.roleid).catch()
        }
    }
}