let trancados = new Set()
exports.run = async function(client, message, args) {
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
exports.configuracao = {
    apenasCriador: false,
    modulo: 'moderacao',
    aliases: ['lock','unlock','destrancar'],
    permissoesNecessarias: ['ADM'],
    permissoesBot: ['MANAGE_CHANNELS']
};

exports.ajuda = {
    nome: 'trancar',
    descricao: 'Tranca/Destranca o canal atual para evitar ataques!',
    usar: 'trancar/destrancar <#canal>',
    exemplos: []
};