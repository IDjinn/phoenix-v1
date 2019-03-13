const extras = require('./extras.js')
const moedas = require('./moedas.js')
const moment = require('moment')
const Local = require('../database/local.js')
const Servidor = require('../database/servidor.js')
const Punicoes = require('../database/punicoes.js')
const Silenciados = require('../database/punicoes.js')
const Discord = require('discord.js')
const Transacoes = require('../database/transacoes.js')
const Usuarios = require('../database/usuario.js')

async function fetchMessagesInner(channel, remaining, foundMessages, lastMessage) {
    lastMessage = lastMessage != null ? lastMessage.id : undefined;

    const messages = await channel.fetchMessages({ limit: Math.min(remaining, 99), before: lastMessage });

    if (!messages || messages.size == 0) return foundMessages;

    const messagesArr = messages.array();

    for (let i = 0; i < messagesArr.length; i++) {
        foundMessages.push(messagesArr[i]);
    }

    remaining -= messagesArr.length;

    if (remaining <= 0) return foundMessages;

    return fetchMessagesInner(channel, remaining, foundMessages, messagesArr[messagesArr.length - 1]);
}
exports.fetchMessages = async function (channel, numScan, checkFunc) {
    if (!checkFunc) checkFunc = (() => true);

    const scanMessages = await fetchMessagesInner(channel, numScan, [], null);
    const foundMessages = scanMessages.filter(checkFunc);
    return foundMessages.length;
};

exports.sepia = async (ctx, x, y, width, height) => {
  const data = ctx.getImageData(x, y, width, height);
  for (let i = 0; i < data.data.length; i += 4) {
    const brightness = (0.34 * data.data[i]) + (0.5 * data.data[i + 1]) + (0.16 * data.data[i + 2]);
    data.data[i] = brightness + 100;
    data.data[i + 1] = brightness + 50;
    data.data[i + 2] = brightness;
  }
  ctx.putImageData(data, x, y);
  return ctx;
}

exports.drawImageWithTint = async (ctx, image, color, x, y, width, height) => {
  const { fillStyle, globalAlpha } = ctx;
  ctx.fillStyle = color;
  ctx.drawImage(image, x, y, width, height);
  ctx.globalAlpha = 0.5;
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = fillStyle;
  ctx.globalAlpha = globalAlpha;
}

exports.elementosRandomicos = (seed, count = 1, unique = false) => {
  if (unique && seed.length < count) {
    count = seed.length;
  }

  let randomElements = [];

  for (let i = 0; i < count; i++) {
    let randomElement = seed[Math.floor(Math.random() * seed.length)];
    randomElements.push(randomElement);

    if (unique) seed.splice(seed.indexOf(randomElement), 1);
  }

  return randomElements;
}
exports.shortenText = async (ctx, text, maxWidth) => {
  let shorten = false;
  while (ctx.measureText(text).width > maxWidth) {
    if (!shorten) shorten = true;
    text = text.substr(0, text.length - 1);
  }
  return shorten ? `${text}...` : text;
}
exports.usuarioMencionado = async (mencao,client) => {
  const matches = mencao.match(/^<@!?(\d+)>$/);
  // The id is the first and only match found by the RegEx.
  // However the first element in the matches array will be the entire mention, not just the ID,
  // so use index 1.
  const id = matches[1];

  return client.users.get(id);
}
/*
exports.formatarData = async (tempo,tipo) => {
    let data = Date(tempo)
    switch(tipo.toLowerCase()){
      case 'ano':{
        data = data.getFullYear()
        break;
      }
      case 'mes':{
        data = data.getMonth()
        break;
      }
      case 'd':{
        data = data.getDay()
        break;
      }
      case 'h':{
        data = data.getHours()
        break;
      }
      case 'm':{
        data = data.getMinutes()
        break;
      }
      case 's':{
        data = data.getSeconds()
        break;
      }
      case 'ms':{
        data = data.getMilliseconds()
        break;
      }
    }
}*/

