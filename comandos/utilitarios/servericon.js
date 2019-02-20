const Discord = require('discord.js')

exports.run = async function(client, message, args) {
    let guild = client.guilds.get(args[0]) || message.guild
    const embed = new Discord.RichEmbed()
    .setColor('#ffffff')
    .setDescription('Ícone do servidor ' + guild.name)
    .setImage(guild.iconURL)
    .setTimestamp()
    return message.reply(embed)
}

exports.configuracao = {
    apenasCriador: false,
    modulo: 'utilitarios',
    aliases: ['guildicon'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'servericon',
    descricao: 'Envia o ícone do servidor!',
    usar: 'servericon',
    exemplos: []
};