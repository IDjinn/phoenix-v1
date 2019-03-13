const Discord = require('discord.js')
const util = require('../../utilitarios/util.js')
module.exports = new (class Quizz {
      constructor(){
            this.apenasCriador = false;
            this.modulo ='moderacao';
            this.aliases = [];
            this.permissoesNecessarias = ['ADM'];
            this.permissoesBot = [];
            this.nome = 'quizz';
            this.descricao = 'Cria um evento quizz no canal.';
            this.usar = 'quizz';
            this.exemplos = []
          }
          
  async run(client, messzage, args) {
    await message.delete().catch()
    const usuario = await message.author.send("Qual palavra você deseja?")
    
    let palavra = ""
    const filtro = m => m.author.id == message.author.id
    await usuario.channel.awaitMessages(filtro, { max: 1, time: 60000, errors: ['time'] })
      .then(c => {
          palavra = c.first().content
          c.first().reply("Você escolheu a palavra: `" + c.first().content + "`!")
        })
      .catch(c => usuario.send("Você não escolheu nenhuma palavra..."));
      
      await message.author.send("Agora, escolha uma dica para dar às pessoas:")

    let dica
      await usuario.channel.awaitMessages(filtro, { max: 1, time: 60000, errors: ['time'] })
        .then(c => {
            dica = c.first().content
            c.first().reply("Você escolheu a dica: `" + c.first().content + "`!")
          })
        .catch(c => usuario.send("Você não escolheu nenhuma dica..."));
        
        if(!dica || !palavra) return;

        await message.author.send(`Agora, vamos voltar. <#${message.channel.id}>`)

        const embed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setTitle('Evento Quizz')
        .setDescription("Dica: " + dica)
        .setTimestamp()

        message.channel.send("Começando Quizz em 3...")
        util.Sleep(1)
        message.channel.send("Começando Quizz em 2...")
        util.Sleep(1)
        message.channel.send("Começando Quizz em 1...")
        util.Sleep(1)
        message.channel.send("Começando Quizz **AGORA**!")
        util.Sleep(1)
        message.channel.send(embed)

        const filter = m => m.content == palavra
        message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] })
        .then(c => {
          let u = c.first().author.id
          message.channel.send(`Parabéns, <@${u}> acertou a palavra, que era: \`${palavra}\`!`)})
        .catch(c => { 
         message.channel.send(`Depois de 5 minutos, ninguém acertou a palavra certa.`)
        }
      );
};
})