exports.variaveis = async (message) => {
  return mensagem.content.replace(/%usuario%/g,`<@${message.author.id}>`)
  .replace(/%nome%/g,message.member.displayName)//%nome%, %servidor%, %tag%, %hora%, %usuario-id%, %membros-servidor% 
  .replace(/%servidor%/g,message.guild.name)
  .replace(/%tag%/g,message.author.tag)
  .replace(/%hora%/g, moment(Date.now()).format("HH:mm:ss"))
  .replace(/%data%/g, moment(Date.now()).format("DD.MM.YYYY, HH:mm:ss"))
  .replace(/%usuario-id%/g,message.author.id)
  //.replace(/%usuario-avatar%/g,message.author.avatarURL)
  .replace(/%membros-servidor%/g,message.guild.memberCount)
}

exports.verificar = async (channel, user, time = 30000) => {
  const filter = res => {
    const value = res.content.toLowerCase();
    return res.author.id === user.id && (yes.includes(value) || no.includes(value));
  };
  const verify = await channel.awaitMessages(filter, {
    max: 1,
    time
  });
  if (!verify.size) return 0;
  const choice = verify.first().content.toLowerCase();
  if (yes.includes(choice)) return true;
  if (no.includes(choice)) return false;
  return false;
}

exports.Sleep = async (t) => {
  let tempo = t * 1000
  await sleep(tempo);
  
  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
}

exports.converterData = async(mensagem) => {
let args = mensagem.split(' ')
let tempo = 0
let multiplicador = 1000 * 60
for(let a in args){
  if(!isNaN(args[a])) tempo = parseInt(args[a])
  else switch(args[a].toLocaleLowerCase()){
    case 's':
    case 'segundos':
    case 'segundo':
      multiplicador = 1000
      break;

    case 'm':
    case 'minuto':
    case 'minutos':
      multiplicador = 1000 * 60
      break;

    case 'h':
    case 'hora':
    case 'horas':
      multiplicador = 1000 * 60 * 60
      break;

    case 'd':
    case 'dia':
    case 'dias':
      multiplicador = 1000 * 60 * 60 * 24
      break;

    case 's':
    case 'semana':
    case 'semanas':
      multiplicador = 1000 * 60 * 60 * 24 * 7
      break;

    case 'mes':
    case 'mês':
    case 'mêses':
      multiplicador = 1000 * 60 * 60 * 24 * 7 * 4
      break;

    case 'ano':
    case 'a':
    case 'anos':
      multiplicador = 1000 * 60 * 60 * 24 * 7 * 4 * 12
      break;
  }
}
  return multiplicador * tempo
}

exports.punir = async (guild, id, motivo, staff, tipo, bot, client) =>{
  const punicao = new Punicoes({
    servidor: guild,
    id: id,
    tempo: Date.now(),
    motivo: motivo,
    staff: staff,
    tipo: tipo,
    bot: bot,
    removidoPor: 'false'
  })
  punicao.save()
  client.punicoes[punicao._id] = {
    servidor: guild,
    id: id,
    tempo: Date.now(),
    motivo: motivo,
    staff: staff,
    tipo: tipo,
    bot: bot,
    removidoPor: 'false'
  }
  let g = await client.guilds.get(punicao.servidor)
  if(!g.punicoes) g.punicoes = []
  g.punicoes.push({
    servidor: guild,
    id: id,
    tempo: Date.now(),
    motivo: motivo,
    staff: staff,
    tipo: tipo,
    bot: bot,
    removidoPor: 'false'
  })
  let membro = await g.members.get(id)
  if(!membro.punicoes) membro.punicoes = []
  membro.punicoes.push({
    servidor: guild,
    id: id,
    tempo: Date.now(),
    motivo: motivo,
    staff: staff,
    tipo: tipo,
    bot: bot,
    removidoPor: 'false'
  })
  return g.punicoes.filter(p => p.id == id).length
}

exports.transacao = async (guild, msgone, msgtwo, tipo, quantidade) => {
  if(!isNaN(msgone)) msgone = client.users.get(msgone).lastMessage
  if(!isNaN(msgtwo)) msgtwo = client.users.get(msgtwo).lastMessage
  const m = new Transacoes({
    servidor: guild,
    usuarioOne: msgone.author.id,
    usuarioTwo: msgtwo.author.id,
    tempo: Date.now(),
    tipo: tipo,
    quantia: quantidade
  }) 
  m.save()
  return moedas.AdicionarMoedas(msgtwo, quantidade)
}

