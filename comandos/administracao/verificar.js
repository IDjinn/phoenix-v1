const Servidor = require('../../database/servidor.js')
exports.run = async function(client, message, args) {
    message.guild.createChannel('Verificar', 'text').then(
        async (canal) => {
            let cargo = await message.guild.roles.find(r => r.name == "Verificado") || await message.guild.createRole({ name: "Verificado",color: "#000000",permissions: []});
            message.guild.channels.forEach(c => {
                c.overwritePermissions(message.guild.roles.get(message.guild.id),{
                    'VIEW_CHANNEL': false
                });
                c.overwritePermissions(cargo,{
                    'VIEW_CHANNEL': true
                });
            });
                    canal.overwritePermissions(message.guild.roles.get(message.guild.id), {
                        'VIEW_CHANNEL': true
                })
            await canal.overwritePermissions(cargo,{
                'VIEW_CHANNEL': false
            });
            message.guild.createChannel('Como Verificar', 'text').then(
                async (c) => {
                            c.overwritePermissions(message.guild.roles.get(message.guild.id), {
                                'VIEW_CHANNEL': true
                        });
                        c.overwritePermissions(cargo,{
                        'VIEW_CHANNEL': false
                    });
            c.send('Coloque aqui uma mensagem para ajudar os usuários á verificarem.')
            canal.send(`Coloque aqui a mensagem para verificação, e reaja com o emoji ✅ para ativar o sistema de verificação. Eles irão ganhar o cargo <@&${cargo.id}> ao verificarem, poderá trocar nome permissões e etc normalmente.`) 
            Servidor.findOneAndUpdate({id: message.guild.id}, {verificar: canal.id,verificado: cargo.id}, {upsert:false}, function(err, s){
                if (err) return 
                client.servidores[message.guild.id].canais.verificar = canal.id
                return client.servidores[message.guild.id].cargos.verificado = cargo.id
            });
        })}
    )
}

exports.configuracao = {
    apenasCriador: false,
    modulo: 'administracao',
    aliases: ['verify'],
    permissoesNecessarias: ['ADM'],
    permissoesBot: ['MANAGE_CHANNELS','MANAGE_ROLES']
};

exports.ajuda = {
    nome: 'verificar',
    descricao: 'Cria o sistema de verificação no seu servidor.',
    usar: 'verificar',
    exemplos: []
};