module.exports = new (class DarCargo {
  constructor(){
        this.apenasCriador = false,
        this.modulo = 'moderacao',
        this.aliases = ['giverole','addrole'],
        this.permissoesNecessarias = ['MANAGE_ROLES'],
        this.permissoesBot = ['MANAGE_ROLES'],
        this.name = 'darcargo',
        this.descricao = 'Dê um cargo à alguém!',
        this.usar = 'darcargo <@user> <@cargo>',
        this.exemplos = ['@Djinn @Membros']
  }
async run(client, message, args) {
  let usuario = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.member
  if(!usuario) return client.emit('ajudaComando', message, this)
  let cargo = message.mentions.roles.first()
  let novoCargo = message.guild.roles.find(c => c.name == cargo);
  if(!novoCargo)return client.emit("embedDescricao",message,"Não consegui encontrar esse cargo!",true)
  if(usuario.roles.has(novoCargo.id)) return client.emit("embedDescricao",message,"Esse usuário já tem esse cargo!",true)
  await(usuario.addRole(novoCargo.id));
  return message.reply(`O usuário ${usuario.username}, ganhou o cargo ${novoCargo.name}!`)
}
})