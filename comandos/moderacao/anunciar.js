const Discord = require('discord.js');
module.exports = new (class Anunciar {
  constructor(){
        this.apenasCriador = false,
        this.modulo = 'moderacao',
        this.aliases = ['anuncio','announce'],
        this.permissoesNecessarias = ['MANAGE_MESSAGES','KICK_MEMBERS','BAN_MEMBERS'],
        this.permissoesBot = [],
        this.name = 'anunciar',
        this.descricao = 'Anuncie no seu servidor, enviando um embed para o Canal de Anúncios.',
        this.usar = 'anunciar <titulo>',
        this.exemplos = ['Novidades no Servidor','Agora temos queijo no canal #queijos!']
      }
async run(client, message, args) {
    const filtro = m => m.author.idz == message.author.id
    let titulo = args.join(" ")
    if(!titulo) return client.emit("embedDescricao",message,"Você não escolheu o título!",true)
    let desc

    await message.channel.send("Qual será a descrição do anúncio?")
    await message.channel.awaitMessages(filtro, { max: 1, time: 60000, errors: ['time'] })
      .then(c => {
          desc = c.first().content
        })
      .catch(c => desc = false);

    if(desc == false || !desc) return client.emit("embedDescricao",message,"Falta a descrição!",true)
    
    const embed = new Discord.RichEmbed()
    .setTitle(`${titulo}`)   
    .setColor('#ffffff')
    .setDescription(`${desc}`)
    .setFooter(`${message.author.tag}`, ` ${message.author.avatarURL}`)
    .setTimestamp()
    message.channel.send({embed}).catch()
}
})