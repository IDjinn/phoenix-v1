module.exports = new (class Afk {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='utilitarios';
            this.aliases = [];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'afk';
            this.descricao = 'Fica ausente';
            this.usar = 'afk [motivo]';
            this.exemplos = ['fazer miojo','comprar pão']
        }
async run(client, message, args) {
    let motivo = args.join(" ")
    if(!motivo) motivo = "Motivo não expecificado!"
    client.afk[message.author.id] = {
        usuario: message.author,
        motivo: motivo
    }
    message.user.dados.motivoAfk = motivo
    await Usuarios.findOneAndUpdate({id: message.author.id},{motivoAfk: motivo}, {upsert: false})
    client.emit("embedDescricao",message,"Você agora está afk por `" + motivo + "`, ao falar no chat sairá do modo afk!",false)
}
})
const Usuarios = require('../../database/usuario')

