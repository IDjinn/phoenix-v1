
const Discord = require('discord.js')
const comandos = require('./comandos.js')
const Dados = require('../database/timers.js')
const util = require('../utilitarios/util.js')

module.exports = class Timer {
    constructor(timer){
        this.client = timer.client
        this.servidor = timer.servidor
        this.criado = timer.criado
        this.intervalo = timer.intervalo
        this.mensagem = timer.mensagem
        this.usuario = timer.usuario
        this.comando = timer.comando
        this.acao = timer.acao
        this.ativo = timer.ativo
        this.validade = timer.validade
        this.canal = timer.canal
        this.quantidaderepetir = timer.quantidaderepetir
        this.temporizado = this.client.setInterval(() => {
            if(!this.timer.ativo) this.delete()
            else this.timer.run(this.client)
        }, this.intervalo);
    }
    delete(){
        this.ativo = false
        delete this.client.timers[this.canal]
        clearInterval(this.temporizado)
    }
    run(){
        if(this.quantidaderepetir == 0 || Date.now() > this.validade) this.delete()

        if(this.ativo && this.quantidaderepetir > 0){
        this.quantidaderepetir -= 1
        if(this.client.timers[this.canal]) this.client.timers[this.canal].quantidaderepetir = this.quantidaderepetir

        //Ações
        let g = this.client.guilds.get(this.servidor)
        let canal = g.channels.get(this.canal)
        if(canal) canal.send(this.mensagem)
        else this.delete()
        
        //let cmd = client.comandos.get(command) || client.comandos.get(client.aliases.get(command))
        //comandos(this.message)
        
        if(this.acao.match(/limparcanal/)){
            let c = guild.channels.get(this.canal)
            c.fetchMessages({
            limit: 1000,
            }).then((messages) => message.channel.bulkDelete(messages)).catch()
        }
        
    }
    else{
        if(this.client.timers[this.canal]) this.client.timers[this.canal].ativo = this.ativo,
        Dados.findOneAndUpdate({canal: this.canal},{"$set": {quantidaderepetir: this.quantidaderepetir, ativo: this.ativo}},(erro,sucesso) =>{
            if(erro) console.log(erro)
        })
    }
    }
}