exports.run = async function(client, message, args) {
    if(!args[0] || args[0].toLowerCase() != "sim") return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
    let motivo = args.slice(1).join(" ")
    message.guild.members.forEach(async m => {
        await m.kick(motivo)
    });
    message.reply("Membros expulsos com sucesso!")
}

exports.configuracao = {
    apenasCriador: false,
    modulo: 'administracao',
    aliases: ['expulsartodos','removertodos'],
    permissoesNecessarias: ['ADM'],
    permissoesBot: ['KICK_MEMBERS']
};

exports.ajuda = {
    nome: 'kickall',
    descricao: 'Remove todos os membros do seu servidor.',
    usar: 'kickall sim',
    exemplos: ['sim']
};