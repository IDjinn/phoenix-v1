exports.run = async function(client, message, args) {
    const Discord = require('discord.js');
    let porcentagem = Math.floor((Math.random() * 100) + 1)
    args = args.join(" ")
    if(!args)return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
    const embed = new Discord.RichEmbed()
    .setColor('#ffffff')
    .setTitle(`Você é...`)
    .setThumbnail(message.author.avatarURL)
    .setDescription(`Você é ${porcentagem}% ${args}`)
    message.reply(embed)
    return;
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'diversao',
    aliases: ['iam'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'eusou',
    descricao: 'Você é ??% alguma coisa!',
    usar: 'eusou [algo]',
    exemplos: ['lindo','feliz']
};