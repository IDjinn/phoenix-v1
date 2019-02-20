const util = require('../../utilitarios/util.js')
exports.run = async function(client, message, args) {
    let mensagemFiltrada = args.join(' ')
    if(!mensagemFiltrada) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
    if(message.member.hasPermission("MENTION_EVERYONE")) mensagemFiltrada = mensagemFiltrada.replace(/@here/,'`@here`').replace(/@everyone/,'`@everyone`')
    if(!client.permissao(message,'MOD')){
        message.reply("Me forçou à falar " + mensagemFiltrada)
        message.delete().catch()
        return;
    }
    message.channel.send(mensagemFiltrada);
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'utilitarios',
    aliases: ['say'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'falar',
    descricao: 'Force o Phoenix à falar algo!.',
    usar: 'falar [texto]',
    exemplos: ['queijadinha','bolacha ou biscoito?']
};