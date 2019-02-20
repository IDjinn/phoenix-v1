var mongoose = require('mongoose');
var Punicoes = mongoose.Schema({
    servidor: String,
    id: String,
    tempo: String,
    motivo: String,
    staff: String,
    tipo: Number,
    bot: String,
    removidoPor: String
});
/*
*   Tipo
*   0 == 'Banimento'
*   1 == 'Expulsão'
*   2 == 'Mute'
*   3 == 'Clear'
*   4 == 'Aviso'
*/

module.exports = mongoose.model('Punicoes', Punicoes);