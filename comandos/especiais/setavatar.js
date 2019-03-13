module.exports = new (class SetAvatar {
    constructor(){
            this.apenasCriador = true;
            this.modulo ='especiais';
            this.aliases = ['definiravatar'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'setavatar';
            this.descricao = 'Comando do criador';
            this.usar = 'setavatar [link]'
        }
async run(client, message, args) {
    if(message.author.id == '376460601909706773'){
    if (args.join(' ').startsWith('http')){
    client.user.setAvatar(args.join(' '));
    return client.emit("embedDescricao",message,'Avatar alterado para `' + args.join(' ') + '`!',false);}
    else{ return client.emit('ajudaComando', message, this)}}
}
})