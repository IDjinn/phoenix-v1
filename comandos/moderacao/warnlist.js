const Discord = require('discord.js');
const moment = require('moment')
exports.run = async function(client, message, args) {
    let membro = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!membro) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
    if(!membro.punicoes) return client.emit("embedDescricao",message,"Esse membro não tem punições!",true)

    let paginas = new Discord.Collection()
    let contador = 0
    let pagina = 0

    await membro.punicoes.forEach(p => {
        const embed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setDescription(`Lista de punições de <@${membro.id}>`)
        let data = Date(p.tempo)
        let tipo = "" + p.tipo 
        tipo = tipo.replace(/4/,'Aviso').replace(/3/,'Clear').replace(/2/,'Mute').replace(/1/,'Expulsão').replace(/0/,'Banimento')
        let removido = "" + p.removidoPor 
        removido = removido.replace(/false/,'Sim').replace(/true/,'Não')
        embed.addField(`Tipo: ${tipo}`,
        `**Motivo:**${p.motivo}\n**Quem Puniu:** <@${p.staff}>\n**Quando:** ${data}\n**Ativo?:** ${removido}\n\n`)
        paginas[pagina] = embed
        pagina += 1
    });
    pagina = 0
    message.channel.send(paginas[pagina]).then(async m =>{
        let reacao = ['➡','⬅']
        await m.react('⬅').catch()
        await m.react('➡').catch()
        const filter = (reaction, user) => reacao.includes(reaction.emoji.name) && user.id === message.author.id
        const collector = m.createReactionCollector(filter, { time: 60000 });
        collector.on('collect', async r => {
            if(r.emoji.name == '⬅') pagina -= 1
            else pagina += 1
            let mensagem = paginas[pagina] ? paginas[pagina] : undefined
            if(!mensagem) {
                pagina = 0
                mensagem = pagina
            }
            await m.edit(paginas[pagina] ? paginas[pagina] : paginas[0])
        })
    })
}
exports.configuracao = {
    apenasCriador: true,
    modulo: 'moderacao',
    aliases: ['listaavisos','listadeavisos'],
    permissoesNecessarias: ['MOD'],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'warnlist',
    descricao: 'Dê uma advertência à alguém!',
    usar: 'warnlist @usuário <motivo>',
    exemplos: []
};