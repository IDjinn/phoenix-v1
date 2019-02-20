
const mc = require("mc-ping-updated");
exports.run = async function(client, message, args) {
    let argumentos = args.slice(1)
if(message.content.match(":")){
    args[0] = argumentos[0];
    args[1] = argumentos[1];
}
mc(args[0], args[1], function(err, res) {
    if (err) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
    else {
        let abc = '';
        if (res.players.online > 0) return client.emit("embedDescricao",message,'O servidor '+ args[0] +' tem atualmente ' + res.players.online + ' / ' + res.players.max + ' jogadore(s) online',false)
        else return client.emit("embedDescricao",message,'O servidor não tem nenhum jogador online!',false)
    }
}, 3000);
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'jogos',
    aliases: ['servidormc'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'mcquery',
    descricao: 'Verifique status de um servidor Minecraft.',
    usar: 'mcquery [ip/ip:porta]',
    exemplos: ['mc.hypixel.net','meuip:25565']
};