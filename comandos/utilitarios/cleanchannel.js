const util = require('../../utilitarios/util.js')
module.exports = new (class CleanChannel {
    constructor(){
            this.apenasCriador = true;
            this.modulo ='utilitarios';
            this.aliases = [];
            this.permissoesNecessarias = ['MANAGE_CHANNELS'];
            this.permissoesBot = ['MANAGE_CHANNELS'];
            this.nome = 'cleanchannel';
            this.descricao = 'Remova os hífens do nome do canal!.';
            this.usar = 'cleanchannel #canal';
            this.exemplos = []
        }
async run(client, message, args) {
    let canal = message.mentions.channels.first() || message.guild.channels.get(args[0]) || message.channel
    canal.setName(canal.name.replace(/-/gi,' ')).then(() => message.reply(`Hífens removidos do nome do canal ${canal}!`))
    .catch(() => message.reply("Ocorreu um erro quando tentei executar esse comando."))
}
})