const util = require('../../utilitarios/util.js')
module.exports.run = async (client,message,args) => {
    let usuario = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!usuario) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
    if(usuario == message.member) return client.emit("embedDescricao",message,"Você não pode usar esse comando em sí mesmo.",true)
    if(usuario.highestRole.position >= message.member.highestRole.position) return client.emit("embedDescricao",message,"Você não pode silenciar esse usuário porque ele tem cargo mais alto que o seu.",true)
    let role = message.guild.roles.find(r => r.name === "Silenciado");
    
    if(!role){try{ role = await message.guild.createRole({ name: "Silenciado",color: "#000000",permissions: []});
    message.guild.channes.forEach(async (channel,id) => { await channel.overwritePermissions(role,{ SEND_MESSAGES: false, ADD_REACTIONS: false})});}
    catch {return client.emit("embedDescricao",message,"Ocorreu um erro quando tentei criar o cargo de Silenciados.",true)}}
    
    if(usuario.roles.has(role.id)) return client.emit("embedDescricao",message,"Esse usuário já está silenciado!",true)

    let tempo = 0
    const filtro = m => m.author.id == message.author.id 
    message.reply("Por quanto tempo você deseja silenciar esse usuário? Exemplos: `1 dia`, `5 horas`, `2 minutos`. Caso deseja cancelar, `cancelar`")
    await message.channel.awaitMessages(filtro, { max: 1, time: 60000, errors: ['time'] })
      .then(async c => {
        tempo = await util.converterData(c.first().content)
        })
      .catch(e => {client.emit("embedDescricao",message,"Você não definiu o tempo.",true)
        tempo = 29030400 * 1000
    });
    
    await usuario.addRole(role)

    let motivo = args.slice(1).join(" ");

    if(!motivo) motivo = 'Motivo não expecificado!'

    tempo = Date.now() + tempo

    await util.mutar(message.guild.id,usuario.id,tempo,motivo,message.author.id,'false')
                client.silenciados[usuario.id] = {
                    id: usuario.id,
                    servidor: message.guild.id,
                    role: role.id,
                    tempo: tempo,
                    bot: false
                }
                util.punir(message.guild.id, usuario.id, motivo, message.author.id, 2, 'false', client)
                return client.emit("embedDescricao",message,"Usuário silenciado com sucesso!",false)
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'moderacao',
    aliases: ['silenciar'],
    permissoesNecessarias: ['MOD'],
    permissoesBot: ['MANAGE_ROLES']
};

exports.ajuda = {
    nome: 'mute',
    descricao: 'Silencie o usuário do servidor.',
    usar: 'mute [usuário] [tempo em segundos] [motivo]',
    exemplos: ['Djinn cansei dele','@Mee6 SPAM']
};