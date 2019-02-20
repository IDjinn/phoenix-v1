var mongoose = require('mongoose');
var Banimentos = mongoose.Schema({
    id: String,
    motivo: String,
    tipo: Number,
    data: Date,
    staff: String
});

/* TIPOS:
* 1 = Bot
* 2 = Global
* 3 = Servidor
*/

module.exports =  mongoose.model('Banimentos', Banimentos);