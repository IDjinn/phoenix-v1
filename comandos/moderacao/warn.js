const Discord = require('discord.js');
const util = require('../../utilitarios/util.js')
const Punicoes = require('../../database/punicoes.js')
module.exports = new (class Warn {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='moderacao';
            this.aliases = ['avisar','aviso'];
            this.permissoesNecessarias = ['MOD'];
            this.permissoesBot = [];
            this.nome = 'warn';
            this.descricao = 'Dê uma advertência à alguém!';
            this.usar = 'warn <@usuário> [motivo]';
            this.exemplos = ['@Djinn Enviar convites de outros servidores']
        }
async run(client, message, args) {

    let usuario = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!usuario) return client.emit('ajudaComando', message, this)
    if(usuario == message.member) return client.emit("embedDescricao",message,"Você não pode usar esse comando em sí mesmo.",true)
    let motivo = args.slice(1).join(' ')
    if(!motivo) motivo = "Motivo não expecificado!"

    util.punir(message.guild.id, usuario.id, motivo, message.author.id, 4, 'false', client)

    const embed = new Discord.RichEmbed()
    .setColor('#ffffff')
    .setTitle('Usuário Avisado!')
    .setDescription(`Usuário <@${usuario.id}> foi punido por <@${message.author.id}>.\nMotivo: ${motivo}`)
    .setTimestamp()
    message.channel.send(embed)
    
}
})