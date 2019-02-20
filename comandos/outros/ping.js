exports.run = async function(client, message, args) {
    return client.emit("embedDescricao",message,'**Pong!** ' + Math.round(client.ping),false);;
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'outros',
    aliases: [],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'ping',
    descricao: 'Verifique o meu ping!',
    usar: 'ping',
    exemplos: []
};