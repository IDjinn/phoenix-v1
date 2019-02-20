exports.run = async function(client, message, args) {
    const emojiList = message.guild.emojis.map((e, x) => 'Id: `' + (x + '` = ' + e) + ' | Nome: `' +e.name + '`').join('\n');
    message.channel.send(await emojiList);
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'utilitarios',
    aliases: ['emojilista'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'listaemoji',
    descricao: 'Lista todos os emojis do servidor',
    usar: 'listaemoji',
    exemplos: []
};