
const Discord = require('discord.js')
module.exports = async (message,comando) => {
    const client = message.client;
    let prefixo = client.servidores[message.guild.id].prefixo || '>'
    //perm = perm.replace('0','Nenhuma!').replace('1','Parceiro').replace('2','Moderador').replace('3','Administrador').replace('4','Apenas o Djinn pode usar esse comando!')
    const embed = new Discord.RichEmbed()
    .setTitle(`Comando ${comando.nome}`)   
    .setColor('#ffffff')
    .setDescription("`"+prefixo + comando.nome+ "`")
    .addField("**Como Usar:**", `${comando.usar}`)
    //.addField("**Permissão Necessária:**", perm)
    .addField("**Outras Formas de usar**", `${comando.aliases.join(', ') || 'Nenhuma outra forma de usar :/'}`)
    .addField("**Exemplos**", '`'+ prefixo + comando.nome + "` "+ comando.exemplos.join('\n`'+ prefixo + comando.nome+ '` '))
    message.reply(embed)

}