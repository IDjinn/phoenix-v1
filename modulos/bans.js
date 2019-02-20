
let jaAvisado = new Set()
module.exports = async (client,message) => {
    if(client.sbanidos.has(message.guild.id)){
        if(jaAvisado.has(message.author.id)) return
        jaAvisado.add(message.guild.id)
            const embed = new Discord.RichEmbed()
            .setTitle(`Oops!`)   
            .setColor('#ffffff')
            .setDescription("Esse servidor foi banido de minhas funcionalidades, Adeus!")
            await message.reply(embed).then(msg => { msg.delete(3000) }).catch(/*ERRO!*/)
            return await message.guild.leave().catch('Não consegui sair do servidor ' + message.guild.id)
        }
    
   if(client.gbanidos.has(message.author.id)){
            await message.delete().catch()
            if(jaAvisado.has(message.author.id)) return
            jaAvisado.add(message.author.id)

            let usuario = client.users.get(message.author.id)
            if(usuario){
                const embed = new Discord.RichEmbed()
                .setTitle(`Oops!`)   
                .setColor('#ffffff')
                .setDescription("Você foi banido globalmente!")
                await message.reply(embed).then(msg => { msg.delete(3000) }).catch(/*ERRO!*/)
                return await usuario.ban("Você foi banido de todos os servidores que usam o Phoenix Bot!")
        }
    }
}