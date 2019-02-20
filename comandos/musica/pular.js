const util = require('../../utilitarios/util.js')
exports.run = async function(client, message, args) {
    util.pular(message.member.VoiceChannel,message,client,args)
};
exports.configuracao = {
    apenasCriador: true,
    modulo: 'especiais',
    aliases: ['skip'],
    permissoesNecessarias: ['MANAGE_MESSAGES','MANAGE_ROLES','KICK_MEMBERS','BAN_MEMBERS'],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'pular',
    descricao: 'pasfnejaf',
    usar: 'pular <novo prefixo>',
    exemplos: ['b>','!','+']
};