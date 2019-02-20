exports.run = async function(client, message, args) {
    const Discord = require('discord.js');
        var texto = message.content.slice(9,)
        if(texto){
        var invertido = texto.split('').reverse().join('')
        const embed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setTitle('Inversor de texto')
        .setDescription(`:inbox_tray: | **Entrada**\n\`\`\`${texto}\`\`\`\n:outbox_tray: | **Saida**\n\`\`\`${invertido}\`\`\``)
        message.channel.send(embed)
        }else return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'utilitarios',
    aliases: ['reverse'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'inverter',
    descricao: 'Fale de trás para frente!',
    usar: 'inverter [texto]',
    exemplos: []
};