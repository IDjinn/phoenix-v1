var mongoose = require('mongoose');
var canal = mongoose.Schema({
    id: String,
    contadormembro: String,
    contadorbot: String,
    comandos: String,
    niveis: String,
    autowarn: String,
    antiraid: String,
    antispamemoji: String,
    antispaminvite: String,
    blacklink: String,
    whitelink: String,
    antispamcaps: String,
    textdup: String,
    antispammention: String, //se tem global, isso só vai ser true/false
    counterm: String,
    counterb: String
});
module.exports = mongoose.model('Canais', canal);