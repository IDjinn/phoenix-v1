module.exports = new (class Avatar {
    constructor(){
            this.apenasCriador = false;
            this.modulo = 'utilitarios';
            this.aliases = [];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'avatar';
            this.descricao = 'Mostra a imagem de avatar do usuário.';
            this.usar = 'avatar [usuário]';
            this.exemplos = ['@Djinn']
        }
async run(client, message, args) {
    const Discord = require('discord.js')
    const membro = message.mentions.users.first() || client.users.get(args[0]) || message.author
    const embed = new Discord.RichEmbed()
    .setTitle('Avatar')   
    .setColor('#ffffff')
    .setImage(membro.displayAvatarURL)
    .setDescription(`Avatar de ${membro}`)
    .setFooter(`${message.author.tag}`, ` ${message.author.displayAvatarURL}`)
    .setTimestamp()
    message.reply(embed)
    }
})