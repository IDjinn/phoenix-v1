exports.run = async function(client, message, args) {
    let divisao = args.join(' ').split('|')
    if(!divisao[0]) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
    if(!divisao[1]) tipo = "text"
    let canal = await message.guild.createChannel(nome, divisao[1]);
    canal.send("First!")
    return client.emit("embedDescricao",message,"Canal criado com sucesso!",false)
}

exports.configuracao = {
    apenasCriador: false,
    modulo: 'administracao',
    aliases: ['createchannel'],
    permissoesNecessarias: ['MANAGE_CHANNELS'],
    permissoesBot: ['MANAGE_CHANNELS']
};

exports.ajuda = {
    nome: 'criarcanal',
    descricao: 'Convites importantes do Phoenix!.',
    usar: 'criarcanal <nome> `|` <text|voice>',
    exemplos: []
};