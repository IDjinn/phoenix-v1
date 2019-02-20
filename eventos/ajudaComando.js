
const Discord = require('discord.js')
module.exports = async (message,ajuda,configuracao) => {
    const client = message.client;
    let prefixo = client.servidores[message.guild.id].prefixo || '>'
    //perm = perm.replace('0','Nenhuma!').replace('1','Parceiro').replace('2','Moderador').replace('3','Administrador').replace('4','Apenas o Djinn pode usar esse comando!')
    const embed = new Discord.RichEmbed()
    .setTitle(`Comando ${ajuda.nome}`)   
    .setColor('#ffffff')
    .setDescription("`"+prefixo + ajuda.nome+ "`")
    .addField("**Como Usar:**", `${ajuda.usar}`)
    //.addField("**Permissão Necessária:**", perm)
    .addField("**Outras Formas de usar**", `${configuracao.aliases.join(', ') || 'Nenhuma outra forma de usar :/'}`)
    .addField("**Exemplos**", '`'+ prefixo + ajuda.nome + "` "+ ajuda.exemplos.join('\n`'+ prefixo + ajuda.nome+ '` '))
    message.reply(embed)

}