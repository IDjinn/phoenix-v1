const safe = ['512992493118291978','503239059775422491']
module.exports = new (class SelfBan {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='administracao';
            this.aliases = [];
            this.permissoesNecessarias = ['ADM'];
            this.permissoesBot = ['BAN_MEMBERS'];
            this.nome = 'selfban';
            this.descricao = 'Aplica banimento nos ultimos <quantidade> usuários que entraram no servidor.';
            this.usar = 'selfban <quantidade> [motivo]';
            this.exemplos = ['10 RAID','2 FLOOD','8']
        }
async run(client, message, args) {
    if(!args[0]) return client.emit('ajudaComando', message, this)
    if(isNaN(args[0])) return client.emit('ajudaComando', message, this)
    if(client.servidores[message.guild.id].ultimosMembros.length == 0) return client.emit("embedDescricao",message,`Nenhum novo usuário para banir!`,false)
    let motivo = args.slice(1).join(' ')
    if(!motivo) motivo = 'Motivo não expecificado!'

    let membros = await client.servidores[message.guild.id].ultimosMembros
    let quantidade = args[0]

    if(quantidade > membros.length) quantidade = membros.length

    let a = 0
    let b = 0

    for(let u = quantidade; u >= 0; u--){
        //if(safe.includes(membros[u])) continue
        let m = await message.guild.members.get(membros[u])
        delete membros[u]
        if(m) await m.ban(motivo).then(() => a = a + 1).catch(b = b + 1)
    }
    return client.emit("embedDescricao",message,`Usuários banidos com sucesso! Banidos: ${a}, Não-Banidos: ${b}`,false)
}
})