module.exports = class Silenciados{
    constructor(silenciado){
        this.id = silenciado._id;
        this.servidor = silenciado.servidor;
        this.tempo = silenciado.tempo;
        this.motivo = silenciado.motivo;
        this.staff = silenciado.staff;
        this.tipo = silenciado.tipo;
        this.removidoPor = silenciado.removidoPor;
    }
}