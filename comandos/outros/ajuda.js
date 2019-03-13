
const Discord = require('discord.js');
const permissoes = require('../../utilitarios/permissoes.json')
const util = require('../../utilitarios/util.js')
const constantes =require('../../utilitarios/constantes.js')
const embedAjuda = (message) => {
    const embedajuda = new Discord.RichEmbed()
    .setTitle(`${message.author.username}, está precisando de ajuda com os comandos?`)
    .setDescription(`Para ver todos os meus comandos, use \`>comandos\`, mas se quiser ver como usar um certo comando então use o \`>ajuda <comando>\`!`)
    .setColor('#ffffff')
    return embedajuda
}
module.exports = new (class Ajuda {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='outros';
            this.aliases = ['help'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'ajuda';
            this.descricao = 'Mostra informações sobre um comando expecífico.';
            this.usar = 'ajuda <comando>';
            this.exemplos = ['ping','ticket','cargo']
        }
async run(client, message, args) {
    let prefixo = client.servidores[message.guild.id].prefixo || ">"
    let comando = args[0]
    comando = client.comandos.get(comando) || client.comandos.get(client.aliases.get(comando));
    if(!comando) return message.reply(await embedAjuda(message))

    let perm = " "
    for(let i in comando.permissoesNecessarias){
        let tem = false
        let permicoes = comando.permissoesNecessarias[i]
        if(permicoes != 'MOD' && permicoes != 'ADM') if(message.channel.permissionsFor(message.member).has(permicoes,true)) tem = true
        else if(message.member.permissoesServidor > 0) tem = true
        if(tem)perm = perm + " | " + constantes.assets.emojis.correto + permissoes[permicoes] + ","
        else perm = perm + " | " + constantes.assets.emojis.incorreto + permissoes[permicoes] + ","
    }
    let botPerm = " "
    for(let i in comando.permissoesBot){
        let tenho = false
        let permicoes = comando.permissoesBot[i]
        if(message.channel.permissionsFor(message.guild.me).has(permicoes,true)) tenho = true
        if(tenho) botPerm = botPerm + " | " + constantes.assets.emojis.correto + permissoes[permicoes] + ","
        else botPerm = botPerm + " | " + constantes.assets.emojis.incorreto + permissoes[permicoes] + ","
    }
    if(perm == " ") perm = "Nenhuma permissão necessária!"
    if(botPerm == " ") botPerm = "Nenhuma permissão necessária!"
    
    const embed = new Discord.RichEmbed()
    .setTitle(`Comando ${comando.nome}`)   
    .setColor('#ffffff')
    .setDescription("`"+prefixo + comando.nome+ "`   ")
    .addField("**Descrição:**", `${comando.descricao}   `)
    .addField("**Como Usar:**", `${comando.uda.usar}   `)
    .addField("**Permissão Necessária:**", `${perm}   `)
    .addField("**Minhas Permissões Necessárias:**", `${botPerm}   `)
    .addField("**Outras Formas de usar**", `${comando.aliases.length > 0 ? comando.aliases.join(', ') : 'Nenhuma outra forma de usar :/'}   `)
    .addField("**Exemplos**", '`'+ prefixo + comando.nome + "` "+ comando.exemplos.join('\n`'+ prefixo + comando.nome+ '` ') + "   ")
    message.reply(embed)

}
})