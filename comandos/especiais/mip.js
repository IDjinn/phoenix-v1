const Discord = require('discord.js');
const Banimentos = require('../../database/banimentos.js')
exports.run = async function(client, message, args) {
	
    let motivo = args.slice(2).join(' ')
    if(!motivo) motivo = "Não expecificado!"
if(message.author.id != '376460601909706773') return;
    if(args[1] == "servidor"){
        const Banido = new Banimentos({
            id: args[1],
            motivo: motivo,
            tipo: 3,
            data: Date.now(),
            staff: message.author.id
        })
        Banido.save()

        let guild = client.guilds.get(args[0])
        const embed = new Discord.RichEmbed()
            .setAuthor(message.member.user.tag, message.member.user.avatarURL)
            .setTitle(`Servidor ${args[0]} foi banido!`)   
            .setColor('#ffffff')
            .setDescription(`O servidor ${args[0]} acaba de ser banido de usar o ${client.user.tag}!\n\nMotivo: ${motivo}`)
            .setTimestamp()
            message.reply(embed)
            await guild.leave().catch().then(() =>{
            message.reply("Sai desse servidor com sucesso!").then(m => m.delete(3000)).catch()
            }).catch(message.reply("Ocorreu um erro ao sair desse servidor!"))
}
    
if(args[1] == "nemo"){
    const Banido = new Banimentos({
        id: args[1],
        motivo: motivo,
        tipo: 1,
        data: Date.now(),
        staff: message.author.id
    })
    Banido.save()
    const embed = new Discord.RichEmbed()
        .setAuthor(message.member.user.tag, message.member.user.avatarURL)
        .setTitle(`Membro ${args[0]} foi banido!`)   
        .setColor('#ffffff')
        .setDescription(`O membro ${args[0]} acaba de ser banido de usar o ${client.user.tag}!\n\nMotivo: ${motivo}`)
        .setTimestamp()
        message.reply(embed)
}
    
if(args[1] == "global"){
    const Banido = new Banimentos({
        id: args[1],
        motivo: motivo,
        tipo: 2,
        data: Date.now(),
        staff: message.author.id
    })
    Banido.save()

    const embed = new Discord.RichEmbed()
        .setAuthor(message.member.user.tag, message.member.user.avatarURL)
        .setTitle(`Membro ${args[0]} foi banido!`)   
        .setColor('#ffffff')
        .setDescription(`O membro ${args[0]} acaba de ser banido globalmente!\n\nMotivo: ${motivo}`)
        .setTimestamp()
        message.reply(embed)
        let a = 0
        for(let g in client.guilds){
            if(!client.servidores[g.id]) continue
            if(client.servidores[g.id].automod){
                await g.members.get(args[0]).ban(motivo)
                a = a + 1
            }
        };
        message.reply("Banido em " + a + " servidores!")
}
    const index = require('../../index.js')
    await index.cache()
    message.channel.send("Banimentos recarregados!")
}
exports.configuracao = {
    apenasCriador: true,
    modulo: 'especiais',
    aliases: [],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'mip',
    descricao: 'Uso do criador',
    usar: 'mip [args]',
    exemplos: ['beeps e boops']
};