exports.mutar = async (guild, id, tempo, motivo, staff, bot, client) =>{
  const mute = new Punicoes({
    servidor: guild,
    id: id,
    tempo: Date.now() + tempo,
    motivo: motivo,
    staff: staff,
    bot: bot,
    expirado: 'false',
    removidoPor: 'false'
  })
  mute.save()
  client.silenciados[id] = {
    id: id,
    servidor: guild,
    tempo: Date.now() + tempo,
    motivo: motivo,
    staff: staff,
    bot: bot,
    expirado: 'false',
    removidoPor: 'false'
  }
}

exports.desmutar = async (guild, id) =>{
  const servidor = Servidor.findOne({id: guild}, function (erro, sucesso){
      if(sucesso) 
      console.log(sucesso)
      sucesso.silenciados.remove({id: id})
        sucesso.save()
      });
}
    

//client.playList
exports.Tocar = async (conexao, message, client, args) => {
  const util = require('../utilitarios/util.js')
  const Discord = require('discord.js')
  let servidor = message.guild.dados
  const fetchVideoInfo = require('youtube-info');
  const YTDL = require('ytdl-core')
  
servidor.dispatcher = conexao.playStream(YTDL(servidor.playList[0], {filter: "audioonly"}))
servidor.playList.shift()
let info = await YTDL.getInfo(args[0])
fetchVideoInfo(info.video_id).then(async i =>{
  let Likes = i.likeCount.toLocaleString()
  let Deslikes = i.dislikeCount.toLocaleString()
  let Comentarios = i.commentCount.toLocaleString()
  let Visualizacoes = i.views.toLocaleString()

  Likes = Likes.replace(/,/g, '.');
  Deslikes = Deslikes.replace(/,/g, '.');
  Comentarios = Comentarios.replace(/,/g, '.');
  Visualizacoes = Visualizacoes.replace(/,/g, '.');
const embed = new Discord.RichEmbed()
    .setTitle('<:playing:522783747867672580> Tocando Agora')   
    .setColor('#ffffff')
    .setThumbnail(info.thumbnail_url)
    .setDescription(`Tocando (${info.title}}, no canal <#${message.member.voiceChannel.id}>!`)
    .addField('<:youtube:522788798128455681> Canal',`${info.author.name}`)
    .addField('🗓 Publicado Em',`${i.datePublished}`)
    .addField('👍 Likes',`${Likes}`)
    .addField('👎 Deslikes',`${Comentarios}`)
    .addField('💬 Comentários',`${Comentarios}`)
    .addField('👀 Visualizações',`${Visualizacoes}`)
    .addField('🕐 Tamanho',`\`${(i.duration / 60).toFixed(2).replace('.',':')}\` minutos`)
    .setTimestamp(info.timestamp)
message.channel.send(embed)})
servidor.dispatcher.on("end", function(){
  if(servidor.playList[0]){
  Tocar(conexao,message, client, args)
  }
  else{
  conexao.disconnect()
}})}

exports.pular = async (conexao, message, client, args) =>{
  if(message.member.permissoesServidor > 0){
    await message.guild.dados.playList.shift()
    this.Tocar(message.member.voiceChannel,message, client, args)
    return await client.emit("embedDescricao",message,"Música Pulada!",true)
  }
  else{
    return await client.emit("embedDescricao",message,"Você não tem permissão para isso!",true)
  }
}

exports.sair = async (message, client) => {
  if(!message.guild.dados.playList[0]) {
    await message.member.voiceChannel.leave()
    return await client.emit("embedDescricao",message,"Saí do canal de voz!",false)
  }
  else if(message.member.permissoesServidor == 0){
    return await client.emit("embedDescricao",message,"Ainda tem músicas na Play List, não posso sair!",true)
  }
  else{
    await message.member.voiceChannel.leave()
    return await client.emit("embedDescricao",message,"Saí do canal de voz!",false)
  }
}