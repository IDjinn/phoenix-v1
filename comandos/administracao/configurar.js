const Servidor = require('../../database/servidor.js')
const Discord = require('discord.js');
const constantes = require('../../utilitarios/constantes.js')
exports.run = async function(client, message, args) {
    var prefixo = await client.servidores[message.guild.id].prefixo

    let canal = message.mentions.channels.first()
    if(canal){
        canal = canal.id
    }
    else{
        canal = args[0]
    }

    let cargo = message.mentions.roles.first()
    if(cargo){
        cargo = cargo.id
    }
    else{
        cargo = args[0]
    }

    if(canal == "0") canal = "false"
    if(cargo == "0") cargo = "false"

    switch(args[1]){
        case "contadormembros":
        case "contador":{
        if(isNaN(canal) && canal != "false") return client.emit("embedDescricao",message,"Para esse comando, coloque o #canal ou use o ID do canal")
        Servidor.findOneAndUpdate({id: message.guild.id}, {contador: canal}, {upsert:false}, function(err, s){
            if (err) return message.reply("Ocorreu um erro ao tentar salvar essa configuração!")
            client.servidores[message.guild.id].canais.contador = canal
            delete client.configuracoes[message.guild.id]
            return client.emit("embedDescricao",message,"Canal aaaaaa definido para o canal:  <#" + canal + ">!\n\nUse `" + prefixo + "configurar false contador` para remover a configuração!", false)
        });
        break;
    }    
    case "entrada":{
        if(isNaN(canal) && canal != "false") return client.emit("embedDescricao",message,"Para esse comando, coloque o #canal ou use o ID do canal")
        Servidor.findOneAndUpdate({id: message.guild.id}, {test: canal}, {upsert:false}, function(err, s){
            if (err) return message.reply("Ocorreu um erro ao tentar salvar essa configuração!")
            client.servidores[message.guild.id].canais.entrada = canal
            delete client.configuracoes[message.guild.id]
            return client.emit("embedDescricao",message,"Canal de Entrada definido para o canal:  <#" + canal + ">!\n\nUse `" + prefixo + "configurar false entrada` para remover a configuração!", false)
        });
        break;
    }      

    case "sugestao":{
        if(isNaN(canal) && canal != "false") return client.emit("embedDescricao",message,"Para esse comando, coloque o #canal ou use o ID do canal")
        Servidor.findOneAndUpdate({id: message.guild.id}, {sugestao: canal}, {upsert:false}, function(err, s){
            if (err) return message.reply("Ocorreu um erro ao tentar salvar essa configuração!")
            client.servidores[message.guild.id].canais.sugestao = canal
            client.canalSugestao.add(canal)
            delete client.configuracoes[message.guild.id]
            return client.emit("embedDescricao",message,"Canal de Sugestões definido para o canal:  <#" + canal + ">!\n\nUse `" + prefixo + "configurar false sugestao` para remover a configuração!", false)
        });
        break;
    }       

    case "saida":{
        if(isNaN(canal) && canal != "false") return client.emit("embedDescricao",message,"Para esse comando, coloque o #canal ou use o ID do canal")
        Servidor.findOneAndUpdate({id: message.guild.id}, {saida: canal}, {upsert:false}, function(err, s){
            if (err) return message.reply("Ocorreu um erro ao tentar salvar essa configuração!")
            client.servidores[message.guild.id].canais.saida = canal
            delete client.configuracoes[message.guild.id]
            return client.emit("embedDescricao",message,"Canal Saída definido para o canal:  <#" + canal + ">!\n\nUse `" + prefixo + "configurar false saida` para remover a configuração!", false)
        });
        break;
    }

    case "logs":{
        if(isNaN(canal) && canal != "false") return client.emit("embedDescricao",message,"Para esse comando, coloque o #canal ou use o ID do canal")
        Servidor.findOneAndUpdate({id: message.guild.id}, {logs: canal}, {upsert:false}, function(err, s){
            if (err) return message.reply("Ocorreu um erro ao tentar salvar essa configuração!")
            client.servidores[message.guild.id].canais.logs = canal
            delete client.configuracoes[message.guild.id]
            return client.emit("embedDescricao",message,"Canal Logs definido para o canal:  <#" + canal + ">!\n\nUse `" + prefixo + "configurar false logs` para remover a configuração!", false)
        });
        break;
    }

    case "niveis":{
        if(isNaN(canal) && canal != "false") return client.emit("embedDescricao",message,"Para esse comando, coloque o #canal ou use o ID do canal")
        Servidor.findOneAndUpdate({id: message.guild.id}, {niveis: canal}, {upsert:false}, function(err, s){
            if (err) return message.reply("Ocorreu um erro ao tentar salvar essa configuração!")
            client.servidores[message.guild.id].canais.niveis = canal
            delete client.configuracoes[message.guild.id]
            return client.emit("embedDescricao",message,"Canal Niveis definido para o canal:  <#" + canal + ">!\n\nUse `" + prefixo + "configurar false niveis` para remover a configuração!", false)
        });
        break;
    }

    case "mod":
    case "auto-mod":
    case "automod":{
        if(args[0] != "true" && args[0] != "false") return client.emit("embedDescricao",message,"Para esse comando, use true/false")
        let a = true
        if(args[0] == "false") a = false
        else a = true
        Servidor.findOneAndUpdate({id: message.guild.id}, {automod: a}, {upsert:false}, function(err, s){
            if (err) return message.reply("Ocorreu um erro ao tentar salvar essa configuração!")
            client.servidores[message.guild.id].automod = a
            delete client.configuracoes[message.guild.id]
            return client.emit("embedDescricao",message,"Auto-Moderação `"+a+"`!\n\nUse `" + prefixo + "configurar false automod` para remover a configuração!", false)
        });
        break;
    }
    case "inicial":{
        if(isNaN(cargo) && cargo != "false") return client.emit("embedDescricao",message,"Para esse comando, coloque o @cargo ou use o ID do cargo")
        Servidor.findOneAndUpdate({id: message.guild.id}, {incial: cargo}, {upsert:false}, function(err, s){
            if (err) return message.reply("Ocorreu um erro ao tentar salvar essa configuração!")
            client.servidores[message.guild.id].canais.incial = cargo
            delete client.configuracoes[message.guild.id]
            return client.emit("embedDescricao",message,"Cargo Inicial definido para:  <@&" + cargo + ">!\n\nUse `" + prefixo + "configurar false inciail` para remover a configuração!", false)
        });
        break;
    }
    case "comandos":{
        if(isNaN(canal) && canal != "false") return client.emit("embedDescricao",message,"Para esse comando, coloque o #canal ou use o ID do canal")
        Servidor.findOneAndUpdate({id: message.guild.id}, {comandos: canal}, {upsert:false}, function(err, s){
            if (err) return message.reply("Ocorreu um erro ao tentar salvar essa configuração!")
            client.servidores[message.guild.id].canais.comandos = canal
            delete client.configuracoes[message.guild.id]
            return client.emit("embedDescricao",message,"Canal Comandos definido para o canal:  <#" + canal + ">!\n\nUse `" + prefixo + "configurar false comandos` para remover a configuração!", false)
        });
        break;
    }
    case "verificar":{
        if(isNaN(canal) && canal != "false") return client.emit("embedDescricao",message,"Para esse comando, coloque o #canal ou use o ID do canal")
        Servidor.findOneAndUpdate({id: message.guild.id}, {verificar: canal}, {upsert:false}, function(err, s){
            if (err) return message.reply("Ocorreu um erro ao tentar salvar essa configuração!")
            client.servidores[message.guild.id].canais.verificar = canal
            delete client.configuracoes[message.guild.id]
            return client.emit("embedDescricao",message,"Canal Verificar definido para o canal:  <#" + canal + ">!\n\nUse `" + prefixo + "configurar false verificar` para remover a configuração!", false)
        });
        break;
    }
    case "verificado":{
        if(isNaN(cargo) && cargo != "false") return client.emit("embedDescricao",message,"Para esse comando, coloque o @cargo ou use o ID do cargo")
        Servidor.findOneAndUpdate({id: message.guild.id}, {verificado: cargo}, {upsert:false}, function(err, s){
            if (err) return message.reply("Ocorreu um erro ao tentar salvar essa configuração!")
            client.servidores[message.guild.id].cargos.verificado = cargo
            delete client.configuracoes[message.guild.id]
            return client.emit("embedDescricao",message,"Cargo Verificado definido como:  <@&" + cargo + ">!\n\nUse `" + prefixo + "configurar false contador` para remover a configuração!", false)
        });
        break;
    }/*
    case "vip":
    if(message.author.id == '376460601909706773'){
        if(isNaN(canal) && canal != "false") return client.emit("embedDescricao",message,"Para esse comando, coloque o #canal ou use o ID do canal")
        Servidor.findOneAndUpdate({id: message.guild.id}, {contador: canal}, {upsert:false}, function(err, s){
            if (err) return message.reply("Ocorreu um erro ao tentar salvar essa configuração!")
            client.servidores[message.guild.id].canais.contador = canal
            delete client.configuracoes[message.guild.id]
            return client.emit("embedDescricao",message,"Canal aaaaaa definido para o canal:  <#" + canal + ">!\n\nUse `" + prefixo + "configurar false contador` para remover a configuração!", false)
        });
        break;
    }*/

    case "prefixo":
    Servidor.findOneAndUpdate({id: message.guild.id}, {prefixo: canal}, {upsert:false}, function(err, s){
        if (err) return message.reply("Ocorreu um erro ao tentar salvar essa configuração!")
        client.servidores[message.guild.id].prefixo = args[0]
        delete client.configuracoes[message.guild.id]
        return client.emit("embedDescricao",message,"Prefixo definido para: `" + args[0] + "`!\n\nUse `" + prefixo + "configurar > prefixo` para remover a configuração!", false)
    });
    break;
    

    case "lista":
    default:
    
    if(client.configuracoes[message.guild.id]) return message.channel.send(client.configuracoes[message.guild.id])

    let niveis = client.servidores[message.guild.id].canais.niveis
    let logs  = client.servidores[message.guild.id].canais.logs
    let sugestao  = client.servidores[message.guild.id].canais.sugestao
    let entrada  = client.servidores[message.guild.id].canais.entrada
    let saida  = client.servidores[message.guild.id].canais.saida
    let contador  = client.servidores[message.guild.id].canais.contador
    let comandos  = client.servidores[message.guild.id].canais.comandos
    let canalVerificar = client.servidores[message.guild.id].canais.verificar
    let cargoVerificado = client.servidores[message.guild.id].cargos.verificado
    let vip  = client.servidores[message.guild.id].vip
    let automod  = client.servidores[message.guild.id].automod
    let ativado = constantes.assets.emojis.enabled + " Ativado! "
    let desativado = constantes.assets.emojis.disabled + " Desativado! "
    
    if(niveis != "false") niveis = ativado + "<#" + niveis + ">"
    if(sugestao != "false") sugestao = ativado + "<#" + sugestao + ">"
    if(logs != "false")  logs = ativado + "<#" + logs + ">"
    if(entrada != "false")   entrada = ativado + "<#" + entrada + ">"
    if(saida != "false") saida = ativado + "<#" + saida + ">"
    if(canalVerificar != "false") canalVerificar = ativado + "<#" + canalVerificar + ">"
    if(cargoVerificado != "false") cargoVerificado = ativado + "<@&" +cargoVerificado + ">"
    if(contador != "false")  contador = ativado + "<#" + contador + ">"
    if(comandos != "false")  comandos = ativado + "<#" + comandos + ">"
    if(vip ==  true)  vip = ativado + "\nO servidor é VIP!"
    if(automod == true)  automod = ativado + "\nAuto-Moderação está ativa no servidor."
    if(prefixo != ">")  prefixo = ativado + "\nPrefixo atual: `" + prefixo + "`"

    if(niveis == "false") niveis = desativado
    if(logs == "false")  logs = desativado
    if(sugestao == "false")  sugestao = desativado
    if(entrada == "false")   entrada = desativado
    if(saida == "false") saida = desativado
    if(contador == "false")  contador = desativado
    if(comandos == "false")  comandos = desativado
    if(canalVerificar == "false")  canalVerificar = desativado
    if(cargoVerificado == "false")  cargoVerificado = desativado
    if(vip == false)  vip = constantes.assets.emojis.disabled + " Não-VIP\nEsse servidor não é VIP!"
    if(automod == false)  automod = constantes.assets.emojis.disabled + " Desativado\nAuto-Moderação não está ativa no servidor!"
    if(prefixo == ">") prefixo = constantes.assets.emojis.disabled + " Prefixo Padrão\nO prefixo não foi alterado ainda, o padrão é `>`!"
    else{prefixo = constantes.assets.emojis.disabled + " Algo deu errado ao tentar ver o prefixo!"}
    
    
message.reply("Ei! Informamos que atualmente esse comando foi desativado, ainda é \"funcional\", mas se quiser configurar de forma mais prática use o nosso {site}!")
    const embed2 =  new Discord.RichEmbed()
        .setTitle('◘ Lista de Configurações ◘')   
        .setColor('#ffffff')
        .addField(`Canal Níveis`,`${niveis}`)
        .addField(`Canal Logs`,`${logs}`)
        //.addField(`Canal Entrada`,`${entrada}`)
        //.addField(`Canal Saída`,`${saida}`)
        .addField(`Canal Contador`,`${contador}`)
        .addField(`Canal Comandos`,`${comandos}`)
        .addField(`Canal Sugestão`,`${sugestao}`)
        .addField(`Canal Verificar`,`${canalVerificar}`)
        .addField(`Cargo Verificado`,`${cargoVerificado}`)
        .addField(`Servidor VIP?`,`${vip}`)
        .addField(`Auto-Moderação`,`${automod}`)
        .addField(`Prefixo`,`${prefixo}`)
        .setDescription(`**${message.author.username}** aqui está todas as configurações, para editá-las, use >configurar (#canal/@cargo/id) <tipo>\nPara desativar, use >config false <tipo>`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp()
        message.channel.send(embed2)
/*
        const filtro = m => m.author.id == message.author.id && (m.content == "Sim" || m.content == "Não" 
        || m.content == "não" || m.content == "nao" || m.content == "n" || m.content == "sim" ||
        m.content == "s")

        message.reply("Você deseja configurar de um modo mais fácil? Diga: `Sim/Não`")
        await message.channel.awaitMessages(filtro, { max: 1, time: 60000, errors: ['time'] })
          .then(c => {
              c.first().reply("Defina o canal níveis:")
            })
          .catch();

          const filtru = m => m.author.id == message.author.id 
        await message.channel.awaitMessages(filtru, { max: 1, time: 60000, errors: ['time'] })
        .then(c => {
            let c = c.firtst()
            let canal = client.channels.find()
          })
        .catch();
*/

        client.configuracoes[message.guild.id] = embed2
    
    break;
}
}

exports.configuracao = {
    apenasCriador: false,
    modulo: 'administracao',
    aliases: ['config'],
    permissoesNecessarias: ['MANAGE_GUILD','MANAGE_ROLES'],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'configurar',
    descricao: 'Mostra/Edita as configurações do servidor para o Phoenix.',
    usar: 'configurar [tipo] [valor]',
    exemplos: ['#canal-contador contador','#entrada entrada','lista','@Verificado verificado']
};