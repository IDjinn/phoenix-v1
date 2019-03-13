const util = require('../../utilitarios/util.js')
module.exports = new (class UnMute {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='moderacao';
            this.aliases = [];
            this.permissoesNecessarias = ['MOD'];
            this.permissoesBot = ['MANAGE_ROLES'];
            this.nome = 'unmute';
            this.descricao = 'Faz o usuário silenciado poder voltar à falar no servidor.';
            this.usar = 'unmute <@usuário>';
            this.exemplos = ['@Djinn']
        }
async run(client,message,args) {
    let membro = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!membro) return client.emit('ajudaComando', message, this)

    let role = message.guild.roles.get(client.silenciados[membro.id].role)
    if(!role || !membro.roles.has(role.id)) return client.emit("embedDescricao",message,"Esse usuário não está silenciado!",true)

    await membro.removeRole(role)
    await util.desmutar(message.guild.id,membro.id)
    delete client.silenciados[membro.id]
    return client.emit("embedDescricao",message,"Esse usuário foi desmutado com sucesso!",true)
}
})