const Discord = require('discord.js')
module.exports = new (class ServerIcon {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='utilitarios';
            this.aliases = ['guildicon'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'servericon';
            this.descricao = 'Envia o ícone do servidor!';
            this.usar = 'servericon [servidor]';
            this.exemplos = []
        }
async run(client, message, args) {
    let guild = client.guilds.get(args[0]) || message.guild
    const embed = new Discord.RichEmbed()
    .setColor('#ffffff')
    .setDescription('Ícone do servidor ' + guild.name)
    .setImage(guild.iconURL)
    .setTimestamp()
    return message.reply(embed)
}
})