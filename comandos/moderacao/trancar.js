let trancados = new Set()
module.exports = new (class Trancar {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='moderacao';
            this.aliases = ['lock','unlock','destrancar'];
            this.permissoesNecessarias = ['ADM'];
            this.permissoesBot = ['MANAGE_CHANNELS'];
            this.nome = 'trancar';
            this.descricao = 'Tranca/Destranca o canal atual para evitar ataques!';
            this.usar = 'trancar/destrancar <#canal>';
            this.exemplos = []
        }
async run(client, message, args) {
    let canal = await message.mentions.channels.first() || message.guild.channels.get(args[0]) || message.channel
    try{
        if(!trancados.has(canal.id)){
            canal.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: false
              })
              trancados.add(canal.id)
              return client.emit("embedDescricao",message,`Canal <#${canal.id}> Trancado com sucesso!`,false)
        }
        else{
            trancados.delete(canal.id)
              canal.lockPermissions().catch(e => console.log(e))
              return client.emit("embedDescricao",message,`Canal <#${canal.id}> Destrancado com sucesso!`,false)
        }
    }
    catch{
        return client.emit("embedDescricao",message,"Oops! Parece que eu não tenho permissão para executar esse comando!",true)
    }
}
})