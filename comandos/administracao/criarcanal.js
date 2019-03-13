module.exports = new (class CriarCanal {
    constructor(){
            modulo: 'administracao';
            this.aliases = ['createchannel'];
            this.permissoesNecessarias = ['MANAGE_CHANNELS'];
            this.permissoesBot = ['MANAGE_CHANNELS'];
            this.nome = 'criarcanal';
            this.descricao = 'Convites importantes do Phoenix!.';
            this.usar = 'criarcanal <nome> `|` <text|voice>';
            this.exemplos = []
        }

async run(client, message, args) {
    let divisao = args.join(' ').split('|')
    if(!divisao[0]) return client.emit('ajudaComando', message, this)
    if(!divisao[1]) tipo = "text"
    let canal = await message.guild.createChannel(nome, divisao[1]);
    canal.send("First!")
    return client.emit("embedDescricao",message,"Canal criado com sucesso!",false)
}
})