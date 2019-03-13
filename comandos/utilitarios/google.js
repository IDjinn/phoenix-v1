module.exports = new (class Google {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='utilitarios';
            this.aliases = [];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'google';
            this.descricao = 'Pesquise algo no google!';
            this.usar = 'google <texto>';
            this.exemplos = ['bitcoin','novelas globo']
        }
async run(client, message, args) {
   if(!args[0]) return client.emit("embedDescricao",message,"Coloque uma mensagem válida!",true)
   return client.emit("ezmbedDescricao",message,"https://permita.me/?q="+args.join('+'),false)
}
})