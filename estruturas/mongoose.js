const { connect } = require('mongoose')
module.exports = class DatabaseManager{
    constructor(config){
        this.usuario = config.usuario;
        this.senha = config.senha;
        this.link = config.link;
        this.init()
    }
    init(){
        connect(`mongodb://${this.usuario}:${this.senha}@${this.link}`,{ useNewUrlParser: true,
            reconnectTries: Number.MAX_VALUE, 
            reconnectInterval: 1000,
            keepAlive: 1, 
            connectTimeoutMS: 30000, }).then(c => {
            console.log('Concectado à Database!')
        }).catch(e => {
            console.log(`Ocorreu um erro ao contectar à database: ${e.message}`)
        })
    }
}