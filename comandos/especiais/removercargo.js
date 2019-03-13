  module.exports = new (class RemoverCargo {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='especiais';
            this.aliases = ['takerole','removerole'];
            this.permissoesNecessarias = ['ADM'];
            this.permissoesBot = ['MANAGE_ROLES'];
            this.nome = 'removercargo';
            this.descricao = 'Tire um cargo à alguém!';
            this.usar = 'removercargo @user @cargo';
            this.exemplos = ['@Djinn @Membros']
        }

async run(client, message, args) {
    let usuario = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!usuario) return client.emit('ajudaComando', message, this)
    let cargo = message.mentions.roles.first()
    let novoCargo = message.guild.roles.find(c => c.name == cargo);
    if(!novoCargo) return client.emit("embedDescricao",message,"Não consegui encontrar esse cargo!",true)
    if(!usuario.roles.has(novoCargo.id)) return client.emit("embedDescricao",message,"Esse usuário não tem esse cargo!",true)
    await(usuario.removeRole(novoCargo.id));
    return client.emit("embedDescricao",message,`O usuário ${usuario.username}, perdeu o cargo ${novoCargo.name}!`,false)
  }
})