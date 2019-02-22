/*Anti-Raider
* O Sistema de Auto-Moderação verificará todas as mensagens para ver se o servidor está sofrendo algum modo
* e ataque. Ao atingir 75% de chance, o usuário será banido de todos os servidores até as mensagens serem
* verificadas.
*/


const util = require('../utilitarios/util.js')
const constantes = require('../utilitarios/constantes.js')

const SemAvatar = 0.05 //Quando o usuário está sem avatar
const PoucosServidoresCompartilhados = 1 //Quando o usuário está em poucos servidores compartilhados
const ContaNova = 3 //Quando o usuário foi criado recentemente 
const ContaNovaEntrouAgora = 4 //Quando o usuário foi criado recentemente e entra no servidor

//----------------MENSAGENS----------------//

const MensagemIgual = 3 //Quando o usuário manda mensagens iguais
const MensagensIguaisCanal = 2 //Quando o canal possuí mensagens iguais
const MensagensIguaisQuantidade = 5 // Quando o canal possúi 5 mensagens iguais
const MensagemComLink = 0.3 //Quando o usuário manda mensagem com link
const MensagemComConvite = 0.4 //Quando o usuário manda mensagem com convite
const MensagemTentarMencionarEveryone = 0.4 //Quando o usuário tenta mencionar @here ou @everyone
const MensagemTentarMencionarCargos = 0.2 //Quando o usuário tenta mencionar qualquer tipo de cargo
const MensagemRapida = 0.5 //Quando o usuário envia uma mensagem muuito rápida 
const MensagensSeguidas = 5 //Quando o usuário envia 5 mensagens seguidas
const MensagemComAnexos = 0.05 //Quando o usuário envia anexos
const MensagemComEmojis = 0.2 //Quando o usuário envia anexos
const MensagemComCaracteresRepetidos = 2 // Quando a mensagem tem mais de 5 caracteres repetidos por palavra.

//----------------MULTIPLICADORES----------------//

const MultiplicadorLink = 1.8 //Cada link enviado será multiplicado as % do usuário
const MultiplicadorConvite = 1.9 //Cada convite enviado será multiplicado as % do usuário
const MultiplicadorMencao = 1.5 //Cada menção enviada será multiplicado as % do usuário
const MultiplicadorMensagensIguais = 1.3 //Cada mensagem igual enviada será multiplicado as % do usuário
const MultiplicadorMensagensSeguidas = 1.4 //Acada 5 mensagens seguidas enviadas será multiplicado as % do usuário

const Discord = require('discord.js');


module.exports = async (client, message) => {

//-----------------------------------------------------//

var convitesencontrados = 0
var linksencontrados = 0
var everyonehere = 0
var mencoesenconradas = 0
var Porcentagem = 0

if(!message.author.raider) message.author.raider = {
    porcentagem: 0,
    tempo: Date.now()
}


let tempo = message.author.raider.tempo
Porcentagem = message.author.raider.porcentagem


    //Filtra as Mensagens
    convitesencontrados = message.content.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
    linksencontrados = message.content.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/gi) || []
    mencoesenconradas = (message.mentions.users.size + message.mentions.members.size + message.mentions.roles.size + message.mentions.channels.size)
    everyonehere = (message.content.match("@everyone") || []) + (message.content.match("@here") || [])
    
    convitesencontrados = convitesencontrados.length
    linksencontrados = linksencontrados.length
    everyonehere = everyonehere.length

    if(convitesencontrados == linksencontrados) linksencontrados = 0
    
    //Caso o usuário não tiver avatar...
    let avatar = false
    if(message.author.avatarURL == null) {
        avatar = true
        Porcentagem += SemAvatar
    }//Soma nas %!

    //Caso encontre convite...
    if(convitesencontrados > 1){
        Porcentagem += MensagemComConvite//Seta a porcentagem
        if(convitesencontrados > 5) Porcentagem += (MultiplicadorConvite * convitesencontrados)//Multiplica a porcentagem
    }

    //Caso encontre link...
    if(linksencontrados > 1){
        Porcentagem += MensagemComLink//Seta a porcentagem
        if(linksencontrados > 5) Porcentagem += (MultiplicadorLink * linksencontrados)//Multiplica a porcentagem
    }

    //Caso encontre everyone ou here...
    if(everyonehere > 1){
        Porcentagem += MensagemTentarMencionarEveryone//Seta a porcentagem
        if(everyonehere > 5) Porcentagem += (MultiplicadorMencao * everyonehere)//Multiplica a porcentagem
    }

    //Caso encontre mencoes...
    if(mencoesenconradas > 1){
        Porcentagem += MensagemTentarMencionarCargos//Seta a porcentagem
        if(mencoesenconradas > 5) Porcentagem += (MultiplicadorMencao * mencoesenconradas)//Multiplica a porcentagem
    }

    let qnt = await util.fetchMessages(message.channel,15,c => c.content == message.content)
        if(qnt > MensagensIguaisQuantidade){
        Porcentagem += (Porcentagem * MultiplicadorMensagensIguais)
    }

    let awe = await util.fetchMessages(message.channel,5,c => c.author.id == message.author.id)
        if(awe == 5){
        Porcentagem += (Porcentagem * MultiplicadorMensagensSeguidas)
        }

    //Mensagem muito rápida
    let rapida = false
    if(message.content.length / 7 >= Math.abs(message.author.typingDurationIn(message.channel) / 1000)) {
        Porcentagem += MensagemRapida
        rapida = true
    }


    //Mensagem com Anexos
    let anexos = false
    if(message.attachments.size > 0) {
        Porcentagem += MensagemComAnexos
        anexos = true
    }

    if(Porcentagem > 75){
        //Banir usuário
        if(message.guild.dados.automod == 'true'){
        if(message.author.id != constantes.dono.id) {
            try{await message.member.ban("Raider")}catch{
        message.member.ban("RAID!").catch(client.channels.get(constantes.phoenix.automod)
        .send("Não consegui banir usuário " + message.author.id + " ele atingiu " + Porcentagem + "% de ser raider!"))}
            }
        }
        let invite  = await message.channel.createInvite()
        const embedRaid =  new Discord.RichEmbed()
        .setTitle('🔔 ALERTA 🔔')   
        .setColor('#ffffff')
        .setThumbnail(message.author.avatarURL)
        .setDescription(`**${message.author.username}** parece estar tentando atacar o servidor \`${message.guild.name}\`!\n\nEle atingiu ${Porcentagem.toFixed(2)}%, verifique o servidor: ${invite}`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp()
        client.channels.get(constantes.phoenix.automod).send(embedRaid)
}

if(Date.now() > tempo || client.checarPermissoesServidor(message)) message.author.raider = {
        porcentagem: (Porcentagem - 15) < 0 ? 0 : Porcentagem - 15,
        tempo: Date.now()
}
else message.author.raider = {
        porcentagem: Porcentagem,
        tempo: Date.now() + 4 * 1000
    }

    
    if(Porcentagem > 50) console.log(`
    Tentativa de Raid --> 
    ---------Usuário ${message.author.tag}
    ---------Porcentagem: ${Porcentagem}%
    ---------Convites: ${convitesencontrados}
    ---------Links: ${linksencontrados}
    ---------Everyonehere: ${everyonehere}
    ---------Mençoes: ${mencoesenconradas}
    ---------Mensagens iguais: ${qnt}
    ---------Avatar?: ${avatar}
    ---------Anexos?: ${anexos}
    ---------Rapida?: ${rapida}`)

  }