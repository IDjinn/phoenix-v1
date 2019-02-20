var mongoose = require('mongoose');
var Transacoes = mongoose.Schema({
    servidor: String,
    usuarioOne: String,
    usuarioTwo: String,
    tempo: Date,
    tipo: Number,
    quantia: Number
});
/*
one = quem transfere
two = quem recebe

tipo 0 = daily
tipo 1 = pagar
*/

module.exports = mongoose.model('Transacoes', Transacoes);