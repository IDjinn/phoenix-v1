exports.run = async function(client, message, args) {
    const Discord = require('discord.js');
        if(args[0]){
        const embed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setDescription(`Skin de ${args[0]}`)
        .setImage(`https://mc-heads.net/head/`+args[0])
        message.reply(embed)
        }else return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'jogos',
    aliases: ['mccabeca'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'mchead',
    descricao: 'Veja a cabeça de alguém!',
    usar: 'mchead [nome]',
    exemplos: []
};