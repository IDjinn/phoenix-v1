module.exports = new (class UserInfo {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='utilitarios';
            this.aliases = [];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'userinfo';
            this.descricao = 'Mostra informações do usuário.';
            this.usar = 'userinfo <@usuário>';
            this.exemplos = ['@Djinn']
        }
async run(client, message, args) {
    const Discord = require('discord.js');

    const user = message.mentions.users.first() || client.users.get(args[0]) || client.users.find(u => u.username.match(args.join(" "))) || message.author
    const createdAt = user.createdAt.toString().split(' ');
    const visto = 'Dia ' + createdAt[2] + ' de ' + createdAt[1] + ' de ' + createdAt[3] + '\n as ' + createdAt[4] +  '.' 
    const embed = new Discord.RichEmbed()
    .setColor('#ffffff')
    .setAuthor(user.username, user.avatarURL)
    .setDescription("𝚒𝚗𝚏𝚘𝚛𝚖𝚊çõ𝚎𝚜")
    .setThumbnail(user.avatarURL)
    .addField("Tag do usuário",user.tag, true)
    .addField("ID do usuário",user.id, true)
    .addField(`Cargos`,`${message.member.roles.map(name => name).join(" | ")}`)
    .addField("Conta criada em",visto, true)
    .addField("Última mensagem",user.lastMessage, true)
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp()
    message.channel.send(embed)
    //client.channels.get('411668307037650946').send(`**usuário** ${message.author.tag} \`${message.author.id}\` **guild** ${message.guild} **canal** ${message.channel} **comando** ${message.content}\n- - - - - - - - - - - - - - - - - - - - - - -`)
   
}
})