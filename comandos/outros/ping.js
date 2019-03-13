module.exports = new (class Ping {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='outros';
            this.aliases = [];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'ping';
            this.descricao = 'Verifique o meu ping!';
            this.usar = 'ping';
            this.exemplos = []
        }
async run(client, message, args) {
    return client.emit("embedDescricao",message,'**Pong!** ' + Math.round(client.ping),false);;
}
})