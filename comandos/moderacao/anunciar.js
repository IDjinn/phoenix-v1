exports.run = async function(client, message, args) {
    const Discord = require('discord.js');
    let canal = message.mentions.channels.first() || client.channels.get(args[0])
    if(!canal){
        canal = message.channel
    }
    if(args[0] == null || args[0] == ""){
        return client.emit("embedDescricao",message,"Falta o título!",true)
    }
    else if(args[1] == null || args[1] == ""){
        return client.emit("embedDescricao",message,"Para separar o título da descrição, use `|`!",true)   
    }
    let aaa = args.join(" ");
    let lol = aaa.split("|");
    const embed = new Discord.RichEmbed()
    .setTitle(`${lol[0]}`)   
    .setColor('#ffffff')
    .setDescription(`${lol[1]}`)
    .setFooter(`${message.author.tag}`, ` ${message.author.avatarURL}`)
    .setTimestamp()
    canal.send({embed}).catch(async a =>{
        return client.emit("embedDescricao",message,"Oops, Parece que não tenho permissão de enviar mensagens lá!",true)   
    })
    return client.emit("embedDescricao",message,"Enviado com sucesso!",false)
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'moderacao',
    aliases: ['anuncio','announce'],
    permissoesNecessarias: ['MANAGE_MESSAGES','KICK_MEMBERS','BAN_MEMBERS'],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'anunciar',
    descricao: 'Anuncie no seu servidor, enviando um embed para o Canal de Anúncios.',
    usar: 'anunciar [título] `|` [descrição]',
    exemplos: ['Novidades no Servidor | Agora o Phoenix Bot foi adicionao ao servidor.','Novidade | Agora temos queijo no canal #queijos!']
};