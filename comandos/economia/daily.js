const Discord = require('discord.js');
const util = require('../../utilitarios/util.js')
const Usuarios = require('../../database/usuario.js')
module.exports = new (class Daily {
    constructor(){
            this.apenasCriador = true;
            this.modulo ='economia';
            this.aliases = ['recompensadiaria','diaria'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'daily';
            this.descricao = 'Moedas todos os dias';
            this.usar = 'daily';
            this.exemplos = []
        }

async run(client, message, args) {
    //const servidor = await extras.Servidor(message.guild.id,client)
    let moedas = ((Math.random() * 10 ) + 1)
    moedas = await moedas.toFixed(0)
    let usuario = message.author.dados.recompensas.diaria

    var segundos = (usuario.tempo - Date.now()) / 1000
    var dias = Math.floor(segundos / (3600*24));
    segundos  -= dias*3600*24;
    var horas   = Math.floor(segundos / 3600);
    segundos  -= horas*3600;
    var minutos = Math.floor(segundos / 60);
    segundos  -= minutos*60;



    if(Date.now() > usuario.tempo){
    moedas = moedas + (moedas * usuario.bonus)

    if(usuario.record > moedas){
        moedas = moedas + (moedas * 2)
        await util.transacao(message.guild.id,message,message,0,moedas)
        const embed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setThumbnail("https://thebitcoinpub-91d3.kxcdn.com/uploads/default/original/2X/0/003de396bae5f4267b5fa7b2e93d513f0d0c6c01.gif")
        .setDescription(`Você acaba de bater seu próprio record e ganhou **${moedas}** de presente diário, com um bônus de ${usuario.bonus + 1}%!\n\nAgora você tem \`${message.member.local.moedas}\` moedas!`)
        message.reply(embed) 
        return 
    }
    else{
    await util.transacao(message.guild.id,message,message,0,moedas)
    const embed = new Discord.RichEmbed()
    .setColor('#ffffff')
    .setThumbnail("https://thebitcoinpub-91d3.kxcdn.com/uploads/default/original/2X/0/003de396bae5f4267b5fa7b2e93d513f0d0c6c01.gif")
    .setDescription(`Você acaba de ganhar **${await moedas}** de presente diário, com um bônus de ${usuario.bonus}%!\n\nAgora você tem \`${message.member.local.moedas}\` moedas!`)
    message.reply(embed) 
    return
    }}
    else{
        const embed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setDescription(`Ainda falta **${dias} dias, ${horas} horas e ${segundos.toFixed(0)} segundos** para receber o presente diário!`)
        .setThumbnail("https://thebitcoinpub-91d3.kxcdn.com/uploads/default/original/2X/0/003de396bae5f4267b5fa7b2e93d513f0d0c6c01.gif")
        message.reply(embed) 
        return
    }
}
})