const Silenciados = require('../../database/silenciados.js')
const Timers = require('../../database/timers.js')
const { Silenciado, Timer } = require('../estruturas/index.js')
const { Collection } = require('discord.js')
module.exports = class Servidor{
    constructor(servidor){
        this.id = id,
        this.canais ={
            entrada = !isNaN(servidor.canais.entrada) ? servidor.canais.entrada : false,
            saida = !isNaN(servidor.canais.saida) ? servidor.canais.saida : false,
            comandos = !isNaN(servidor.canais.comandos) ? servidor.canais.comandos : false,
            anunciar = !isNaN(servidor.canais.anunciar) ? servidor.canais.anunciar : false,
            logs = !isNaN(servidor.canais.logs) ? servidor.canais.logs : false,
            niveis = !isNaN(servidor.canais.niveis) ? servidor.canais.niveis : false,
            verificar = !isNaN(servidor.canais.verificar) ? servidor.canais.verificar : false,
            punicao = !isNaN(servidor.canais.punicao) ? servidor.canais.punicao : false,
            contadorbot = !isNaN(servidor.canais.contadorbot) ? servidor.canais.contadorbot : false,
            contadormembro = !isNaN(servidor.canais.contadormembro) ? servidor.canais.contadormembro : false,
            sugestao = !isNaN(servidor.canais.sugestao) ? servidor.canais.sugestao : false,
        },
        this.cargos = {
            adm = !isNaN(servidor.cargos.adm) ? servidor.cargos.adm : false,
            mod = !isNaN(servidor.cargos.mod) ? servidor.cargos.mod : false,
            inicial = !isNaN(servidor.cargos.inicial) ? servidor.cargos.inicial : false,
            verificado =!isNaN(servidor.cargos.verificado) ? servidor.cargos.verificado : false,
        },
        this.automod = {
            autowarn = servidor.automod.autowarn,
            antiraid = servidor.automod.antiraid,
            antispamemoji = servidor.automod.antispamemoji,
            antispaminvite = servidor.automod.antispaminvite,
            antispammention = servidor.automod.antispammention,
            blacklink = servidor.automod.blacklink != 'false' ? servidor.automod.blacklink.split(',') : false,
            whitelink = servidor.automod.whitelink != 'false' ? servidor.automod.whitelink.split(',') : false,
            antispamcaps = servidor.automod.antispamcaps,
            lockserver = servidor.automod.lockserver,
            serverislocked = servidor.automod.serverislocked,
            textdup = servidor.automod.textdup
        },
        this.eco ={
            singular = servidor.eco.singular == undefined ? 'Real' : servidor.eco.singular,
            plural = servidor.eco.plural == undefined ? 'Reais' : servidor.eco.plural,
            valor = servidor.eco.valor == undefined ? '1000' : servidor.eco.valor,
        },
        this.welcome = servidor.welcome,
        this.leave = servidor.leave,
        this.vip = servidor.vip,
        this.counterb = servidor.counterb,
        this.counterm = servidor.counterm,
        this.prefixo = servidor.prefixo != undefined ? servidor.prefixo : '>',
        this.playList = [],
        this.ultimosMembros = []

        this.silenciados = new Collection();
        this.timers = new Collection();
        this.init();
    }
    init(){
        Silenciados.find({servidor: this.servidor}, function(erro, usuarios) {
            if(usuarios) usuarios.forEach(usuario =>  { 
                if(!usuario.expirado) this.silenciado.set(usuario.id ,new Silenciado(usuario)) 
            });  
        });
        Timers.find({servidor: this.servidor}, function(erro, timers) {
        timers.forEach((timer) => { 
            if(t.ativo && t.quantidaderepetir > 0 && t.validade > Date.now()) this.timers.set(timer.canal, new Timer(timer)); 
        });  
    });
    }
}