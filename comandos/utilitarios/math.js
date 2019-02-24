const math = require('mathjs')
exports.run = async function(client, message, args) {
    let expressao = args.join(" ")
    if(!expressao) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
    try{
        const resultado = math.eval(expressao)
        return client.emit("embedDescricao",message,`Resultado: ${resultado.toFixed(10)}`,false)
    }
    catch{
        return client.emit("embedDescricao",message,`Erro ao calcular a expressão ${expressao}!`,false)
    }
}

exports.configuracao = {
    apenasCriador: false,
    modulo: 'utilitarios',
    aliases: ['calc','calcular','calculadora'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'math',
    descricao: 'Calcule uma expressão!',
    usar: 'math <expressão>',
    exemplos: ['15 * 5','PI / 50','2^8']
};