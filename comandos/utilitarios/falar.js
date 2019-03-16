const util = require('../../utilitarios/util.js')
module.exports = new (class Falar {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='utilitarios';
            this.aliases = ['say'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'falar';
            this.descricao = 'Force o Phoenix à falar algo!.';
            this.usar = 'falar [texto]';
            this.exemplos = ['queijadinha','bolacha ou biscoito?']
        }
async run(client, message, args) {
    let mensagemFiltrada = args.join(' ')
    if(!mensagemFiltrada) return client.emit('ajudaComando', message, this)
    if(message.member.hasPermission("MENTION_EVERYONE")) mensagemFiltrada = mensagemFiltrada.replace(/@here/,'`@here`').replace(/@everyone/,'`@everyone`')
    if(!util.permissao(message,'MOD')){
        message.reply("Me forçou à falar " + mensagemFiltrada)
        message.delete().catch()
        return;
    }
    message.channel.send(mensagemFiltrada);
}
})