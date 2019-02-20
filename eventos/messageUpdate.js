
const Discord = require('discord.js')
const extras = require('../utilitarios/extras.js')
const automod = require('../modulos/automod.js')
const comandos = require('../modulos/comandos.js')
module.exports = async (mensagemAntiga, mensagemNova) => {
if(mensagemAntiga.author.bot || !mensagemAntiga.content || !mensagemNova.guild || !mensagemNova.content || (mensagemNova.content == mensagemAntiga.content)) return
	const client = await mensagemAntiga.client;
    let servidor = mensagemNova.guild.dados || client.servidores[mensagemNova.guild.id] || await extras.Servidor(mensagemNova.guild.id,client)
    
    await automod(client,mensagemNova)
    await comandos(mensagemNova)

    let filtradaAntiga = mensagemAntiga.cleanContent;
    filtradaAntiga = filtradaAntiga.replace(/```/g,' ').replace(/||/g, '')
    let filtradaNova = mensagemNova.cleanContent;
    filtradaNova = filtradaNova.replace(/```/g,' ').replace(/||/g, '')
    if(servidor.canais.logs == "false") return
    const embed = new Discord.RichEmbed()
        .setTitle('Mensagem Editada')   
        .setColor('#ffffff')
        .setThumbnail(mensagemAntiga.member.avatarURL)
        .setDescription(`${mensagemAntiga.author.tag} editou uma mensagem no canal <#${mensagemAntiga.channel.id}>.\n\nConteúdo Antigo:\n\`\`\`${filtradaAntiga}\`\`\`\n\nConteúdo Atual: \`\`\`${filtradaNova}\`\`\``)
        .setFooter(mensagemAntiga.author.tag, mensagemAntiga.author.avatarURL)
        .setTimestamp()

            try{client.channels.get(servidor.canais.logs).send(embed)}catch{return}

}