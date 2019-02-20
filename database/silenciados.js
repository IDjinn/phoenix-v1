var mongoose = require('mongoose');
var Silenciados = mongoose.Schema({
    servidor: String,
    id: String,
    tempo: String,
    motivo: String,
    staff: String,
    bot: String,
    expirado: String,
    removidoPor: String
});


module.exports = mongoose.model('Silenciados', Silenciados);