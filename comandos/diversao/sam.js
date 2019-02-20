const request = require('node-superfetch');
exports.run = async function(client, message, args) {
    var upperBound = (Date.now() * 1039952060005920769) / (1536938490000)
    var lowerBound = upperBound - 1183800219463680

    const { body } = await request.get(`https://twitter.com/i/profiles/show/SoutAmericMemes/timeline/tweets?include_available_features=1&include_entities=1&max_position=${Math.floor(Math.random() * lowerBound - upperBound)}&reset_error_state=false`)
    const data = body.parameters;
};
exports.configuracao = {
    apenasCriador: true,
    modulo: 'especiais',
    aliases: ['rsam'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'sam',
    descricao: 'Envia um meme do South Ameria Memes',
    usar: 'sam',
    exemplos: []
};