const Discord = require('discord.js');
const extras = require('../utilitarios/extras.js')
const fs = require('fs')

module.exports = async member => {
    const client = member.client;
    let guild = member.guild
    if(!guild) return
    let servidor = guild.dados || client.servidores[guild.id] || await extras.Servidor(guild.id,client)
    
    if(guild.id == '498011182620475412'){
        if(member.user.createdAt >= '1514772000000' && !member.user.bot){
        
        let createdAt = member.user.createdAt.toString().split(' ');
        let visto = 'Dia ' + createdAt[2] + ' de ' + createdAt[1] + ' de ' + createdAt[3] + '\n as ' + createdAt[4] +  '.' 
        const newMember = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setDescription(`Novo membro acaba de entrar, ${member} criou sua conta em ${visto}.`)
        .setThumbnail(member.user.displayAvatarURL)
        client.channels.get('548613630040473601').send(newMember)
        }
    }

    if(Date.now() > servidor.automod.serverislocked) servidor.automod.serverislocked = 'false'

    if(!isNaN(servidor.automod.serverislocked)) {
        const raidembed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setDescription(`O usuário ${member.user.tag} (ID:${member.id}) tentou entrar no servidor enquanto está em modo Lock. Verifique se não é tentativa de raid.`)
        await member.ban('Server Locked').then(()=> client.channels.get(servidor.canais.logs).send(raidembed).catch()).catch()
    }

    if(servidor.automod.lockserver == 'true'){
        if(client.entradas[member.guild.id]){
            client.entradas[member.guild.id].quantidade += 1
            client.entradas[member.guild.id].ids.push(member.id)
            if(client.entradas[member.guild.id].quantidade > 5){
                let tempo = client.entradas[member.guild.id].tempo
                tempo = Date.now() - tempo
                if(tempo < 5000) servidor.automod.serverislocked = Date.now() + 5 * 60 * 1000
                else delete client.entradas[member.guild.id]
            }
        }
        else{
            client.entradas[member.guild.id] = {
                quantidade: 1,
                tempo: Date.now(),
                ids: []
            }
        }
    }
    
    if(servidor.canais.contadorbot != 'false'){
        let guild = client.guilds.get(member.guild.id)
        let canal = client.channels.get(servidor.canais.contadorbot)
        if(canal) if(!canal.name.match(guild.members.filter(m => m.user.bot).size)) {
            if(servidor.counterb != 'false') canal.setName(client.servidores[member.guild.id].counterb.replace(/{bots}/g,guild.members.filter(m => m.user.bot).size))
            else canal.setName(`${guild.members.filter(m => m.user.bot).size}`)
        }
    }
    if(servidor.canais.contadormembro != 'false'){
        let guild = client.guilds.get(member.guild.id)
        let canal = client.channels.get(servidor.canais.contadormembro)
        if(canal) if(!canal.name.match(guild.members.filter(m => m.user.bot).size)) {
            if(servidor.counterm != 'false') canal.setName(client.servidores[member.guild.id].counterm.replace(/{members}/g,guild.members.filter(m => !m.user.bot).size))
            else canal.setName(`${guild.members.filter(m => !m.user.bot).size}`)
        }
    }

    if(servidor.ultimosMembros)if(servidor.ultimosMembros.indexOf(member.id)) servidor.ultimosMembros.push(member.id)
    else servidor.ultimosMembros.push(member.id) 

    client.emit('verificar',member)

    if(member.guild.me.hasPermission('MANAGE_CHANNELS')){
    member.guild.fetchInvites().then(convites => {
    let ei = client.convites[member.guild.id];
    client.convites[member.guild.id] = convites
    let invite = convites.find(i => ei.get(i.code).uses < i.uses)
    let inviter = client.users.get(invite.inviter.id);
    client.channels.get(servidor.canais.entrada).send(`\`${member.user.tag}\` entrou no servidor usando o convite \`${invite.code}\` de \`${inviter.tag}\`. O convite foi usado \`${invite.uses}\` vezes desde quando foi criado.`);
    }).catch()
}

    if(servidor.cargos.inicial != "false") {
        let inicial = await member.guild.roles.get(servidor.cargos.inicial)
        if(inicial) await member.addRole(inicial)
    }
    
    if(servidor.welcome.startsWith('http')){
        const Canvas = require('canvas');
        const snekfetch = require('snekfetch');
        const Discord = require("discord.js")
        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');
        
            // Declare a base size of the font
            let fontSize = 70;
        
            do {
                // Assign the font to the context and decrement it so it can be measured again
                ctx.font = `${fontSize -= 10}px sans-serif`;
                // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (ctx.measureText(text).width > canvas.width - 700);
        
            // Return the result to use in the actual canvas
            return ctx.font;
        };
    
        const canvas = Canvas.createCanvas(1000, 400);
        const ctx = canvas.getContext('2d');
    
        const background = await Canvas.loadImage(servidor.join);//http://www.phoenixforum.com.br/uploads/monthly_2018_10/phoenix-banner.png.dded140e95d537027582e31ee4f2e2de.png
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
        //Slightly smaller text placed above the message.member's display name
        ctx.font = '34px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Seja bem-vind@', canvas.width / 1.45, canvas.height / 1.5);
    
        // Add an exclamation point here and below
        ctx.font = applyText(canvas, `${member.displayName}`);
        ctx.fillStyle = '#ffffff';
    
        let pos = 1.3
        if(member.displayName.length > 5) pos = 1.4
        if(member.displayName.length > 9) pos = 1.4
        if(member.displayName.length > 11) pos = 1.5
        if(member.displayName.length > 20) pos = 1.6
    
        ctx.fillText(`${member.displayName}`, canvas.width / pos, canvas.height / 2);
    
        ctx.beginPath();
        ctx.arc(200, 200, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
    
        const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
        const avatar = await Canvas.loadImage(buffer);
        ctx.drawImage(avatar, 100, 100, 200, 200);
        
        const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
        try{ 
            await client.channels.get(servidor.canais.entrada).send(`Olá ${member.user.username}, seja bem-vindo(a) ao ${member.guild.name}!`, attachment)
            return}
        catch{}
    
    }
    else if(servidor.welcome != 'false' && servidor.canais.entrada != 'false'){
        const entradaembed = new Discord.RichEmbed()
        .setDescription(`${servidor.welcome}`)
        .setAuthor(`${member.displayName}`,member.user.displayAvatarURL)
        .setThumbnail(member.user.displayAvatarURL) 
        .setColor('#ffffff')
        try{ return await client.channels.get(servidor.canais.entrada).send(entradaembed)} catch{}
    }
}
    
    
    
    
    
    /*.then(() => {
        embed.react(":white_check_mark:"),
        embed.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();
    
            if (reaction.emoji.name === '✅') {
                message.reply('Conta verificada!').then(msg => { msg.delete(3000) }).catch(/*ERRO!)
                try{
                member.addRole(member.guild.roles.get(servidor.cargoinicial))
                }
                catch{}
            }
        })
    })
    member.addRole(member.guild.roles.get(servidor.cargoinicial))
    }/*
    else{
        const embed = new Discord.RichEmbed()
            .setAuthor(member.user.tag, member.user.avatarURL)
            .setTitle('Entrou')   
            .setColor('#ffffff')
            .setDescription(`Seja bem vind@ ${member.user.tag}`)
            .setTimestamp()
        client.channels.get(servidor.canalentrada).send(embed)/*.then(() => embed.react('✅'),
        embed.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();
    
            if (reaction.emoji.name === '✅') {
                message.reply('Conta verificada!').then(msg => { msg.delete(3000) }).catch(/*ERRO!)
                try{
                member.addRole(member.guild.roles.get(servidor.cargoinicial))
                }
                catch{}
        }}))*/
        
