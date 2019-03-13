const index = require('../../index.js')
module.exports = new (class RealoadAll {
    constructor(){
            this.apenasCriador = true;
            this.modulo ='especiais';
            this.aliases = ['recarregartudo'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'reloadall';
            this.descricao = 'Recarrega totalmente o Bot.';
            this.usar = 'reloadall';
            this.exemplos = ['']
        }

async run(client, message, args) {
    const settings = client.settings
    await client.emit("embedDescricao",message,"Reiniciando...",false)
    client.destroy()
    await index.atualizarComandos()
    await index.cache()
    if(settings.beta) await client.login(settings.token2)
    else client.login(settings.token1)
    return client.emit("embedDescricao",message,"Reiniciado com sucesso!",false)
} 
})