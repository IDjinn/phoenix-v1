
    const Transacoes = require('../../database/transacoes.js')
    const Local = require('../../database/local.js')
    const util = require('../../utilitarios/util.js')
exports.run = async function(client, message, args) {
    let membro = message.mentions.members.first() || message.guild.members.get(args[0])
    let quantidade = parseInt(args[1])
    if(!membro) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
    if(membro.id == message.author.id) return client.emit("embedDescricao",message,"Ei, porque quer transferir para sí mesmo?",true)
    if(!quantidade || quantidade <= 0 || isNaN(quantidade)) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
    if(quantidade >= 500000) return client.emit("embedDescricao",message,"Ei, essa transferência é muito alta. O limite de transferência é 500.000 moedas!",true)

    if(quantidade > message.member.local.moedas) return client.emit("embedDescricao",message,"Você não pode pagar essa quantidade porque não tem saldo suficiente!",true)
    else{
        Local.findOneAndUpdate({id: membro.id, servidor: message.guild.id}, {$inc: {moedas: quantidade}}, {upsert:false}, function(err, sucesso){
        if (err) return
        if(sucesso) 
        membro.local.moedas += quantidade
        })
        Local.findOneAndUpdate({id: message.author.id, servidor: message.guild.id}, {$inc: {moedas: -quantidade}}, {upsert:false}, function(err, sucesso){
        if (err) return
        else message.member.local.moedas -= quantidade
        })
        const m = new Transacoes({
          servidor: message.guild.id,
          usuarioOne: message.author.id,
          usuarioTwo: membro.id,
          tempo: Date.now(),
          tipo: 1,
          quantia: quantidade
        }) 
        m.save()
        return client.emit("embedDescricao",message,"Transação efetuada com sucesso.",false)
    }

    
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'economia',
    aliases: ['pay'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'pagar',
    descricao: 'Pagar moedas para outro membro do servidor.',
    usar: 'pagar <@usuario>',
    exemplos: ['@Djinn 35']
};