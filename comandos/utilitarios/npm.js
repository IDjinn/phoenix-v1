const npm = require('api-npm')
const Discord = require('discord.js')
exports.run = async function(client, message, args) {
    let pacote = args.join(' ')
    if(!pacote) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);

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
exports.configuracao = {
    apenasCriador: true,
    modulo: 'utilitarios',
    aliases: [],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'npm',
    descricao: 'Confira um packge do npm!',
    usar: 'npm <packge>',
    exemplos: ['discord.js']
};