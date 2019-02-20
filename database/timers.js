var mongoose = require('mongoose');
var Timers = mongoose.Schema({
    servidor: String,
    criado: String,
    intervalo: Number,
    mensagem: String,
    usuario: String,
    comando: String,
    acao: String,
    ativo: Boolean,
    validade: String,
    canal: String,
    quantidaderepetir: Number
});


module.exports = mongoose.model('Timers', Timers);