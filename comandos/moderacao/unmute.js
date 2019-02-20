
const util = require('../../utilitarios/util.js')

module.exports.run = async (client,message,args) => {
    let membro = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!membro) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);

    let role = message.guild.roles.get(client.silenciados[membro.id].role)
    if(!role || !membro.roles.has(role.id)) return client.emit("embedDescricao",message,"Esse usuário não está silenciado!",true)

    await membro.removeRole(role)
    await util.desmutar(message.guild.id,membro.id)
    delete client.silenciados[membro.id]
    return client.emit("embedDescricao",message,"Esse usuário foi desmutado com sucesso!",true)
}


exports.configuracao = {
    apenasCriador: false,
    modulo: 'moderacao',
    aliases: [],
    permissoesNecessarias: ['MOD'],
    permissoesBot: ['MANAGE_ROLES']
};

exports.ajuda = {
    nome: 'unmute',
    descricao: 'Faz o usuário silenciado poder voltar à falar no servidor.',
    usar: 'unmute [usuário]',
    exemplos: []
};