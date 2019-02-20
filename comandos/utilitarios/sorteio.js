const util = require('../../utilitarios/util.js')
const Discord = require('discord.js')
exports.run = async function(client, message, args) {

    if (!('sorteios' in message.guild)) {
      message.guild.sorteios = new Map();
    }
    if(!args[0]){
    var item;
    var titulo
    var tempo;
    var ganhadores;
    var cargo;
    var cancelado = false;

    const filtro = m => m.author.id == message.author.id
    const filter = (reaction, user) => (reaction.emoji.id == '538036569060278273' || reaction.emoji.id == '538036543080890368') && user.id === message.author.id

    //Titulo
    if(!cancelado) await message.channel.send(`Qual o título que você deseja definir para o sorteio?`).then(async m =>{
      //await m.react('538036543080890368')//correto
      await m.react('538036569060278273')//incorreto
      const collector = m.createReactionCollector(filter, { time: 300000 });
      collector.on('collect', async r => { 
        if(r.emoji.id == '538036569060278273') {
          cancelado = true
          return  message.channel.send('Operação Cancelada.')
        }
      })
      collector.on('end',() => {
      cancelado = true
    })})

    if(!cancelado) await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
    .then(async m => {
      titulo = m.first().content
      if(!titulo) message.channel.send(`Você não definiu um título para o sorteio válida.`)
    .catch(m => 
     message.channel.send(`Você não definiu um título para o sorteio válida.`)
    )})


    //Desc
    if(!cancelado) await message.channel.send(`Qual a mensagem que você deseja definir para o sorteio?`).then(async m =>{
      //await m.react('538036543080890368')//correto
      await m.react('538036569060278273')//incorreto
      const collector = m.createReactionCollector(filter, { time: 300000 });
      collector.on('collect', async r => { 
        if(r.emoji.id == '538036569060278273') {
          cancelado = true
          return  message.channel.send('Operação Cancelada.')
        }
      })
      collector.on('end',() => {
      cancelado = true
    })})

    if(!cancelado) await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
    .then(async m => {
      item = m.first().content
      if(!item) message.channel.send(`Você não definiu uma mensagem para o sorteio válida.`)
    .catch(m => 
     message.channel.send(`Você não definiu uma mensagem para o sorteio válida.`)
    )})

    //Tempo
    if(!cancelado) await message.channel.send(`Quanto tempo você deseja definir para o sorteio? Exemplos: \`1 hora\`, \`2 dias\`, \`5 minutos\`, \`30 segundos\`, `).then(async m =>{
      //await m.react('538036543080890368')//correto
      await m.react('538036569060278273')//incorreto
      const collector = m.createReactionCollector(filter, { time: 300000 });
      collector.on('collect', async r => { 
        if(r.emoji.id == '538036569060278273') {
          cancelado = true
          return  message.channel.send('Operação Cancelada.')
        }
      })
      collector.on('end',() => {
      cancelado = true
    })})
    
    if(!cancelado) await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
    .then(async m => {
      cancelado = true
      tempo = await util.converterData(m.first().content)
      if(!tempo) message.channel.send(`Você não definiu um prazo para o sorteio válido.`)
    .catch(m => {
      cancelado = true
      return message.channel.send(`Você não definiu um prazo para o sorteio válido.`)
    })})
    
    //Ganhadores
    if(!cancelado) await message.channel.send(`Quantos ganhadores você deseja definir para o sorteio?`).then(async m =>{
      //await m.react('538036543080890368')//correto
      await m.react('538036569060278273')//incorreto
      const collector = m.createReactionCollector(filter, { time: 300000 });
      collector.on('collect', async r => { 
        if(r.emoji.id == '538036569060278273') {
          cancelado = true
          return  message.channel.send('Operação Cancelada.')
        }
      })
      collector.on('end',() => {
      cancelado = true
    })})
    
    if(!cancelado) await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
    .then(async m => {
      ganhadores = parseInt(m.first().content)
      if(!ganhadores && !cancelado) message.channel.send(`Você não definiu uma quantidade de ganhadores válida para o sorteio.`)
    .catch(m => {
      cancelado = true
      return message.channel.send(`Você não definiu quantidade de ganhadores válida para o sorteio.`)
    })})

    //Cargo
    if(!cancelado) await message.channel.send(`Você deseja que o(s) ganhador(es) receba(m) algum cargo? Se sim, clique no emoji <:correto:538036543080890368>, caso contrário clique no emoji <:incorreto:538036569060278273> abaixo!`).then(async m =>{
      await m.react('538036543080890368')//correto
      await m.react('538036569060278273')//incorreto
      const collector = m.createReactionCollector(filter, { time: 300000 });
      await collector.on('collect', async r => { 
        if(r.emoji.id == '538036543080890368') cargo = await m.mentions.roles.first() || await m.guild.roles.get(args[0])
        else {message.channel.send('Blz, continuando...')}

    if(cancelado) return 

    if (item) {
    let reaction = '🎉'
      const embed =  new Discord.RichEmbed()
      .setColor("36393f")
      .setTitle(`${titulo}`)
      .setDescription(`${item}\n\nReaja esssa mensagem com a reação ${reaction} para participar!`)
      .setFooter(`${ganhadores} Ganhadores • Término`)
      .setTimestamp(new Date(Date.now() + tempo))
      
    let mensagemSorteio = await message.channel.send(embed)
    await mensagemSorteio.react(reaction);

    let mensagemSorteioID = mensagemSorteio.id;

    let sorteio = client.setTimeout(async () => {
      mensagemSorteio = await message.channel.fetchMessage(mensagemSorteioID);

      let participantes;
      if (mensagemSorteio.reactions.has(reaction)) {
        participantes = mensagemSorteio.reactions.get(reaction).users.filter(user => !user.bot).map(u => `<@${u.id}>`);
      }

      let finalistas;
      if (participantes.length) {
        finalistas = util.elementosRandomicos(participantes, finalistas, true);
      }

      if (finalistas) {
      const finalizado =  new Discord.RichEmbed()
      .setColor("36393f")
      .setTitle("Sorteio Finalizado!")
      .setDescription(`O sorteio valendo **${item}** acabou, caso você tenha ganhado, contate ${message.author.tag} para receber seu prêmio.\nObrigado à todos por participar e boa sorte no próximo!`)
      .addField('Ganhadores',`${finalistas.join('\n')}`)
      .setTimestamp()

      if(cargo) finalistas.forEach(f =>{
        message.guild.members.get(f).then(async m => {
          let r = await message.guild.roles.get(cargo.id)
          await m.addRole(r).catch(message.channel.send(`Não consegui dar o cargo para o ganhador <@${m.user.id}>!`))
        })
      })
        await mensagemSorteio.edit(finalizado).catch();

      }
      else {
        const erro =  new Discord.RichEmbed()
        .setColor("36393f")
        .setTitle("Sorteio Encerrado!")
        .setDescription(`Infelizmente, ocorreu algum erro com esse sorteio, e então niguém ganhou **${item}**.`)
        .setFooter('ID:',`${mensagemSorteioID}`)
        .setTimestamp()
        await mensagemSorteio.edit(erro).catch();
      }
      await message.guild.sorteios.delete(mensagemSorteioID);
    }, tempo  + Date.now());

    await message.guild.sorteios.set(mensagemSorteioID, sorteio);
    }
  })
  await collector.on('end',() => {
  cancelado = true
})})}/*
  else if (args.reroll) {
    if (message.guild.sorteios.has(args.reroll)) {
      return client.emit('error', client.i18n.error(message.guild.language, 'notFound'), 'That sorteio is currently running in this server. You can only reroll concluded or abruptly stopped sorteios.', message.channel);
    }

    // Fetch the sorteio message to get new reactions
    let mensagemSorteio = await message.channel.fetchMessage(args.reroll);

    // Check if it's a valid sorteio message
    if (mensagemSorteio.author.id !== client.user.id || mensagemSorteio.embeds.length !== 1 || !mensagemSorteio.embeds[0].author.name.startsWith('sorteio')) return;

    let sorteioItem = mensagemSorteio.embeds[0].title;
    let reaction = mensagemSorteio.reactions.filter(reaction => reaction.me).first();
    if (!reaction) return;
    reaction = reaction.emoji.name;

    // Get (only) the users who reacted to the sorteio message
    let participantes;
    if (mensagemSorteio.reactions.has(reaction)) {
      participantes = mensagemSorteio.reactions.get(reaction).users.filter(user => !user.bot).map(u => `**${u.tag}** / ${u.id}`);
    }

    // Get random users (finalistas) from the participantes
    let finalistas;
    if (participantes.length) {
      finalistas = util.elementosRandomicos(participantes, ganhadores, true);
    }

    // If there're finalistas declare the result
    if (finalistas) {
      // Declare the result in the channel
      await mensagemSorteio.edit({
        embed: {
          color: client.colors.BLUE,
          author: {
            name: 'sorteio Rerolled!'
          },
          title: sorteioItem,
          description: `The following users have won and will be contacted by ${message.author.tag} with their reward.\nThank you everyone for participating. Better luck next time.`,
          fields: [
            {
              name: 'finalistas',
              value: finalistas.join('\n')
            }
          ],
          footer: {
            text: `sorteio ID: ${mensagemSorteio.id}`
          }
        }
      }).catch(e => {
        if (e.code !== 50001) {
          throw e;
        }
      });
    }
    // Otherwise state the unfortunate outcome
    else {
      await mensagemSorteio.edit({
        embed: {
          color: client.colors.RED,
          title: 'sorteio Event Rerolled',
          description: `Unfortunately, no one participated and apparently there's no winner for **${sorteioItem}**. 😕`,
          footer: {
            text: `sorteio ID: ${mensagemSorteio.id}`
          }
        }
      }).catch(e => {
        if (e.code !== 50001) {
          throw e;
        }
      });
    }
  }*/
  else if (args[0]) {
    if(isNaN(args[0])) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
    let mensagemID = args[0]
    if (message.guild.sorteios.has(mensagemID)) {
      await client.clearTimeout(message.guild.sorteios.get(mensagemID));
      await message.guild.sorteios.delete(mensagemID);

      let mensagemSorteio = await message.channel.fetchMessage(mensagemID);
      await mensagemSorteio.delete().catch()

      const cancelado =  new Discord.RichEmbed()
      .setColor("36393f")
      .setTitle("Sorteio Cancelado!")
      .setDescription(`O sorteio de ID **${mensagemID}** foi cancelado por ${message.author.tag}!`)
      .setTimestamp()

      await message.channel.send(cancelado).catch(e => {
        return message.reply("Ocorreu um erro ao tentar executar esse comando")
      });
    }
    else {
      return message.reply("Ocorreu um erro ao tentar executar esse comando")
    }
  }
  else {
    return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
  }

}

exports.configuracao = {
    apenasCriador: false,
    modulo: 'utilitarios',
    aliases: ['giveway'],
    permissoesNecessarias: ['MOD'],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'sorteio',
    descricao: 'Convites importantes do Phoenix!.',
    usar: 'sorteio [mensagemID]',
    exemplos: ['15 Discord nitro','522009897571844096 (use o id da mensagem para finalizar!)']
};