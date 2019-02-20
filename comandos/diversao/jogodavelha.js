const Discord = require('discord.js')
var emojis = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣'];
var x = '✖'
var o = '⭕'
const util = require('../../utilitarios/util.js')

async function ver(jogo){
    let r = [
        0,0,0,
        0,0,0,
        0,0,0
    ]
    for(let j in jogo){
        if(jogo[j] == 0) r[j] = emojis[j]
        else if(jogo[j] == 1) r[j] = o
        else if(jogo[j] == 2) r[j] = x
    }
    return r
}

async function mensagem(jogo){
    let r = [
        0,0,0,
        0,0,0,
        0,0,0
    ]
    for(let j in jogo){
        if(jogo[j] == 0) r[j] = emojis[j]
        else if(jogo[j] == 1) r[j] = x
        else if(jogo[j] == 2) r[j] = o
    }
    let f = r[0] + ' | ' + r[1] + ' | ' +  r[2] + "\n" + r[3] + ' | ' + r[4] + ' | ' +  r[5] + "\n" + r[6] + ' | ' + r[7] + ' | ' +  r[8]
    return f
}

async function reagirDisponivel(message,jogo){
    for(let j in jogo){
        if(jogo[j] == 0) await message.react(emojis[j])
    }
}

async function checar(jogo,jogador){
    //✔ | ✔ | ✔
    //✔ | ✔ | ✔
    //✔ | ✔ | ✔
    //Jogador 1 = O | Jogador 2 = X
    if(jogador == 1){
        //Horizontal
        if(jogo[0] == 1 && jogo[1] == 1 && jogo[2] == 1) return true
        else if(jogo[3] == 1 && jogo[4] == 1 && jogo[5] == 1) return true
        else if(jogo[6] == 1 && jogo[7] == 1 && jogo[8] == 1) return true
        //Vertical
        else if(jogo[0] == 1 && jogo[3] == 1 && jogo[6] == 1) return true
        else if(jogo[1] == 1 && jogo[4] == 1 && jogo[7] == 1) return true
        else if(jogo[2] == 1 && jogo[5] == 1 && jogo[8] == 1) return true
        //Cruzado
        else if(jogo[0] == 1 && jogo[4] == 1 && jogo[8] == 1) return true
        else if(jogo[2] == 1 && jogo[4] == 1 && jogo[6] == 1) return true
        else return false
    }
    else{
        //Horizontal
        if(jogo[0] == 2 && jogo[1] == 2 && jogo[2] == 2) return true
        else if(jogo[3] == 2 && jogo[4] == 2 && jogo[5] == 2) return true
        else if(jogo[6] == 2 && jogo[7] == 2 && jogo[8] == 2) return true
        //Vertical
        else if(jogo[0] == 2 && jogo[3] == 2 && jogo[6] == 2) return true
        else if(jogo[1] == 2 && jogo[4] == 2 && jogo[7] == 2) return true
        else if(jogo[2] == 2 && jogo[5] == 2 && jogo[8] == 2) return true
        //Cruzado
        else if(jogo[0] == 2 && jogo[4] == 2 && jogo[8] == 2) return true
        else if(jogo[2] == 2 && jogo[4] == 2 && jogo[6] == 2) return true
        else return false
    }
}

class Jogo {
    constructor(p1,p2){
        this.x = p1
        this.o = p2
        this.turno = this.x
        this.jogo = [
            0,0,0,
            0,0,0,
            0,0,0
        ]
        this.embed = mensagem(this.jogo)
    }
    jogar(num){
        if(this.jogo[num] != 0) return false
        if(this.turno == this.x) this.jogo[num] = 1
        else if(this.turno == this.o) this.jogo[num] = 2
        this.embed = mensagem(this.jogo)
    }

}
exports.run = async function(client, message, args) {
    let usuario = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!usuario) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);

            let jogando = new Jogo(message.author,usuario)
            const a = new Discord.RichEmbed()
            .setColor('#ffffff')
            .setDescription(`Jogo da Velha\n**Vez de <@${jogando.turno.id}>**\n\n${await jogando.embed}`)
            message.channel.send(a).then(async m =>{
            await reagirDisponivel(m,jogando.jogo)
            let col = m.createReactionCollector((r, u) => emojis.includes(r.emoji.name) && (u.id == message.author.id || u.id == message.mentions.users.first().id || u.id == client.user.id), { time: 1000 * 60 * 10 })
            col.on('collect',async  r => {
                if (r.users.last().id != jogando.turno.id)return
                await r.remove(jogando.turno) && await r.remove(client.user);
                let oi = 0
                if(jogando.turno == usuario) {
                    oi = 1
                    jogando.turno = message.author
                }
                else {
                    oi = 2
                    jogando.turno = usuario
                }
                if (usuario.user.id == client.user.id ? jogando.jogar(emojis.indexOf(r.emoji.name)) : jogando.jogar(emojis.indexOf(r.emoji.name)) == 'g') col.stop();
                if(!checar(jogando.jogo,oi)){
                await a.setDescription(`Jogo da Velha\n**Vez de <@${jogando.turno.id}>**\n\n` + await jogando.embed)
                }
                else{
                    await a.setDescription(`Parabéns, <@${jogando.turno.id}> venceu o jogo!\n\n` + await jogando.embed)
                }
                m.edit(await a)
            })
        })
}

exports.configuracao = {
    apenasCriador: true,
    modulo: 'especiais',
    aliases: ['tictactoe','ttt'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'jogodavelha',
    descricao: 'Inicie o jogo da velha com alguém!',
    usar: 'jogodavelha @usuario',
    exemplos: []
}