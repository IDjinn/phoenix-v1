const { Canvas } = require("canvas-constructor");
const { resolve, join } = require("path");
const Discord = require("discord.js");
const { get } = require("snekfetch");
const imageUrlRegex = /\?size=2048$/g;
//Canvas.registerFont(resolve(join(__dirname, "./path/to/font/Discord.ttf")), "Discord");

async function profile(member, score) {
const { level, xp } = score;
const { body: avatar } = await get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
const name = member.displayName.length > 20 ? member.displayName.substring(0, 17) + "..." : member.displayName;
return new Canvas(400, 180)
.setColor("#7289DA")
.addRect(84, 0, 316, 180)
.setColor("#2C2F33")
.addRect(0, 0, 84, 180)
.addRect(169, 26, 231, 46)
.addRect(224, 108, 176, 46)
.setShadowColor("rgba(22, 22, 22, 1)")
.setShadowOffsetY(5)
.setShadowBlur(10)
.save()
.addCircle(84, 90, 62)
.restore()
.addRoundImage(avatar, 20, 26, 128, 128, 64)
.createBeveledClip(20, 138, 128, 32, 5)
.setColor("#23272A")
.addRect(20, 138, 128, 32)
.restore()
.setTextAlign("center")
.setTextFont("10pt sans-serif")
.setColor("#FFFFFF")
.addText(name, 285, 54)
.addText(`Level: ${xp}`, 84, 159)
.setTextAlign("left")
.addText(`test: ${level}`, 241, 136).toBuffer()
}
exports.run = async function(client, message, args) {
    const attachment = new Discord.Attachment(await profile(message.member, message.member.local), 'perfil.png');
    message.channel.send(attachment)
}
exports.configuracao = {
    apenasCriador: true,
    modulo: 'utilitarios',
    aliases: [],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'rank',
    descricao: 'Confira o nível e xp de alguém!',
    usar: 'rank @usuário',
    exemplos: ['@Djinn','376460601909706773']
};