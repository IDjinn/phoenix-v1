exports.run = async function(client, message, args) {
   if(!args[0]) return client.emit("embedDescricao",message,"Coloque uma mensagem válida!",true)
   return client.emit("embedDescricao",message,"https://permita.me/?q="+args.join('+'),false)
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'utilitarios',
    aliases: [],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'google',
    descricao: 'Pesquise algo no google!',
    usar: 'google <texto>',
    exemplos: ['bitcoin','novelas globo']
};