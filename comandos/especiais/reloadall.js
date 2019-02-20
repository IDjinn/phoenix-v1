
    const index = require('../../index.js')
    
exports.run = async function(client, message, args) {
    const settings = client.settings
    await client.emit("embedDescricao",message,"Reiniciando...",false)
    client.destroy()
    await index.atualizarComandos()
    await index.cache()
    if(settings.beta) await client.login(settings.token2)
    else client.login(settings.token1)
    return client.emit("embedDescricao",message,"Reiniciado com sucesso!",false)
} 

exports.configuracao = {
    apenasCriador: true,
    modulo: 'especiais',
    aliases: ['recarregartudo'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'reloadall',
    descricao: 'Recarrega totalmente o Bot.',
    usar: 'reloadall',
    exemplos: ['']
};