const Servidores = require('../database/servidor.js')
const { Servidor } = require('../estruturas/index.js')
const { Collection } = require('discord.js')

module.exports = class ServerManager{
    constructor(client){
        this.servers = new Collection();
        this.client = client;
        this.init();
    }
    init(){
        Servidores.find({},(erro, servidores) => {
            if(servidores) servidores.forEach(servidor => this.servers.set(servidor.id, new Servidor(servidor)))
        })
    }
}