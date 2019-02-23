
    const Discord = require('discord.js');
    const Usuario = require('../../database/usuario.js')
exports.run = async function(client, message, args) {
    let argumentos = args.join(" ")
    if(argumentos.length > 0 && argumentos.length < 150){
        const user = Usuario.findOneAndUpdate({id: message.author.id}, {sobremim: argumentos}, {upsert:false}, function(err, s){
            if (err) return message.reply("Ocorreu um erro ao tentar salvar essa configuração!")
           if(s){ client.emit("embedDescricao",message,"Sobre Mim definido para: `" + argumentos, false)
            client.usuarios[message.author.id].sobremim = argumentos
            message.user.dados.sobremim = argumentos
            user.save()
        }
    })}
    else return client.emit('ajudaComando', message, this.ajuda, this.configuracao)
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'utilitarios',
    aliases: ['aboutme'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'sobremim',
    descricao: 'Define uma mensagem sobre você no seu Perfil.',
    usar: 'sobremim [texto]',
    exemplos: ['Eu sou muito legal','Djinn esteve aqui!']
};