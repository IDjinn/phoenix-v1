var mongoose = require('mongoose');
var canal = mongoose.Schema({
    id: String,
    comandos: String,
    contarnxp: String,
    contarnivel: String,
    autowarn: String,
    antiraid: String,
    antispamemoji: String,
    antispaminvite: String,
    blacklink: String,
    whitelink: String,
    antispamcaps: String,
    textdup: String,
    antispammention: String //se tem global, isso só vai ser true/false
});
module.exports = mongoose.model('Canais', canal);