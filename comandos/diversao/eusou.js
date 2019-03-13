module.exports = new (class EuSou {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='diversao';
            this.aliases = ['iam'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'eusou';
            this.descricao = 'Você é ??% alguma coisa!';
            this.usar = 'eusou <algo>';
            this.exemplos = ['lindo','feliz']
        }
async run(client, message, args) {
    const Discord = require('discord.js');
    let porcentagem = Math.floor((Math.random() * 100) + 1)
    args = args.join(" ")
    if(!args)return client.emit('ajudaComando', message, this)
    const embed = new Discord.RichEmbed()
    .setColor('#ffffff')
    .setTitle(`Você é...`)
    .setThumbnail(message.author.avatarURL)
    .setDescription(`Você é ${porcentagem}% ${args}`)
    message.reply(embed)
    return;
}
})