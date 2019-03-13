module.exports = new (class BanirTodos {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='administracao';
            this.aliases = ['massban'];
            this.permissoesNecessarias = ['ADM'];
            this.permissoesBot = ['BAN_MEMBERS'];
            this.nome = 'banirtodos';
            this.descricao = 'Remove e bane todos os membros do seu servidor.';
            this.usar = 'banirtodos';
            this.exemplos = []
        }

async run(client, message, args) {
    message.reply("Tem certeza que deseja banir todos os membros?").then(async m => {

    await m.react('538036543080890368')
    await m.react('538036569060278273')
    
    let reacao = ['538036543080890368','538036569060278273']
    const filter = (reaction, user) => reacao.includes(reaction.emoji.id) && user.id === message.author.id
    const collector = m.createReactionCollector(filter, { time: 15000 });
    collector.on('collect', async r => {
        if(r.emoji.id == '538036569060278273') {
            m.delete().catch()
            return client.emit("embedDescricao",message,"Operação cancelada!",true)
        }
        else if(r.emoji.id == '538036543080890368'){
        let motivo = args.slice(1).join(" ")
        message.guild.members.forEach(async m => {
        await m.ban(motivo)
        });
    }})
    message.reply("Membros banidos com sucesso!")
})}
})

/*

module.exports = new (class Eval {
    constructor(){

        })
    }
}
*/