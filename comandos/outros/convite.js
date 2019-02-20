exports.run = async function(client, message, args) {
    return client.emit("embedDescricao",message,`\nMe adicione: **[Clique Aqui](https://discordapp.com/oauth2/authorize?client_id=503239059775422491&scope=bot&permissions=8)** Convite do Servidor de Suporte: **[Convite](https://discord.gg/AFkv9rk)**`,false)
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'outros',
    aliases: [],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'convite',
    descricao: 'Convites importantes do Phoenix!.',
    usar: 'convite',
    exemplos: []
};