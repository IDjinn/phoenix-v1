exports.run = async function(client, message, args) {
    const { createCanvas, loadImage } = require('canvas');
    const request = require('node-superfetch');
    const path = require('path');
    const util = require('../../utilitarios/util.js')
    let usuario1 = await util.usuarioMencionado(args[0],client)
    let usuario2 = await util.usuarioMencionado(args[1],client)
    if(!usuario1 || !usuario2) return message.reply("Mencione 2 usuários!")
    const nahAvatarURL = usuario1.avatarURL
    const yeahAvatarURL = usuario2.avatarURL
    try {
        const base = await loadImage('./assets/imagens/drake.png');
        const nahAvatarData = await request.get(nahAvatarURL);
        const nahAvatar = await loadImage(nahAvatarData.body);
        const yeahAvatarData = await request.get(yeahAvatarURL);
        const yeahAvatar = await loadImage(yeahAvatarData.body);
        const canvas = createCanvas(base.width, base.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(base, 0, 0);
        ctx.drawImage(nahAvatar, 512, 0, 512, 512);
        ctx.drawImage(yeahAvatar, 512, 512, 512, 512);
        return message.reply({ files: [{ attachment: canvas.toBuffer(), name: 'drake.png' }] });
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
    nome: 'drake',
    descricao: 'Faz o meme do drake com 2 usuários',
    usar: 'drake <@usuario> <@usuario>',
    exemplos: ['Um texto bem legal aqui']
};