
var mongoose = require('mongoose');
var Usuario = mongoose.Schema({
    id: String,
    level: Number,
    xp: Number,
    moedas: Number,
    rep: Number,
    sobremim: String,
    criado: Date,
    nbanido: String,
    gbanido: String,
    motivoAfk: String,
    recompensas: {
        diaria: {
            tempo: Date,
            bonus: Number,
            record: Number
        }
    }
});
module.exports =  mongoose.model('Usuarios', Usuario);