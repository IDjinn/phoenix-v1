module.exports = new (class Status {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='outros';
            this.aliases = ['botinfo','info','infobot','estatisticas'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'status';
            this.descricao = 'Verifique meu desempenho!';
            this.usar = 'status';
            this.exemplos = []
        }
async run(client, message, args) {
    const Discord = require('discord.js');
    var readyAt = client.readyAt.toString().split(' ');
    var visto = 'Dizza ' + readyAt[2] + ' de ' + readyAt[1] + ' de ' + readyAt[3] + '.'
    var segundos = Math.floor(process.uptime() % 60)
    var minutos = Math.floor(process.uptime() / 60 % 60)
    var hora = Math.floor(process.uptime() / 3600)
    var ping = Math.round(client.ping)
    let ram = process.memoryUsage().heapUsed 
    ram = ram / 1000 / 1000
    ram = ram.toFixed(0)

const embed = new Discord.RichEmbed()
.setTitle('Informações')   
.setColor('#ffffff')
.setDescription(`\nOlá ${message.author.username}, eu sou o ${client.user.tag} um bot em desenvolvimento.\n\nFui criado por Djinn#0760, e estou sempre recebendo upgrades!
A linguagem em que fui programado é Javascript, usando o Discord.js. Estou em ${client.guilds.size} servidores, conheço ${client.users.size} pessoas e ${client.channels.size} canais!
Executei ${client.comandosExe} comandos até agora, e estou acordado faz ${hora}:${minutos}:${segundos} segundos! Veja outras informações:`)
.addField('Extras',`Ping: ${ping} ms\nRAM: ` + ram + ` MB`, true)
.addBlankField()    
//.addField('<:convite:411883530868621314> Convite', '**[Clique aqui](https://discordapp.com/oauth2/authorize?client_id=411281290634199042&scope=bot&permissions=2146958591)**', true)
.addField('Servidor', '**[Clique aqui](https://discord.gg/AFkv9rk)**', true)
.addField('Me adicione', '**[Clique Aqui](https://discordapp.com/oauth2/authorize?client_id=503239059775422491&scope=bot&permissions=8)**', true)
.addBlankField()
.setTimestamp()
.setFooter(`${message.author.tag} • ` + visto , ` ${message.author.avatarURL}`)
message.channel.send(embed)
}
})