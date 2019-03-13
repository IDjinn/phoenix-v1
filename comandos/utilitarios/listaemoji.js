module.exports = new (class ListaEmoji {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='utilitarios';
            this.aliases = ['emojilista'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'listaemoji';
            this.descricao = 'Lista todos os emojis do servidor';
            this.usar = 'listaemoji';
            this.exemplos = []
        }
async run(client, message, args) {
    const emojiList = message.guild.emojis.map((e, x) => 'Id: `' + (x + '` = ' + e) + ' | Nome: `' +e.name + '`').join('\n');
    message.channel.send(await emojiList);
}
})