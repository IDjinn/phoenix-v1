const { Collection } = require('discord.js')
module.exports = class AntiRaidManager {
    constructor(client){
        this.client = client;
        this.users = new Collection();
        this.init()
    }
    init(){
        this.client.users.forEach(user => {
            user.raid = {
                porcentagem: 0,
                tempo: Date.now()
            }
            this.users.push(user);
        });
        console.log(`[ANTI-RAID] Inicializado com sucesso!`)
    }
    verificar(message) { new RaidMessage(message) }
    reload(){
        this.users = new Collection();
        this.init()
    }
}

class RaidMessage{
    constructor(message){
        this.message = message;
        this.convitesencontrados = 0;
        this.linksencontrados = 0;
        this.mencoesenconradas = 0;
        this.everyonehere = 0;
        this.usuario = this.message.user.raid;
        this.porcentagem = this.usuario.porcentagem;
        this.tempo = this.usuario.tempo;
    }
    async verificar(){
        this.convitesencontrados = this.message.content.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
        this.linksencontrados = this.message.content.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/gi) || []
        this.mencoesenconradas = (this.message.mentions.users.size + this.message.mentions.members.size + this.message.mentions.roles.size + this.message.mentions.channels.size)
        this.everyonehere = (this.message.content.match("@everyone") || []) + (this.message.content.match("@here") || [])
        
        this.convitesencontrados = this.convitesencontrados.length
        this.linksencontrados = this.linksencontrados.length
        this.everyonehere = this.everyonehere.length
    
        if(this.convitesencontrados == this.linksencontrados) this.linksencontrados = 0
        
        //Caso o usuário não tiver avatar...
        let avatar = false
        if(this.message.author.avatarURL == null) {
            avatar = true
            this.porcentagem += SemAvatar
        }//Soma nas %!
    
        //Caso encontre convite...
        if(this.convitesencontrados > 1){
            this.porcentagem += MensagemComConvite//Seta a porcentagem
            if(this.convitesencontrados > 5) this.porcentagem += (MultiplicadorConvite * this.convitesencontrados)//Multiplica a porcentagem
        }
    
        //Caso encontre link...
        if(this.linksencontrados > 1){
            this.porcentagem += MensagemComLink//Seta a porcentagem
            if(this.linksencontrados > 5) this.porcentagem += (MultiplicadorLink * this.linksencontrados)//Multiplica a porcentagem
        }
    
        //Caso encontre everyone ou here...
        if(this.everyonehere > 1){
            this.porcentagem += MensagemTentarMencionarEveryone//Seta a porcentagem
            if(this.everyonehere > 5) this.porcentagem += (MultiplicadorMencao * this.everyonehere)//Multiplica a porcentagem
        }
    
        //Caso encontre mencoes...
        if(this.mencoesenconradas > 1){
            this.porcentagem += MensagemTentarMencionarCargos//Seta a porcentagem
            if(this.mencoesenconradas > 5) this.porcentagem += (MultiplicadorMencao * this.mencoesenconradas)//Multiplica a porcentagem
        }
    
        let qnt = await util.fetchMessages(this.message.channel,15,c => c.content == this.message.content)
            if(qnt > MensagensIguaisQuantidade){
            this.porcentagem += (this.porcentagem * MultiplicadorMensagensIguais)
        }
    
        let awe = await util.fetchMessages(this.message.channel,5,c => c.author.id == this.message.author.id)
            if(awe == 5){
            this.porcentagem += (this.porcentagem * MultiplicadorMensagensSeguidas)
            }
    
        //Mensagem muito rápida
        let rapida = false
        if(this.message.content.length / 7 >= Math.abs(this.message.author.typingDurationIn(this.message.channel) / 1000)) {
            this.porcentagem += MensagemRapida
            rapida = true
        }
    
        //Mensagem com Anexos
        let anexos = false
        if(this.message.attachments.size > 0) {
            this.porcentagem += MensagemComAnexos
            anexos = true
        }
        
        //Caso for alguém com cargo alto, não dar %
        if(this.message.member.permissoesServidor > 0) this.porcentagem = 0;

        if(this.porcentagem >= 75){
            if(this.message.guild.dados.automod){
                try{await this.message.member.ban("Raider")}catch{ this.message.member.ban("RAID!").catch(client.channels.get(constantes.phoenix.automod)
                .send("Não consegui banir usuário " + this.message.author.id + " ele atingiu " + this.porcentagem + "% de ser raider!"))}
            }
            let invite  = await this.message.channel.createInvite()
            const embedRaid =  new Discord.RichEmbed()
            .setTitle('🔔 ALERTA 🔔')   
            .setColor('#ffffff')
            .setThumbnail(this.message.author.avatarURL)
            .setDescription(`**${this.message.author.username}** parece estar tentando atacar o servidor \`${this.message.guild.name}\`!\n\nEle atingiu ${this.porcentagem.toFixed(2)}%, verifique o servidor: ${invite}`)
            .setFooter(this.message.author.tag, message.author.avatarURL)
            .setTimestamp()
            client.channels.get(constantes.phoenix.automod).send(embedRaid)
        }
        if(Porcentagem > 50) console.log(`
        Tentativa de Raid --> 
        ---------Usuário ${message.author.tag}
        ---------Porcentagem: ${Porcentagem}%
        ---------Convites: ${convitesencontrados}
        ---------Links: ${linksencontrados}
        ---------Everyonehere: ${everyonehere}
        ---------Mençoes: ${mencoesenconradas}
        ---------Mensagens iguais: ${qnt}
        ---------Avatar?: ${avatar}
        ---------Anexos?: ${anexos}
        ---------Rapida?: ${rapida}`)


        if(Date.now() > this.tempo) {
            this.porcentagem = (this.porcentagem - 15) < 0 ? 0 : this.porcentagem - 15,
            this.raid = {
            porcentagem = this.porcentagem,
            tempo = Date.now()
            }
        }
        else this.raid = {
            porcentagem: this.porcentagem,
            tempo: Date.now() + 4 * 1000
        }
    }
}