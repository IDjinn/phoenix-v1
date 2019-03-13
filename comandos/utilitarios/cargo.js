module.exports = new (class Cargo {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='utilitarios';
            this.aliases = ['role'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'cargo';
            this.descricao = 'Veja informações de tal cargo!';
            this.usar = 'cargo @cargo';
            this.exemplos = []
        }
async run(client, message, args) {
    const Discord = require('discord.js')
    const moment = require('moment')
    const role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(r => r.name.match(args.join(" ")))
    if(!role)  return client.zemit("embedDescricao",message,"Mencione um cargo, ou use o ID dele!",true)
    const embed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .addField('❯ Nome', role.name, true)
        .addField('❯ ID', role.id, true)
        .addField('❯ Cor', role.hexColor.toUpperCase(), true)
        .addField('❯ Criado em', moment.utc(role.createdAt).format('MM/DD/YYYY h:mm A'), true)
        .addField('❯ Destacado?', role.hoist ? 'Sim' : 'Não', true)
        .addField('❯ Mencionável?', role.mentionable ? 'Sim' : 'Não', true)
        .addField('❯ Membros com esse cargo', role.members.size, true)
    return message.reply(embed);
}
})