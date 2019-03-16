const Users = require('../database/usuario.js')

module.exports = class UserManager{
    constructor(client){
        this.client = client;
        this.users = [];
        this.init();
    }
    init(){
        Users.find({},(erro,usuarios) => {
            if(usuarios) usuarios.forEach(usuario => this.users.push(new User(usuario,this.client)))
        })
        console.log(`[USERMANAGER] Iniciado com sucesso`)
    }
}

class User {
    constructor(usuario, client){
        this.client = client;
        this.id = usuario.id,
        this.level = usuario.level,
        this.xp = usuario.xp,
        this.moedas = usuario.moedas,
        this.rep = usuario.rep,
        this.sobremim = usuario.sobremim,
        this.criado = usuario.criado,
        this.motivoAfk = usuario.motivoAfk,
        this.recompensas = {
            diaria = {
                tempo = usuario.diaria.tempo,
                bonus = usuario.diaria.bonus,
                record = usuario.diaria.record
            }
        }

        this.init()
    }
    init(){
        this.client.users.get(this.id).dados = this;
    }
}


Silenciados.find({}, function(err, usuarios) {
    console.log(`Carregando ${usuarios.length} usuários silenciados!`)
    usuarios.forEach(async function(u) {
        client.silenciados[u.id] = {
          id: u.id,
          servidor: u.guild,
          tempo: u.tempo,
          motivo: u.motivo,
          staff: u.staff,
          bot: u.bot,
          expirado: u.expirado,
          removidoPor: u.removidoPor
        }
        let s = {
            id: u.id,
            servidor: u.guild,
            tempo: u.tempo,
            motivo: u.motivo,
            staff: u.staff,
            bot: u.bot,
            expirado: u.expirado,
            removidoPor: u.removidoPor
        }
        let g = await client.guilds.get(u.guild)
        if(!g.silenciados) g.silenciados = new Collection()
        g.silenciados[u.id] = s
      });  
    });