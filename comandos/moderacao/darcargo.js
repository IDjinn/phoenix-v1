exports.run = async function(client, message, args) {
  let usuario = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.member
  if(!usuario) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
  let cargo = message.mentions.roles.first()
  let novoCargo = message.guild.roles.find(c => c.name == cargo);
  if(!novoCargo)return client.emit("embedDescricao",message,"Não consegui encontrar esse cargo!",true)
  if(usuario.roles.has(novoCargo.id)) return client.emit("embedDescricao",message,"Esse usuário já tem esse cargo!",true)
  await(usuario.addRole(novoCargo.id));
  return message.reply(`O usuário ${usuario.username}, ganhou o cargo ${novoCargo.name}!`)
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'moderacao',
    aliases: ['giverole','addrole'],
    permissoesNecessarias: ['MANAGE_ROLES'],
    permissoesBot: ['MANAGE_ROLES']
};

exports.ajuda = {
    nome: 'darcargo',
    descricao: 'Dê um cargo à alguém!',
    usar: 'darcargo <@user> <@cargo>',
    exemplos: ['@Djinn @Membros']
};