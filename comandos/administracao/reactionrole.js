const ReactionRole = require('../../database/reaction.js')

exports.run = async function(client, message, args) {
    const filter = (reaction, user) => user.id === message.author.id
    const filtro = m => m.author.id == message.author.id

    let a = await message.channel.send(`Em qual canal a mensagem está? (mencione ou use o id)`)
    await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
    .then(async m => {

    var canal = m.first().mentions.channels.first() || message.guild.channels.get(m.first().content)
    if(!canal) return message.channel.send("Canal não encontrado!")

    let b = await message.channel.send(`Qual o ID da Mensagem?`)
    await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
    .then(async msg => {
    let mensagemID = msg.first().content
    if(!mensagemID) return message.channel.send("Mensagem não encontrada!")
    if(isNaN(mensagemID)) return message.channel.send("Isso não parece ser um ID!")

    var emoji
    let c = await message.channel.send(`Reaja com o emoji nesta mensagem que deseja ter como reaction role`).then(async m =>{
      const collector = m.createReactionCollector(filter, { time: 300000 });
      collector.on('collect', async a => { 
        if(a.emoji.id) emoji = a.emoji.id 
        else emoji = a.emoji.name
        canal.fetchMessage(mensagemID).catch(() => { 
            emoji = undefined
            return message.channel.send("Parece que essa mensagem não existe, ou eu não consegui encontrá-la.")
        })
        .then(m => m.react(`${emoji}`))

        if(!emoji) return message.channel.send(`Ocorreu um erro quando tentei pegar esse emoji!`)

        var mensagem = `${mensagemID}-${emoji}`
        var role
    
    let d = await message.channel.send("Agora, mencione (ou use o id) do cargo para o reaction role.")
    await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
    .then(async m => {
      let msg = m.first()
      role = await msg.mentions.roles.first() || await msg.guild.roles.get(msg.content)
      if(!role) return message.channel.send(`Você não definiu um cargo válido.`)

      let apenasUma = false
      let e =await message.channel.send("Você deseja que seja possível pegar apenas um cargo, idependende da reação?").then(async m =>{
        await m.react('538036543080890368')//correto
        await m.react('538036569060278273')//incorreto
        const collector = m.createReactionCollector(filter, { time: 300000 });
        await collector.on('collect', async c => { 
          if(c.emoji.id == '538036543080890368') apenasUma = true
          message.channel.send('Blz, continuando...').then(m => m.delete(2000).catch())

          const reactionrole = new ReactionRole({
                  servidor: message.guild.id,
                  emoji: emoji,
                  roleid: role.id,
                  mensagemid: mensagemID,
                  canal: canal.id,
                  apenasUma: apenasUma.toString(),
                  estaMensagem: message.id
          })
          reactionrole.save()
                let r = {
                  servidor: message.guild.id,
                  emoji: emoji,
                  roleid: role.id,
                  mensagemid: mensagemID,
                  canal: canal.id,
                  apenasUma: apenasUma.toString(),
                  estaMensagem: message.id
                }
          client.reactionRole.set(mensagem,r)

          if(apenasUma) /*ReactionRole.find({mensagemid: mensagem},(erro,sucesso)=>{
            sucesso.update({apenasUma: apenasUma.toString()})
            sucesso.save()*/
            client.reactionRole.forEach(r => {
                if(r.mensagemid == mensagemID) r.apenasUma = apenasUma.toString()
            });
          //})

           message.channel.send(`Reaction-Role configurado com sucesso!`)
          })
        })})
      })})
    })
})
}

exports.configuracao = {
    apenasCriador: false,
    modulo: 'administracao',
    aliases: ['rr'],
    permissoesNecessarias: ['ADM'],
    permissoesBot: ['MANAGE_ROLES']
};

exports.ajuda = {
    nome: 'reactionrole',
    descricao: 'Configura um reaction-role',
    usar: 'reactionrole',
    exemplos: ['']
};