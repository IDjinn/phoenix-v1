exports.run = async function(client, message, args) {
    if(message.author.id == '376460601909706773'){
    if (args.join(' ').startsWith('http')){
    client.user.setAvatar(args.join(' '));
    return client.emit("embedDescricao",message,'Avatar alterado para `' + args.join(' ') + '`!',false);}
    else{ return client.emit('ajudaComando', message, this.ajuda, this.configuracao);}}
}
exports.configuracao = {
    apenasCriador: true,
    modulo: 'especiais',
    aliases: ['definiravatar'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'setavatar',
    descricao: 'Comando do criador',
    usar: 'setavatar [link]'
};