exports.run = async function(client, message, args) {
    const util = require('../../utilitarios/util.js')
    util.sair(message,client)
};
exports.configuracao = {
    apenasCriador: false,
    modulo: 'musica',
    aliases: ['leave'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'sair',
    descricao: 'Faz o bot sair do canal de música.',
    usar: 'sair',
    exemplos: []
};