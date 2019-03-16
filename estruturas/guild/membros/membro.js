const Punicoes = require('./punicao.js')
const Locais = require('../../../database/local.js')
module.exports = class Membro{
    constructor(membro){
        this.servidor = membro.guild.id;
        this.id = membro.id;
        this.level = membro.level;
        this.xp = membro.xp;
        this.moedas = membro.moedas;
        this.punicoes = new Collection();
    }
    init(){
        Punicoes.find({id: this.id, servidor: this.servidor}, function(err, punicoes) {
            punicoes.forEach(punicao => this.punicoes.set(punicao._id, new Punicao(punicao)));  
        });
    }
    addXp(valor){
        this.xp += valor;
        Locais.findOneAndUpdate({id: this.id, servidor: this.servidor},{$inc: {xp: this.xp}});
        this.verificarNivel();
    }
    verificarNivel(){ if(this.xp > getXp(this.level + 1)) Locais.findOneAndUpdate({id: this.id, servidor: this.servidor},{$inc: {level: this.level}}); }
}