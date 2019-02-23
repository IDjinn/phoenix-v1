const Timer = require('../../database/timers.js')
const Temporizador = require('../../modulos/timers.js')
const util = require('../../utilitarios/util.js')
exports.run = async function(client, message, args) {
  let reacoes = ['538036569060278273','538036543080890368']
  const filtro = m => m.author.id == message.author.id
  const filtroCancelar = (r,u) => reacoes.includes(r.emoji.id) && u.id === message.author.id
  var mensagem = ''
  var comando = ''
  var tempo = 0
  var intervalo = 0
  var quantidade = 0
  var limpar = false

  var cancelado = false

  if(client.timers[message.channel.id]) if(client.timers[message.channel.id].ativo) return message.reply("Ainda tem um timer ativo nesse canal!")

  if(!cancelado) await message.channel.send(`Qual mensagem deseja colocar no timer?`).then(async m =>{
    await m.react('538036569060278273').catch()
    const collector = m.createReactionCollector(filtroCancelar, { time: 300000 });
    collector.on('collect', () => {cancelado = true})
    collector.on('end', () => {cancelado = true})
  await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
  .then(async msg => {
      mensagem = msg.first()
      mensagem = mensagem.content
  })
})
/*
if(!cancelado) await message.channel.send(`Qual comando quer executar no timer?`).then(async m =>{
  const collector = m.createReactionCollector(filtroCancelar, { time: 300000 });
  collector.on('collect', () => {cancelado = true})
  collector.on('end', () => {cancelado = true})
await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
.then(async m => {
    comando = m.fisrt().content
})})*/

if(!cancelado) await message.channel.send(`Quanto tempo deseja que o timer fique ativo? Exemplos: \`1 dia\`, \`5 minutos\`, \`15 horas\`, máximo \`30 dias\``).then(async m =>{ 
  await m.react('538036569060278273').catch()
  const collector = m.createReactionCollector(filtroCancelar, { time: 300000 });
  collector.on('collect', () => {cancelado = true})
  collector.on('end', () => {cancelado = true})
await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
.then(async aaa => {
  aaa = aaa.first()
    tempo = await util.converterData(aaa.content)
    if(tempo > 2592000000 || tempo < 60000) {
      cancelado = true
      return message.reply("Quantidade de tempo inválida, menor que 1 minuto ou maior que 30 dias.")
    }
  })})

if(!cancelado) await message.channel.send(`Qual será o intervalo? Exemplos: \`5 minutos\`, \`1 minuto\`, \`30 minutos\` (mínimo 1 minuto)`).then(async m =>{ 
  await m.react('538036569060278273').catch()
  const collector = m.createReactionCollector(filtroCancelar, { time: 300000 });
  collector.on('collect', () => {cancelado = true})
  collector.on('end', () => {cancelado = true})
await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
.then(async eee => {
  eee = eee.first()
    intervalo = await util.converterData(eee.content)
    if(intervalo > 86400000 || intervalo < 60000) {
      cancelado = true
      return message.reply("Quantidade de tempo inválida, menor que 1 minuto ou maior que 1 dia.")
    }
})}) 

if(!cancelado) await message.channel.send(`Quantas vezes o timer irá funcionar? Exemplos: \`5\`, \`15\`, \`100\``).then(async m =>{ 
  await m.react('538036569060278273').catch()
  const collector = m.createReactionCollector(filtroCancelar, { time: 300000 });
  collector.on('collect', () => {cancelado = true})
  collector.on('end', () => {cancelado = true})
await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
.then(async xxx => {
  xxx = xxx.first()
    quantidade = parseInt(xxx.content)
    if(quantidade > 999) quantidade = 999
})}) 
/*
if(!cancelado) await message.channel.send(`Deseja que as mensagens do canal sejam apagadas?`).then(async m =>{ 
  await m.react('538036569060278273').catch()//i
  await m.react('538036543080890368').catch()//c
  const collector = m.createReactionCollector(filtroCancelar, { time: 300000 });
  await collector.on('collect', (r) => {
    console.log(r.emoji.id)
    console.log(r.id)
    if(r.emoji.id == '538036543080890368') limpar = true 
  })
  collector.on('end', () => {cancelado = true})
})*/

else return message.channel.send("Operação Cancelada.")

  if(mensagem && tempo && intervalo && quantidade){
    client.timers[message.channel.id] = {
        servidor: message.guild.id,
        criado: Date.now(),
        intervalo: intervalo,
        mensagem: mensagem,
        usuario: message.author.id,
        comando: '',
        acao: limpar == true ? 'limparcanal' : '',
        ativo: true,
        validade: Date.now() + tempo,
        canal: message.channel.id,
        quantidaderepetir: quantidade,
        client: client
    }
    let c = new Timer({
      servidor: message.guild.id,
      criado: Date.now(),
      intervalo: intervalo,
      mensagem: mensagem,
      usuario: message.author.id,
      comando: '',
      acao: limpar == true ? 'limparcanal' : '',
      ativo: true,
      validade: Date.now() + tempo,
      canal: message.channel.id,
      quantidaderepetir: quantidade
    })
    c.save()
    let temp = new Temporizador(client.timers[message.channel.id])/*
    setInterval(() => {
      temp.run(client)
      if(!temp.ativo) {
          clearInterval(temp)
      }
    }, intervalo );*/
  }
  return message.channel.send("Configurado com sucesso!")

}

exports.configuracao = {
    apenasCriador: true,
    modulo: 'administracao',
    aliases: [],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'timer',
    descricao: 'Cria um temporizador para ações bem úteis!',
    usar: 'timer',
    exemplos: []
};