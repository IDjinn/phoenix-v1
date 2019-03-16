const { Collection } = require('discord.js')

class MembroManager{
    constructor(client, guild){
        this.client = client;
        this.guild = guild;
        this.membros = new Collection();
        this.init()
    }
    init(){
        this.guild.members.forEach(membro => this.membros.set(membro.id ,new Membro(membro)))
        console.log(`[MEMBROMANAGER] Iniciado com sucesso!`)
    }
    reload(){
        this.membros = new Collection();
        this.init();
    }
}