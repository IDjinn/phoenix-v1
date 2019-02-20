exports.run = async function(client, message, args) {
    const avatarURL = message.author.avatarURL
    const { createCanvas, loadImage } = require('canvas');
    const request = require('node-superfetch');
    const path = require('path');
    const { sepia } = require('../../utilitarios/util.js');
    try {
        const base = await loadImage('./assets/imagens/wanted.png');
        const { body } = await request.get(avatarURL);
        const avatar = await loadImage(body);
        const canvas = createCanvas(base.width, base.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(base, 0, 0);
        ctx.drawImage(avatar, 150, 360, 430, 430);
        sepia(ctx, 150, 360, 430, 430);
        return message.reply({ files: [{ attachment: canvas.toBuffer(), name: 'wanted.png' }] });
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
    nome: 'procurado',
    descricao: 'Procura-se, vivo ou morto!',
    usar: 'procurado @usuario',
    exemplos: []
};