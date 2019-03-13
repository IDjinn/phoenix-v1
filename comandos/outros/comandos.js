const Discord = require('discord.js');
const permissoes = require('../../utilitarios/permissoes.json')
const util = require('../../utilitarios/util.js')
module.exports = new (class Comandos {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='outros',
            this.aliases = ['comand','commands','cmds','comando'],
            this.permissoesNecessarias = [],
            this.permissoesBot = [],
            this.nome = 'comandos',
            this.descricao = 'Mostra todos os comandos do Phoenix.',
            this.usar = 'comandos',
            this.exemplos = []
        }

async run(client, message, args) {
    if(message.author.id != '376460601909706773') return message.reply("Desculpe, mas atualmente esse comando está desativado!")
    let prefixo = client.servidores[message.guild.id].prefixo || ">"
    const embed = new Discord.RichEmbed()
    .setTitle(`Ajuda ${client.user.username}`)   
    .setColor('#ffffff')
    .setDescription(`\nOlá ${message.author.username}, eu sou o ${client.user.tag} um bot em desenvolvimento. Veja todos os meus comandos:`)
    .addField("Diversão",`${await client.Diversao.comandos}`)
    .addField('Moderação',`${await client.Moderacao.comandos}`)
    .addField('Administração',`${await client.Administracao.comandos}`)
    .addField("Utilitários",`${await client.Utilitarios.comandos}`)
    .addField("Photoshop",`${await client.Imagens.comandos}`)
    .addField("Jogos",`${await client.Jogos.comandos}`)
    .addField("Música",`Em breve.`)//${await client.Musica.comandos}
    .addField("Economia",`${await client.Economia.comandos}`)// client.Economia.comandos
    .addField("Outros",`${await client.Outros.comandos}`)
    .addBlankField()
    .addField("Não encontrou o que precisa?",`Caso tenha acabado de me adicionar, use o comando ${prefixo}tutorial para obter mais informações.`)
    
    const criador = new Discord.RichEmbed()
        .setTitle(`Ajuda ${client.user.username}`)   
        .setColor('#ffffff')
        .setDescription(`\nOlá ${message.author.username}, eu sou o ${client.user.tag} um bot em desenvolvimento. Veja todos os meus comandos:`)         
        .addField("Diversão",`${await client.Diversao.comandos}`)
        .addField('Moderação',`${await client.Moderacao.comandos}`)
        .addField('Administração',`${await client.Administracao.comandos}`)
        .addField("Utilitários",`${await client.Utilitarios.comandos}`)
        .addField("Photoshop",`${await client.Imagens.comandos}`)
        .addField("Jogos",`${await client.Jogos.comandos}`)
        .addField("Música",`Em breve.`)//${await client.Musica.comandos}
        .addField("Economia",`Em breve.`)// client.Economia.comandos
        .addField("Outros",`${await client.Outros.comandos}`)
        .addField("Especiais",`${await client.Especiais.comandos}`)
        .addBlankField()
        .addField("Não encontrou o que precisa?",`Caso tenha acabado de me adicionar, use o comando ${prefixo}tutorial para obter mais informações.`)

    let reacao = ['🎉','🛡','⚙','⚒','🎨','🎮','🎧','💰','🔎','💎','⬅']
    await message.author.send(message.author.id == '503239059775422491' ? embed : criador).then(async(m) =>{
        message.reply("Enviei no seu privado!")

    const filter = (reaction, user) => reacao.includes(reaction.emoji.name) && user.id === message.author.id
    const collector = m.createReactionCollector(filter, { time: 60000 });
    collector.on('collect', async r => {
    const embed2 = new Discord.RichEmbed()
    .setTitle(`Ajuda ${client.user.username}`)   
    .setColor('#ffffff')
        switch(r.emoji.name){
            case '🎉':
        embed2.setTitle('Comandos para Diversão') 
        .setDescription(`${client.Diversao.fcmd}`)
        await m.edit(embed2)
        break;

            case '🛡':
        embed2.setTitle('Comandos para Moderação') 
        .setDescription(`${client.Moderacao.fcmd}`)
        await m.edit(embed2)
        break;
            
            case '⚙':
        embed2.setTitle('Comandos para Administração') 
        .setDescription(`${client.Administracao.fcmd}`)
        await m.edit(embed2)
        break;
            
            case '⚒':
        embed2.setTitle('Comandos Utilitários') 
        .setDescription(`${client.Utilitarios.fcmd}`)
        await m.edit(embed2)
        break;
            
            case '🎨':
        embed2.setTitle('Comandos de Edição de Imagem') 
        .setDescription(`${client.Imagens.fcmd}`)
        await m.edit(embed2)
        break;
            
            case '🎮':
        embed2.setTitle('Comandos para Jogos') 
        .setDescription(`${client.Jogos.fcmd}`)
        await m.edit(embed2)
        break;
            
            case '🎧':
        embed2.setTitle('Comandos para Música') 
        .setDescription(`Em Breve.`)
        await m.edit(embed2)
        break;
            
            case '💰':
        embed2.setTitle('Comandos para Economia') 
        .setDescription(`Em breve.`)
        await m.edit(embed2)
        break;
            
            case '🔎':
        embed2.setTitle('Outros Comandos') 
        .setDescription(`${client.Outros.fcmd}`)
        await m.edit(embed2)
        break;
            
            case '💎':
        embed2.setTitle('Comandos Especiais') 
        .setDescription(`${client.Especiais.fcmd}`)
        await m.edit(embed2)
        break;
            
            case '⬅':
        await m.edit(embed)
            break;
        }   
    })
        for(let r in reacao){
        await  m.react(reacao[r])
        }
    }).catch(e => {if(e.code == 50007)message.reply("Parece que sua DM está desativada, para usar esse comando, desbloqueie ela para mim ;)")})
}   
})