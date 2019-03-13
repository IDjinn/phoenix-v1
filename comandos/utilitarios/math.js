const math = require('mathjs')
module.exports = new (class Math {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='utilitarios';
            this.aliases = ['calc','calcular','calculadora'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'math';
            this.descricao = 'Calcule uma expressão!';
            this.usar = 'math <expressão>';
            this.exemplos = ['15 * 5','PI / 50','2^8']
        }
async run(client, message, args) {
    let expressao = args.join(" ")
    if(!expressao) return client.emit('ajudaComando', message, this)
    try{
        const resultado = math.eval(expressao)
        return client.emit("embedDescricao",message,`Resultado: ${resultado.toFixed(10)}`,false)
    }
    catch{
        return client.emit("embedDescricao",message,`Erro ao calcular a expressão ${expressao}!`,false)
    }
}
})