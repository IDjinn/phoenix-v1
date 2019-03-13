module.exports = new (class Convite {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='outros';
            this.aliases = [];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'convite';
            this.descricao = 'Convites importantes do Phoenix!.';
            this.usar = 'convite';
            this.exemplos = []
        }
async run(client, message, args) {
    return client.emit("embedDescricao",message,`\nMe adicione: **[Clique Aqui](https://discordapp.com/oauth2/authorize?client_id=503239059775422491&scope=bot&permissions=8)** Convite do Servidor de Suporte: **[Convite](https://discord.gg/AFkv9rk)**`,false)
}
})