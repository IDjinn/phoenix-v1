module.exports = new (class Canal {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='utilitarios';
            this.aliases = ['channel'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'canal';
            this.descricao = 'Veja informações de tal canal!';
            this.usar = 'canal #canal';
            this.exemplos = []
        }
async run(client, message, args) {
    const Discord = require('discord.js')
    const moment = require('moment')
    const types = {
        dm: 'DM',
        group: 'Grupo DM',
        text: 'Canal de Texto',
        voice: 'Canal de Voz',
        category: 'Categoria',
        unknown: 'Desconhecido'
    };
    const channel = message.mentions.channels.first() || message.guild.channels.get(args[0]) || message.guild.channels.find(c => c.name.match(args.join(' '))) || message.channel
    if(!channel)  return client.emit("embedDescricao",message,"Mencione um canal, use o ID dele ou o nome dele!",true)   
    const embed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .addField('❯ Nome', channel.type === 'dm' ? `@${channel.recipient.username}` : channel.name, true)
        .addField('❯ ID', channel.id, true)
        .addField('❯ NSFW?', channel.nsfw ? 'Sim' : 'Não', true)
        .addField('❯ Categoria', channel.parent ? channel.parent.name : '❯ Nenhum', true)
        .addField('❯ Tipo', types[channel.type], true)
        .addField('❯ Criado em', moment.utc(channel.createdAt).format('MM/DD/YYYY h:mm A'), true)
        .addField('❯ Tópico', channel.topic || '❯ Nenhum');
    return message.reply(embed);
}
})