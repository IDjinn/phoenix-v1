const Transacoes = require('../../database/transacoes.js')
const Local = require('../../database/local.js')
const util = require('../../utilitarios/util.js')
module.exports = new (class Pagar {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='economia';
            this.aliases = ['pay'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'pagar';
            this.descricao = 'Pagar moedas para outro membro do servidor.';
            this.usar = 'pagar <@usuario>';
            this.exemplos = ['@Djinn 35']
        }

async run(client, message, args) {
    let membro = message.mentions.members.first() || message.guild.members.get(args[0])
    let quantidade = parseInt(args[1])
    if(!membro) return client.emit('ajudaComando', message, this)
    if(membro.id == message.author.id) return client.emit("embedDescricao",message,"Ei, porque quer transferir para sí mesmo?",true)
    if(!quantidade || quantidade <= 0 || isNaN(quantidade)) return client.emit('ajudaComando', message, this)
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
})