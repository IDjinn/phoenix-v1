exports.run = async function(client, message, args) {
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
exports.configuracao = {
    apenasCriador: false,
    modulo: 'utilitarios',
    aliases: [],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'avatar',
    descricao: 'Mostra a imagem de avatar do usuário.',
    usar: 'avatar [usuário]',
    exemplos: ['@Djinn']
};