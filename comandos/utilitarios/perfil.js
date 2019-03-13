const Discord = require('discord.js');
const constantes = require('../../utilitarios/constantes.js')
const getXp = (nivel) => Math.floor(((nivel / 0.2) * (nivel / 0.3)) * Math.PI)
module.exports = new (class Perfil {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='utilitarios';
            this.aliases = ['profile'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome ='perfil';
            this.descricao = 'Veja o perfil de alguém!';
            this.usar = 'perfil <@usuário>';
            this.exemplos = ['@Djinn','376460601909706773']
        }
async run(clienzt, message, args) {

    let mencionado = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member
    let vip = 'Não é VIP!'
    if(mencionado.vip) vip = `Especial de carteirinha!`
    let porcentagem = (mencionado.xp / (getXp(mencionado.level + 1))) * 100
    
    if(mencionado.vip == true){
    const embed = new Discord.RichEmbed()
    .setTitle('Perfil')   
    .setColor('#ffffff')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`Perfil de ${mencionado.username}`)
    .addField('🔰 Nome', `\`\`\`python\n${mencionado.tag}\`\`\``, true)
    .addField('⬆ Nível',`\`\`\`python\n${mencionado.level}\`\`\``, true)
    .addField('<:VIP:519507010698608641> VIP',`\`\`\`python\n${vip}\`\`\``, true)
    .addField(constantes.assets.emojis.exp + ' Experiência', `\`\`\`python\n${mencionado.xp} (${porcentagem.toFixed(1)}%)\`\`\``, true)
    .addField('<:moeda:512245730098937867> Moedas', `\`\`\`python\n${mencionado.moedas}\`\`\``, true)
    .addField(constantes.assets.emojis.like + ' Reputação', `\`\`\`python\n${mencionado.rep}\`\`\``, true)
    .addField(constantes.assets.emojis.heart + ' Sobre Mim:', `\`\`\`python\n${mencionado.sobremim}\`\`\``, true)
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp()
    message.reply({embed})
    }
    else{
        const embed = new Discord.RichEmbed()
        .setTitle('Perfil')   
        .setColor('#ffffff')
        .setThumbnail(message.author.avatarURL)
        .setDescription(`Perfil de ${mencionado.username}`)
        .addField('🔰 Nome', `\`\`\`python\n${mencionado.tag}\`\`\``, true)
        .addField('⬆ Nível',`\`\`\`python\n${mencionado.level}\`\`\``, true)
        .addField(constantes.assets.emojis.exp + ' Experiência', `\`\`\`python\n${mencionado.xp} (${porcentagem.toFixed(1)}%)\`\`\``, true)
        .addField('<:moeda:512245730098937867> Moedas', `\`\`\`python\n${mencionado.moedas}\`\`\``, true)
        .addField(constantes.assets.emojis.like + ' Reputação', `\`\`\`python\n${mencionado.rep}\`\`\``, true)
        .addField(constantes.assets.emojis.heart + ' Sobre Mim:', `\`\`\`python\n${mencionado.sobremim}\`\`\``, true)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp()
        message.reply({embed})
    }
    if(!mencionado)return client.emit("embedDescricao",message,"Desconheço essa pessoa! :(",true)
}
})