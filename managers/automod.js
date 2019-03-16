const convite = new Discord.RichEmbed()
.setTitle(`Oops!`)   
.setColor('#ffffff')
.setDescription("Você não tem permissão para enviar convites de outros servidores!")

module.exports = class AutoModManager {
    constructor(client){
        this.client = client;
        this.init();
    }
    verificar(message){
        this.convites(message);
    }
    convites(message){
        let convites = message.content.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
        message.embeds.forEach(embed => {
            if(embed.title) convites += embed.title.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
            if(embed.description) convites += embed.description.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
            embed.fields.forEach(field => {
                convites += field.name.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
                convites += field.value.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
            })
            if(embed.footer) convites += embed.footer.text.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
            if(embed.author) convites += embed.author.name.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
            })
        if(convites.length > 0 && message.guild.dados.antispaminvite){
            message.delete().catch()
            if(!message.guild.dados.automod.autowarn) return message.reply(convite)
            else{
              let a = await util.punir(message.guild.id, message.author.id, 'Enviar convites de servidores Discord', this.client.user.id, 4, true, this.client)
              if(a >= 3) return message.member.ban('Atingir 3 strikes').catch()
              const conviteWarn = new Discord.RichEmbed()
              .setTitle(`Oops!`)   
              .setColor('#ffffff')
              .setDescription(`Você não tem permissão para enviar convites de outros servidores! Atualmente você tem ${a} strikes. Quando chegar a 3 strikes será banido do servidor.`)
              return message.reply(conviteWarn)
            }
        }
    }
}