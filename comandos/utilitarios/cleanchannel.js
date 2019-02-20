const util = require('../../utilitarios/util.js')
exports.run = async function(client, message, args) {
    let canal = message.mentions.channels.first() || message.guild.channels.get(args[0]) || message.channel
    canal.setName(canal.name.replace(/-/gi,' ')).then(() => message.reply(`Hífens removidos do nome do canal ${canal}!`))
    .catch(() => message.reply("Ocorreu um erro quando tentei executar esse comando."))
}
exports.configuracao = {
    apenasCriador: true,
    modulo: 'utilitarios',
    aliases: [],
    permissoesNecessarias: ['MANAGE_CHANNELS'],
    permissoesBot: ['MANAGE_CHANNELS']
};

exports.ajuda = {
    nome: 'cleanchannel',
    descricao: 'Remova os hífens do nome do canal!.',
    usar: 'cleanchannel #canal',
    exemplos: []
};