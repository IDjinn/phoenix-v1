exports.run = async function(client, message, args) {
let cargo = message.mentions.roles.first() || message.guild.roles.get(args.join(' '))
    if(!cargo) return client.emit("embedDescricao",message,"Você deve definir o cargo que deseja dar a todos!",true)
    let func = args[1]
    let total = 0
    let erros = 0
if(func == "adicionar"){
    message.guild.members.forEach(async u => { u.addRole(cargo.id).then(total = total + 1) })
    if(erros > 0) return client.emit("embedDescricao",message,"Foram dados " + total + " cargos, mas não consegui dar à " + erros + " usuários!",false)
}
else if(func == 'remover') { message.guild.members.forEach(async u => { u.removeRole(cargo.id).then(total = total + 1).catch(erros = erros + 1) })
return client.emit("embedDescricao",message,"Foram removidos um total de " + total + " cargos!",false)}
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'administracao',
    aliases: ['globalcargo','massrole'],
    permissoesNecessarias: ['ADM'],
    permissoesBot: ['MANAGE_ROLES']
};

exports.ajuda = {
    nome: 'cargoglobal',
    descricao: 'Dê a todos os membros do seu servidor um cargo!',
    usar: 'cargoglobal @cargo <adicionar/remover>',
    exemplos: ['@Membros adicionar','@Lindos remover']
};