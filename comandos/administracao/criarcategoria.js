exports.run = async function(client, message, args) {
  let nome = args.join(' ');
  if(nome.length < 2 || !nome.length > 100) return message.reply("Insira um nome maior que 2 e menor que 100 caracteres")
  if(!nome) return client.emit('ajudaComando', message, this.ajuda, this.configuracao);
  await message.guild.createChannel(nome,"category")
  return client.emit("embedDescricao",message,"Categoria criada com sucesso!",false)
}

exports.configuracao = {
    apenasCriador: false,
    modulo: 'administracao',
    aliases: ['createcategory'],
    permissoesNecessarias: ['MANAGE_CHANNELS'],
    permissoesBot: ['MANAGE_CHANNELS']
};

exports.ajuda = {
    nome: 'criarcategoria',
    descricao: 'Crie uma categoria no seu servidor.',
    usar: 'criarcategoria <nome>',
    exemplos: []
};