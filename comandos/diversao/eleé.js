module.exports = new (class EleE {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='diversao';
            this.aliases = ['heis','elee'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'eleé';
            this.descricao = 'Ele é ??% alguma coisa!';
            this.usar = 'eleé <algo>';
            this.exemplos = ['@Djinn lindo']
        }
async run(client, message, args) {
    const Discord = require('discord.js');
    let mencao = message.mentions.users.first() || client.users.get(args[0]) 
    if(!mencao) return client.emit('ajudaComando', message, this)
        let mensagem = args.slice(1).join(" ");
        let porcentagem = Math.floor((Math.random() * 100) + 1)
        const embed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setTitle(`Ele é...`)
        .setThumbnail(mencao.displayAvatarURL)
        .setDescription(`${mencao} é ${porcentagem}% ${mensagem}`)
        message.reply(embed)
        return;
}
})