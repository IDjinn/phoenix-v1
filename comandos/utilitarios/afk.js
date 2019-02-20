exports.run = async function(client, message, args) {
    let motivo = args.join(" ")
    if(!motivo) motivo = "Motivo não expecificado!"
    client.afk[message.author.id] = {
        usuario: message.author,
        motivo: motivo
    }
    message.user.dados.motivoAfk = motivo
    await Usuarios.findOneAndUpdate({id: message.author.id},{motivoAfk: motivo}, {upsert: false})
    client.emit("embedDescricao",message,"Você agora está afk por `" + motivo + "`, ao falar no chat sairá do modo afk!",false)
}

const Usuarios = require('../../database/usuario')

exports.configuracao = {
    apenasCriador: false,
    modulo: 'utilitarios',
    aliases: [],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'afk',
    descricao: 'Fica ausente',
    usar: 'afk [motivo]',
    exemplos: ['fazer miojo','comprar pão']
};