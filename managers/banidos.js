module.exports = class BanManager {
    constructor(client){
        this.client = client;
        this.jaAvisado = new Set();
        this.nbanidos = new Set();
        this.sbanidos = new Set();
        this.gbanidos = new Set();
        this.init()
    }
    init(){
        Banimentos.find({tipo: 1}, function(err, usuarios) {
        console.log(`Carregando ${usuarios.length} usuários banidos do bot!`)
        usuarios.forEach(function(u) {
            client.nbanidos.add(u.id)
          });  
        });
        Banimentos.find({tipo: 2}, function(err, usuarios) {
        console.log(`Carregando ${usuarios.length} usuários globalmente banidos do bot!`)
        usuarios.forEach(function(u) {
            client.nbanidos.add(u.id)
          });  
        });
        Banimentos.find({tipo: 3}, function(err, servidores) {
        console.log(`Carregando ${servidores.length} servidores banidos do bot!`)
        servidores.forEach(function(s) {
            this.nbanidos.add(s.id)
          });  
        });
    }
    async verificar(message){
        if(this.sbanidos.has(message.guild.id)){
            if(jaAvisado.has(message.author.id)) return
            jaAvisado.add(message.guild.id)
                const embed = new Discord.RichEmbed()
                .setTitle(`Oops!`)   
                .setColor('#ffffff')
                .setDescription("Esse servidor foi banido de minhas funcionalidades, Adeus!")
                await message.reply(embed).then(msg => { msg.delete(3000) }).catch(/*ERRO!*/)
                return await message.guild.leave().catch('Não consegui sair do servidor ' + message.guild.id)
            }
        
       if(this.gbanidos.has(message.author.id) && message.guild.dados.globalban){
                await message.delete().catch()
                if(jaAvisado.has(message.author.id)) return
                jaAvisado.add(message.author.id)

                const embed = new Discord.RichEmbed()
                .setTitle(`Oops!`)   
                .setColor('#ffffff')
                .setDescription("Você foi banido globalmente!")
                await message.reply(embed).then(msg => { msg.delete(3000) }).catch(/*ERRO!*/)
                return await message.member.ban("Você foi banido de todos os servidores que usam o Phoenix Bot!")
        }
    }
    reload(){
        this.jaAvisado = new Set();
        this.nbanidos = new Set();
        this.sbanidos = new Set();
        this.gbanidos = new Set();
        this.init()
    }
}