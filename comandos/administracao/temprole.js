const util = require('../../utilitarios/util.js')
const TempRole = require('../../database/temprole')
exports.run = async function(client, message, args) {
    let membro = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!membro) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);

    message.reply(`Qual cargo deseja dar para ${membro.displayName}, e por quanto tempo?\nExemplo: \`@Vip 10 dias\``)
    
    const filtro = m => m.author.id == message.author.id
    await message.channel.awaitMessages(filtro, { max: 1, time: 60000, errors: ['time'] })
      .then(async c => {
          let m = c.first()
          let split = m.content.split(' ')
          let role = m.mentions.roles.first() || m.guild.roles.get(split[0])
          if(!role) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);

          let tempo = split.slice(1).join(" ")
          tempo = await util.converterData(tempo)
          if(!tempo) return client.emit('ajudaComando', message, 'Defina um período válido!', true);

          const temprole = new TempRole({
              servidor: message.guild.id,
              roleid: role.id,
              userid: membro.id,
              criadoem: Date.now(),
              expiraem: Date.now() + tempo,
              expirado: 'false'
          })
          temprole.save()
          client.tempRole[temprole._id] = {
            servidor: message.guild.id,
            roleid: role.id,
            userid: membro.id,
            criadoem: Date.now(),
            expiraem: Date.now() + tempo,
            expirado: 'false'
          }
          membro.addRole(role).catch()
          message.channel.send(`TempRole configurado com sucesso!`)
        })
      .catch();
}

exports.configuracao = {
    apenasCriador: false,
    modulo: 'administracao',
    aliases: [],
    permissoesNecessarias: ['ADM'],
    permissoesBot: ['MANAGE_ROLES']
};

exports.ajuda = {
    nome: 'temprole',
    descricao: 'Dá um cargo para alguém durante um determinado tempo',
    usar: 'temprole @usuario',
    exemplos: ['@Djinn']
};