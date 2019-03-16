const { Collection } = require('discord.js')
const path = require('path')
const moment = require('moment')
const similar = require('string-similarity')
module.exports = class ComandManager {
    constructor(local = this.local, modulos = true){
        this.local = local;
        this.modulos = modulos;
        this.comandos = new Collection();
        this.aliases = new Collection();
        this.cooldown = new Collection();
        this.init();
    }
    reload(){
        this.comandos = new Collection();
        this.aliases = new Collection();
        this.cooldown = new Collection();
        this.init();
    }
    init(){
        let modulos = fs.readdirSync(this.local).filter(file => fs.statSync(path.join(this.local, file)).isDirectory());
        let totalCmd = 0;
        //Carregar arquivos de comandos
        for(let modulo of modulos){
            fs.readdir(`${this.local}${modulo}/`, (err, arquivos) => {
            if (err) console.error(err);
                arquivos.forEach(cmd => {
                    totalCmd = totalCmd + 1;
                    let comando = require(`${this.local}${modulo}/${cmd}`);
                    console.log(`[${moment().format('HH:mm:ss')}] Carregando comando: "${comando.nome}"...`);
                    this.comandos.set(comando.nome, comando);
                    comando.aliases.forEach(alias => {
                    this.aliases.set(alias, comando.nome);
                });
            });
        })}
        console.log(`Carregando ${totalCmd} comandos`);
    }
    async similares(comando){
        let comandos = [];
        let aliases = [];
        for (let key of this.aliases.keys()) {
            await aliases.push(key);
        }
        await this.comandos.forEach(c => {
            if(similar.compareTwoStrings(c.nome.toString(), comando.toString()) > 0.65) comandos.push(c.nome.toString());
        }); 
        await aliases.forEach(a => {
            if(similar.compareTwoStrings(a.toString(), comando.toString()) > 0.65) comandos.push(a.toString());
        })
        return comandos;
    }
    async comando(message){
        let client = message.client
        let servidor = message.guild.dados
        let prefixo = servidor.prefixo
      
        if(message.guild) if(message.content.startsWith(message.guild.me.toString()) && message.content.length <= 22) return client.emit("oopsEmbed",message,`Olá, meu nome é Phoenix, meu prefixo nesse servidor é \`${servidor.prefixo}\` e para ver todos os meus comandos use \`${servidor.prefixo}ajuda\`!`,false)
          
        let args = message.content.split(' ');
        let command = args.shift().slice(prefixo.length);
        if(command) command = command.toLowerCase()
      
        if (!message.content.startsWith(prefixo) && !message.content.startsWith(message.guild.me.toString())) return;
      
          
        try {
            let cmd = this.comandos.get(command) || this.comandos.get(this.aliases.get(command))
            if(!cmd){
                let mensagem = await comandosSimilares(command)
                if(mensagem.length > 0){
                mensagem = mensagem.join('\n•')
                const similares = new Discord.RichEmbed()
                .setTitle(`Oops!`)   
                .setColor('#ffffff')
                .setDescription(`Não encontrei esse comando, talvez você queria ter dito..\`\`\`${mensagem}\`\`\``)
                return message.reply(similares)
                }
                message.react('538036569060278273').catch()
            }
            else {
                if(servidor.canais.comandos != "false"){
                    if(message.channel.id != servidor.canais.comandos && message.member.permissoesServidor == 0){
                        await message.delete().catch()
                        return client.emit("oopsEmbed",message,`Você só pode usar comandos no canal <#${servidor.canais.comandos}>!`,true)
                    }
                }/*
                if(message.author.nbanido && !jaAvisado.has(message.author.id)){
                    await message.delete().catch()
                    jaAvisado.add(message.author.id)
                    const embed = new Discord.RichEmbed()
                    .setTitle(`Oops!`)   
                    .setColor('#ffffff')
                    .setDescription("Você foi banido de minhas funcionalidades!")
                    return await message.reply(embed).then(msg => { msg.delete(3000) }).catch(/*ERRO!)
                }*/
               
                  //Temporizador de Comando
                if (this.cooldown[message.author.id]){
                    message.delete().catch()
                    if(!jaAvisado.has(message.author.id)){
                    jaAvisado.add(message.author.id)
                    let falta = this.cooldown[message.author.id].tempo / 1000
                    if(falta < 1) falta = 'alguns milisegundos' 
                    else falta += ' segundos'
                    const embed = new Discord.RichEmbed()
                    .setColor('#ffffff')
                    .setDescription(`Você deve esperar mais \`${falta}\` para executar outro comando. Quando esse tempo acabar, reaja com ↩ para executar o comando novamente.`)
                    message.reply(embed).then(async m =>{
                        await sleep(tempo);
                        m.react('↩').catch()
                        const filter = (reaction, user) => reaction.emoji.name == '↩' && user.id === message.author.id
                        const collector = m.createReactionCollector(filter, { time: 60000 });
                        collector.on('collect', async () => {
                            await m.delete().catch()
                            return client.emit('message',message)
                        })
                    })
                }
                return
              }
              if(message.author.id != '376460601909706773'){
                this.cooldown.set(message.author.id,Date.now() + 4000);
                setTimeout(() => {
                    delete this.cooldown[message.author.id];
                    jaAvisado.delete(message.author.id);
                }, 4000);
              }
      
                if(cmd.apenasCriador == true && message.author.id != '376460601909706773'){
                    await message.delete().catch()
                    return client.emit("oopsEmbed",message,"Apenas o criador tem permissão para executar esse comando!",true)
                }
      
                if(cmd.permissoesNecessarias){
                    if (util.permissao(message,cmd.permissoesNecessarias) == false  && message.author.id != '376460601909706773'){
                    await message.delete().catch()
                    return client.emit("oopsEmbed",message,`Você precisa de alguma permissão como \`${map(p => permissoes[cmd.permissoesNecessarias[p]]).join(', ')}\` para poder usar esse comando!`,true)
                    }
                }
      
                if(cmd.permissoesBot){
                    if (util.permissaoBot(message,cmd.permissoesBot) == false/* && message.author.id != '376460601909706773'*/){
                    await message.delete().catch()
                    return client.emit("oopsEmbed",message,`Eu preciso ter permissão de \`${map(p => permissoes[cmd.permissoesBot[p]]).join(', ')}\` para poder executar esse comando!`,true)
                    }
                }
      
                let ads = Math.floor((Math.random()* 100)+1)
                if(ads == 1) message.reply(`Ajude a espalhar minhas funcionalidades para outros servidores! envie para seus amigos meu link usando ${prefixo}convite, para que possam me adicionar!`)
                cmd.run(client, message, args);
                client.comandosExe = client.comandosExe + 1
                //message.delete().catch()
              }
          }
              catch (err) {
              console.log(err)
              message.delete().catch()
              return client.emit("oopsEmbed",message,'Ocorreu algum erro ao executar esse comando!',true)
          }
    }
}