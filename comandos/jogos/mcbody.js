exports.run = async function(client, message, args) {
    const Discord = require('discord.js');
        if(args[0]){
        const embed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setDescription(`Skin de ${args[0]}`)
        .setImage(`https://mc-heads.net/body/`+args[0])
        message.reply(embed)
        }else return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'jogos',
    aliases: ['mcavatar'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'mcbody',
    descricao: 'Veja a skin de alguém!',
    usar: 'mcbody [nome]',
    exemplos: []
};