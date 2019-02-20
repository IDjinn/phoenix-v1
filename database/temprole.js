var mongoose = require('mongoose');
var Role = mongoose.Schema({
    servidor: String,
    roleid: String,
    userid: String,
    criadoem: String,
    expiraem: String,
    expirado: String
});


module.exports = mongoose.model('Roles', Role);