const Discord = require('discord.js')
let loteria = {
    tickets = 0,
    lastWinner = {
        id: 0,
        win: 0
    },
    bonus: 5,
    iniciado: Date.now()
}
exports.run = async function(client, message, args) {


}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'economia',
    aliases: [],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'loteria',
    descricao: 'a',
    usar: 'loteria',
    exemplos: []
};