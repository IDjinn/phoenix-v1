module.exports = new (class CargoGlobal {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='administracao';
            this.aliases = ['globalcargo','massrole'];
            this.permissoesNecessarias = ['ADM'];
            this.permissoesBot = ['MANAGE_ROLES'];
            this.nome = 'cargoglobal';
            this.descricao = 'Dê a todos os membros do seu servidor um cargo!';
            this.usar = 'cargoglobal @cargo <adicionar/remover>';
            this.exemplos = ['@Membros adicionar','@Lindos remover']
        }
async run(client, message, args) {
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
})