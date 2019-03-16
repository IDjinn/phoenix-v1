module.exports = class Punicao{
    constructor(punicao){
        this.id = punicao._id;
        this.servidor = punicao.servidor;
        this.tempo = punicao.tempo;
        this.motivo = punicao.motivo;
        this.staff = punicao.staff;
        this.tipo = punicao.tipo;
        this.removidoPor = punicao.removidoPor;
    }
}