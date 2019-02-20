const Discord = require('discord.js');
const fs = require('fs')
const extras = require('../utilitarios/extras.js')

module.exports = async member => {
	const client = await member.client;
    let guild = member.guild
    if(!guild) return

    let servidor = guild.dados || client.servidores[guild.id] || await extras.Servidor(guild.id,client)

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
    
    if(servidor.leave.startsWith('http')){
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
        const background = await Canvas.loadImage(servidor.leave); // https://i.imgur.com/gsHfybt.png
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
        // Slightly smaller text placed above the message.member's display name
        let tamanho = 30
        if(member.displayName.length > 5) tamanho = 28
        if(member.displayName.length > 9) tamanho = 26
        if(member.displayName.length > 11) tamanho = 24
        if(member.displayName.length > 20) tamanho = 22

        ctx.font = tamanho + 'px sans-serif';
        ctx.fillStyle = '#ffffff';
        let pos = 1.4

        if(member.displayName.length > 5) pos = 1.4
        if(member.displayName.length > 11) pos = 1.5
        if(member.displayName.length > 20) pos = 1.6
        ctx.fillText('Até mais ' + member.displayName + ',', canvas.width / pos, canvas.height / 2);
        ctx.fillText('espero que isso não', canvas.width / pos, canvas.height / 1.7)
        ctx.fillText('seja um adeus!', canvas.width / pos, canvas.height / 1.5)
    
        // Add an exclamation point here and below
        ctx.font = applyText(canvas, `${member.displayName}`);
        ctx.fillStyle = '#ffffff';

        ctx.beginPath();
        ctx.arc(200, 200, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
    
        const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
        const avatar = await Canvas.loadImage(buffer);
        ctx.drawImage(avatar, 100, 100, 200, 200);
        
        const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
        try{ return await client.channels.get(servidor.canais.saida).send(`O usuário ${member.user.username}, acaba de sair do servidor...`, attachment)}
        catch{}
    
    }
    else if(servidor.leave != 'false' && servidor.canais.saida != 'false'){
        const saidaembed = new Discord.RichEmbed()
        .setDescription(`${servidor.leave}`)
        .setAuthor(`${member.displayName}`,member.user.displayAvatarURL)
        .setThumbnail(member.user.displayAvatarURL) 
        .setColor('#ffffff')
        try{ return await client.channels.get(servidor.canais.saida).send(saidaembed)} catch{}
    }
}
