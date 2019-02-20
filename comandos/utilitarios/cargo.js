exports.run = async function(client, message, args) {
    const Discord = require('discord.js')
    const moment = require('moment')
    const role = message.mentions.roles.first() || message.guild.roles.get(args.join(" "))
    if(!role)  return client.emit("embedDescricao",message,"Mencione um cargo, ou use o ID dele!",true)
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
exports.configuracao = {
    apenasCriador: false,
    modulo: 'utilitarios',
    aliases: ['role'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'cargo',
    descricao: 'Veja informações de tal cargo!',
    usar: 'cargo @cargo',
    exemplos: []
};