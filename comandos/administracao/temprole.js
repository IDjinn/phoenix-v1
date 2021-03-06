const util = require('../../utilitarios/util.js')
const TempRole = require('../../database/temprole')
const milisegundos = require('milisegundos')
module.exports = new (class TempRole {
  constructor(){
        this.apenasCriador = false;
        this.modulo = 'administracao';
        this.aliases = [];
        this.permissoesNecessarias = ['ADM'];
        this.permissoesBot = ['MANAGE_ROLES'];
        this.nome = 'temprole';
        this.descricao = 'Dá um cargo para alguém durante um determinado tempo';
        this.usar = 'temprole <@usuario>';
        this.exemplos = ['@Djinn'];
      }
  async run(client, message, args) {
    let membro = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!membro) return client.emit('ajudaComando', message, this)

    await message.reply(`Qual cargo deseja dar para ${membro.displayName}, e por quanto tempo?\nExemplo: \`@Vip 10 dias\``)
    
    const filtro = m => m.author.id == message.author.id
    await message.channel.awaitMessages(filtro, { max: 1, time: 60000, errors: ['time'] })
      .then(async c => {
          let m = c.first()
          let split = m.content.split(' ')
          let role = m.mentions.roles.first() || m.guild.roles.get(split[0])
          if(!role) return client.emit('ajudaComando', message, this)

          let tempo = split.slice(1).join(" ")
          tempo = await milisegundos(tempo)
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
})