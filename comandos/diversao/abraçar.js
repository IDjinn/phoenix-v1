module.exports = new (class Abracar {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='diversao';
            this.aliases = ['abraço','abraco','abracar'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [] ;
            this.nome = 'abraçar';
            this.descricao = 'Abraça alguém >.<';
            this.usar = 'abraçar [usuário]';
            this.exemplos = ['@Djinn','376460601909706773']
        }
async run(client, message, args) {
const Discord = require('discord.js');
var huge = ['https://cdn.discordapp.com/attachments/414768514512060417/414768524704219136/tumblr_o4gzpr5Da11vnh6hco1_500.png']
var gif = huge[Math.floor(Math.random() * huge.length)];
var frases = ['abraçou ', 'agarrou ']
var frase = frases[Math.floor(Math.random() * frases.length)];
const user = message.mentions.users.first() || client.users.get(args[0])  || 'ninguém'
if(user == "ninguém") gif = "https://media.discordapp.net/attachments/515689004281364534/516320549027446806/giphy.gif?width=400&height=162"
const embed = new Discord.RichEmbed()
.setColor('#ffffff')
.setDescription(`${message.author.username} ${frase}${user}`)
.setImage(gif)
message.channel.send(embed)
}
})