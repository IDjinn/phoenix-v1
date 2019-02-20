var mongoose = require('mongoose');
var Local = mongoose.Schema({
    servidor: String,
    id: String,
    xp: Number,
    level: Number,
    moedas: Number
});


module.exports = mongoose.model('Locais', Local);