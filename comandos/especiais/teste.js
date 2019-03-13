const agree    = "✅";
const disagree = "❎";
const Discord = require('discord.js')
module.exports = new (class Teste {
  constructor(){
        this.apenasCriador = true,
        this.modulo = 'especiais',
        this.aliases = [],
        this.permissoesNecessarias = [],
        this.permissoesBot = [],
        this.nome = 'teste',
        this.descricao = 'Comando do criador',
        this.usar = 'setavatar [link]'
      }
async run(bot, message, args) {

  if (message.mentions.users.size === 0){
    return message.reply(":x: " + "| Por favor, mencione uma pessoa");
  }

  let kickmember = message.guild.member(message.mentions.users.first());
  if(!kickmember){
    message.reply(":x: " + "| Esse usúario não existe!");
  }

  if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
    return message.reply(":x: " + "| Eu preciso da \"KICK_MEMBERS\" permissão!").catch(console.error);
  }

  let msg = await message.channel.send("Vote agora! (10 Segundos)");
  await msg.react(agree);
  await msg.react(disagree);

  const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 10000});
  msg.delete();

  var Não_Count = reactions.get(disagree).count - 1
  var Sim_Count = reactions.get(agree).count - 1
  
  var sumsum = new Discord.RichEmbed()
  
            .addField("Votação encerrada:", "----------------------------------------\n" +
                                          "Total de votos (Não): " + `${Não_Count}\n` +
                                          "Total de votos (Sim): " + `${Sim_Count}\n` +
                                          "----------------------------------------\n" +
                                          "Obs: Votos necessarios para dar kick (3+)\n" +
                                          "----------------------------------------", true)

            .setColor("0x#FF0000")

  await message.channel.send({embed: sumsum});

  if(Sim_Count >= 3 && Sim_Count > Não_Count){

    kickmember.kick().then(member => {
      message.reply(`${member.user.username} foi kickado com sucesso`)
    })
  }else{

    message.channel.send("\n" + "Salvo..... por enquanto");
  }

}
})