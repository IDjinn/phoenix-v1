exports.run = async function(client, message, args) {
    const { createCanvas, loadImage } = require('canvas');
    const request = require('node-superfetch');
    const path = require('path');
    const { drawImageWithTint } = require('../../utilitarios/util.js');


    const avatarURL = message.mentions.members.first().avatarURL || message.author.avatarURL
    try {
        const base = await loadImage('./assets/imagens/triggered.png');
        const { body } = await request.get(avatarURL);
        const avatar = await loadImage(body);
        const canvas = createCanvas(base.width, base.height);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, base.width, base.height);
        drawImageWithTint(ctx, avatar, 'red', 0, 0, 320, 320);
        ctx.drawImage(base, 0, 0);
        return message.reply({ files: [{ attachment: canvas.toBuffer(), name: 'triggered.png' }] });
    } catch (err) {
        return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
        
}
exports.configuracao = {
    apenasCriador: false,
    modulo: 'photoshop',
    aliases: [],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'triggered',
    descricao: 'Deixa o usuário Triggered',
    usar: 'triggered @usuario',
    exemplos: []
};