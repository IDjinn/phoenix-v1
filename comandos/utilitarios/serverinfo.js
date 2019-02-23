const constantes = require('../../utilitarios/constantes.js')
const Discord = require('discord.js');

exports.run = async function(client, message, args) {
    let servidor = client.guilds.get(args[0]) || message.guild
    var createdAt = servidor.createdAt.toString().split(' ');
    var visto = 'Dia ' + createdAt[2] + ' de ' + createdAt[1] + ' de ' + createdAt[3] + '.' 
    let aa = "" + servidor.verificationLevel
    let protecao =  aa.replace('0','Nenhuma').replace('1','Email Verificado').replace('2','Email verificado e 5 minutos de registro').replace('3','Email verificado, 5 minutos de registro e 10 minutos no servidor').replace('4','Email verificado, 5 minutos de registro, 10 minutos no servidor e telefone verificado')  
    let canais = servidor.channels.filter(c => c.permissionsFor(message.member).has("VIEW_CHANNEL", true)).size
    let on = servidor.members.filter(m => m.presence.status == 'online').size
    let off = servidor.members.filter(m => m.presence.status == 'offline').size
    let dormindo = servidor.members.filter(m => m.presence.status == 'idle').size
    let ocupado = servidor.members.filter(m => m.presence.status == 'dnd').size


    const embed = new Discord.RichEmbed()
    .setColor('#ffffff')
    .setDescription("𝚒𝚗𝚏𝚘𝚛𝚖𝚊çõ𝚎𝚜 do servidor.")
    .setThumbnail(servidor.iconURL)
    .setAuthor(servidor.name)
    .addField('👑 Criador', `<@${servidor.ownerID}>`, true)
    .addField('🔰 ID do Servidor', servidor.id, true)
    .addField('💬 Canais (Que você tem acesso)', canais , true)
    .addField('🔐 Nivel de proteção', protecao, true)
    .addField('👥 Membros',`${constantes.assets.emojis.online} ${on} ${constantes.assets.emojis.offline} ${off} ${constantes.assets.emojis.idle} ${dormindo} ${constantes.assets.emojis.dnd} ${ocupado}`, true)
    .addField('📆 Criado em', visto, true)
    .addField('🛠 Cargos', servidor.roles.size, true)
    .addField('🌎 Região', servidor.region, true)
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp()
    return message.channel.send(embed) 
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'utilitarios',
    aliases: ['guildinfo'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'serverinfo',
    descricao: 'Mostra informações do servidor.',
    usar: 'serverinfo [servidor]',
    exemplos: []
};