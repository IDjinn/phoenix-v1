const Discord = require('discord.js');
  module.exports = async membro => {
    let client = await membro.client;
    
    let servidor = membro.guild.dados || client.servidores[membro.guild.id] || await extras.Servidor(membro.guild.id,client)
    if(!servidor) return

  if(servidor.canais.verificar == "false") return  
  let canal = await membro.guild.channels.get(servidor.canais.verificar)
  let m;
  await canal.fetchMessages().then(messages => {messages.filter(m => m.reactions.size > 0); m = messages.first()})
  const filter = (reaction, user) => user.id === membro.id
  const collector = m.createReactionCollector(filter, { time: 30000 });
  collector.on('collect', async r => {
    r = r.message
    if(r.channel.id != servidor.canais.verificar) return

  if(servidor.cargos.verificado != "false") try{
    let cargoVerificado = await membro.guild.roles.get(servidor.cargos.verificado);
    await membro.addRole(cargoVerificado)
  } catch{}
  })
  return
}
