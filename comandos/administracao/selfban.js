const safe = ['512992493118291978','503239059775422491']
exports.run = async function(client, message, args) {
    if(!args[0]) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
    if(isNaN(args[0])) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
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

exports.configuracao = {
    apenasCriador: false,
    modulo: 'administracao',
    aliases: [],
    permissoesNecessarias: ['ADM'],
    permissoesBot: ['BAN_MEMBERS']
};

exports.ajuda = {
    nome: 'selfban',
    descricao: 'Aplica banimento nos ultimos <quantidade> usuários que entraram no servidor.',
    usar: 'selfban <quantidade> [motivo]',
    exemplos: ['10 RAID','2 FLOOD','8']
};