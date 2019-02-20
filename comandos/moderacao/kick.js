const Discord = require('discord.js');
const util = require('../../utilitarios/util.js')
exports.run = async function(client, message, args) {
    const membro = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!membro) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
    if(membro == message.member) return client.emit("embedDescricao",message,"Você não pode usar esse comando em sí mesmo.",true)
    let motivo = args.slice(1).join(" ")
    if(!motivo) motivo = 'Motivo não expecificado!'
    
    await message.channel.send(`Você deseja mesmo expulsar <@${membro.id}>? Caso sim, clique no <:correto:538036543080890368>, caso não, clique no <:incorreto:538036569060278273>!`)
    .then(async m =>{
        let emoji1 = await client.emojis.get('538036543080890368')
        let emoji2 = await client.emojis.get('538036569060278273')
        await m.react(emoji1)
        await m.react(emoji2)
        
        let reacao = ['538036543080890368','538036569060278273']
        const filter = (reaction, user) => reacao.includes(reaction.emoji.id) && user.id === message.author.id
        const collector = m.createReactionCollector(filter, { time: 15000 });
        collector.on('collect', async r => {
            if(r.emoji.id == '538036569060278273') {
                m.delete().catch()
                return client.emit("embedDescricao",message,"Operação cancelada!",true)
            }
            else if(r.emoji.id == '538036543080890368'){
            m.delete().catch()
                membro.kick(motivo);
                const embed = new Discord.RichEmbed()
                .setTitle('Expulsão')   
                .setColor('#ffffff')
                .setDescription('<:martelodoban:531220056554733578> | O usuário ' + membro + ' foi **expulso**.\n\n**Motivo:** \`' + motivo + '.\`')
                .setFooter(`${message.author.tag}`, ` ${message.author.avatarURL}`)
                .setTimestamp()
                message.channel.send(embed)
                //try{client.channels.get(client.servidores[message.guild.id].logs).send(embed)}catch{}
        util.punir(message.guild.id, membro.id, motivo, message.author.id, 1, 'false', client)
            }
        })
    })
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'moderacao',
    aliases: ['expulsar'],
    permissoesNecessarias: ['KICK_MEMBERS'],
    permissoesBot: ['KICK_MEMBERS']
};

exports.ajuda = {
    nome: 'kick',
    descricao: 'Explusa o usuário do servidor.',
    usar: 'kick [usuário] [motivo]',
    exemplos: ['@Djinn ser bonito','342433822710693889 porque sim']
};