const Discord = require('discord.js');
const extras = require('../../utilitarios/extras.js')
module.exports = new (class Ticket {
        constructor(){
                this.apenasCriador = false,
                this.modulo = 'utilitarios',
                this.aliases = [],
                this.permissoesNecessarias = [],
                this.permissoesBot = ['MANAGE_CHANNELS'],
                this.nome = 'ticket',
                this.descricao = 'Criando esse comando!',
                this.usar = 'ticket <novo/fechar> <texto>',
                this.exemplos = ['close','fechar','novo Problemas na minha conta!','novo Minha conta ainda não chegou!']
            }
    async run(client, message, args) {
    var servidor = await message.guild;
    var rand = await Math.floor(Math.random() * 10000 + 1)
    var nomecanal = await "ticket - " + rand
    var nomeCargo = await message.author.username + " - (Ticket#" + rand + ")";
    let tipo = args[0]
    if(!tipo) return client.emit('ajudaComando', message, this)
switch(tipo.toLowerCase()){
    case 'new':
    case 'novo':{
        if(client.ticketsAbertos[message.author.id] != null) return client.emit("embedDescricao",message,"Você já criou um ticket!",true)
        message.guild.createRole({
                name: nomeCargo,
                permissions: []
        }).then(role => {
            message.member.addRole(role,nomeCargo)
            .catch(error => client.catch(error))
        }).catch(error => client.catch(error))
        servidor.createChannel(nomecanal, 'text').then(
            async (chan) => {
                        chan.overwritePermissions(message.guild.roles.find(c => c.name == '@everyone'), {
                        'CREATE_INSTANT_INVITE' : false,        'VIEW_CHANNEL': false,
                        'CONNECT': false,                       'SPEAK': false
                    });
                chan.overwritePermissions(message.guild.roles.find(c => c.name == nomeCargo),{
                'VIEW_CHANNEL': true,                   'CONNECT': true,            'SPEAK': true,
                });
                let cargo = await message.guild.roles.find(c => c.name == nomeCargo)
                client.ticketsAbertos[message.author.id] = {
                    servidor: await message.guild.id,
                    canal: await chan.id,
                    cargo: await cargo.id
                }
                client.emit("embedDescricao",message,"Ticket criado com sucesso, acesse: <#"+chan.id+">!",false)
                if(!args[1] || args[1].length < 1) args[1] = "Mensagem não expeficidada!"
                else args[1] = await args.slice(1).join(" ")
                const embed = new Discord.RichEmbed()
                .setTitle('Novo ticket de '+ message.author.username)   
                .setColor('#ffffff')
                .setThumbnail(message.member.avatarURL)
                .setDescription(args[1])
                .setTimestamp()
                await client.channels.get(chan.id).send({embed})
            }).catch()
        break;
    }

    case 'sair':
    case 'fechar':
    case 'close':{
        if(client.ticketsAbertos[message.author.id].canal != undefined){
            if(message.channel.id == client.ticketsAbertos[message.author.id].canal){
            await message.guild.roles.get(client.ticketsAbertos[message.author.id].cargo).delete().catch()
            await delete client.ticketsAbertos[message.author.id]
            await message.channel.delete().catch()
            }
            else{
                return client.emit("embedDescricao",message,"Esse comando só pode ser usado no mesmo canal do ticket!",true)
            }
        }
        else{ return client.emit("embedDescricao",message,"Você não tem nenhum ticket pendente.",true)}
    }
    default:{
        return client.emit('ajudaComando', message, this)
    }
}
}
})