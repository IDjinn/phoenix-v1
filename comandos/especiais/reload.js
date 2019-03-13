module.exports = new (class Reload {
    constructor(){
            this.apenasCriador = true;
            this.modulo ='especiais';
            this.aliases = ['recarregar'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'reload';
            this.descricao = 'beep boop';
            this.usar = 'reload';
            this.exemplos = []
        }
async run(client, message, args) {
    const constantes = require('../../utilitarios/constantes')
    if(!args[0] || args.join(' ').size < 1) return client.emit("embedDescricao",message,"Defina o nome do comando para reiniciar.",true);
    switch(args[0]){
        case 'eventos':
        case 'evento':
        case 'e':
            for(let e in constantes.modulos.eventos){
            await delete require.cache[require.resolve(constantes.modulos.eventos[e])];
            require(constantes.modulos.eventos[e])
            }
            return message.reply("Todos os eventos foram recarregados!")
            
        case 'utilitarios':
        case 'util':
        case 'u':
            for(let e in constantes.modulos.utilitarios){
            await delete require.cache[require.resolve(constantes.modulos.utilitarios[e])];
            require(constantes.modulos.utilitarios[e])
            }
            return message.reply("Todos os utilitarios foram recarregados!")
            
        case 'modulos':
        case 'm':
            for(let e in constantes.modulos.modulos){
            await delete require.cache[require.resolve(constantes.modulos.modulos[e])];
            require(constantes.modulos.modulos[e])
            }
            return message.reply("Todos os módulos foram recarregados!")

            
        case 'assets':
        case 'a':
            for(let e in constantes.assets.fontes){
            await delete require.cache[require.resolve(constantes.assets.fontes[e])];
            require(constantes.assets.fontes[e])
            }
            for(let e in constantes.assets.imagens){
            await delete require.cache[require.resolve(constantes.assets.imagens[e])];
            require(constantes.assets.imagens[e])
            }
            return message.reply("Todos os assets foram recarregados!")
    }

    const nomeComando = args[0];
    cmd = client.comandos.get(nomeComando) || client.comandos.get(client.aliases.get(nomeComando));
    if(!cmd)  return client.emit("embedDescricao",message,"Esse comando não existe!",true);

    delete require.cache[require.resolve(`../${cmd.modulo}/${cmd.nome}.js`)];
    client.comandos.delete(nomeComando);
                let propriedades = require(`../${cmd.modulo}/${cmd.nome}.js`);
                client.comandos.set(propriedades.nome, propriedades);
                propriedades.aliases.forEach(alias => {
                client.aliases.set(alias, propriedades.nome)
            });
            return client.emit("embedDescricao",message,`O comando ${nomeComando} foi reiniciado com sucesso!`,false);
  };
})