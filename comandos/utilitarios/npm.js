const npm = require('api-npm')
const Discord = require('discord.js')
module.exports = new (class Npm {
  constructor(){
        this.apenasCriador = true,
        this.modulo = 'utilitarios',
        this.aliases = [],
        this.permissoesNecessarias = [],
        this.permissoesBot = [],
        this.nome = 'npm',
        this.descricao = 'Confira um packge do npm!',
        this.usar = 'npm <packge>',
        this.exemplos = ['discord.js']
      }
async run(client, message, args) {
    let pacote = args.join(' ')
    if(!pacote) return client.emit('ajudaComando', message, this)

    npm.getdetails(pacote, data => {
      if (data.name) {
        const description = data.description ||'Sem descrição'
        const embed = new Discord.RichEmbed()
        .setColor('#CB3837')
        .setAuthor(data.name, 'https://i.imgur.com/24yrZxG.png', `https://www.npmjs.com/package/${data.name}`)
        .setDescription(`${description}\nhttps://www.npmjs.com/package/${data.name}\n\n\`npm i ${data.name} --save\``)
        message.channel.send(embed)
      } else {
        return client.emit("embedDescricao",message,"Packge não encontrado!",true)
      }
    })
}
} )