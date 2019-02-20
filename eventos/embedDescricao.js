
const Discord = require('discord.js')
module.exports = async (message,descricao,apagavel) => {
    const embed = new Discord.RichEmbed()
    .setColor('#ffffff')
    .setDescription(descricao)
    await message.reply(embed).then(async msg => { if(apagavel) msg.delete(3000) }).catch(/*ERRO!*/)
}