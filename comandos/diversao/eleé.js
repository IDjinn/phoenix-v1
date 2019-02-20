exports.run = async function(client, message, args) {
    const Discord = require('discord.js');
    let mencao = message.mentions.users.first() || client.users.get(args[0]) 
    if(!mencao) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
        let mensagem = args.slice(1).join(" ");
        let porcentagem = Math.floor((Math.random() * 100) + 1)
        const embed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setTitle(`Ele é...`)
        .setThumbnail(mencao.displayAvatarURL)
        .setDescription(`${mencao} é ${porcentagem}% ${mensagem}`)
        message.reply(embed)
        return;
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'diversao',
    aliases: ['heis','elee'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'eleé',
    descricao: 'Ele é ??% alguma coisa!',
    usar: 'eleé [algo]',
    exemplos: ['376460601909706773 homem','@Djinn lindo']
};