exports.run = async function(client, message, args) {
    let usuario = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!usuario) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
    let cargo = message.mentions.roles.first()
    let novoCargo = message.guild.roles.find(c => c.name == cargo);
    if(!novoCargo) return client.emit("embedDescricao",message,"Não consegui encontrar esse cargo!",true)
    if(!usuario.roles.has(novoCargo.id)) return client.emit("embedDescricao",message,"Esse usuário não tem esse cargo!",true)
    await(usuario.removeRole(novoCargo.id));
    return client.emit("embedDescricao",message,`O usuário ${usuario.username}, perdeu o cargo ${novoCargo.name}!`,false)
  }
  
  exports.configuracao = {
      apenasCriador: false,
      modulo: 'especiais',
      aliases: ['takerole','removerole'],
      permissoesNecessarias: ['ADM'],
      permissoesBot: ['MANAGE_ROLES']
  };
  
  exports.ajuda = {
      nome: 'removercargo',
      descricao: 'Tire um cargo à alguém!',
      usar: 'removercargo @user @cargo',
      exemplos: ['@Djinn @Membros']
  };