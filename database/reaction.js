var mongoose = require('mongoose');
var Reaction = mongoose.Schema({
    servidor: String,
    emoji: String,
    roleid: String,
    mensagemid: String,
    canal: String,
    apenasUma: String,
    estaMensagem: String
});


module.exports = mongoose.model('Reactions', Reaction);