const { Canvas } = require("canvas-constructor");
const { resolve, join } = require("path");
const Discord = require("discord.js");
const { get } = require("snekfetch");
const imageUrlRegex = /\?size=2048$/g;
const {
    createCanvas,
    loadImage
} = require('canvas')
const canvas = createCanvas(1350, 768)
const ctx = canvas.getContext('2d')
//Canvas.registerFont(resolve(join(__dirname, "./path/to/font/Discord.ttf")), "Discord");
/*
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
}*/
exports.run = async function(client, message, args) {/*
    const attachment = new Discord.Attachment(await profile(message.member, message.member.local), 'perfil.png');
    message.channel.send(attachment)*/
    
        // Load background
        loadImage('./assets/imagens/ProfileBG.png').then(async function (image) {
            var cuser = undefined
            // Draw background
            ctx.drawImage(image, 0, 0, 1350, 768)

            // User Name
            ctx.font = '70px Impact'
            ctx.fillStyle = '#262626';
            ctx.fillText(`${message.member.user.username}`, 40, 650)

            // Stats
            ctx.font = '40px Impact'
            ctx.fillStyle = '#262626';
            ctx.fillText(`XP:   ${cuser} / `, 580, 150)

            ctx.font = '40px Impact'
            ctx.fillStyle = '#262626';
            ctx.fillText(`ZCoins:   ${cuser}`, 580, 200);

            var userInventory = cuser;

            var itemtext = []/*
            userInventory.forEach((item) => {
                let quantity = 1;
                if (typeof itemtext[item.ID] === 'undefined') {
                    itemtext[item.ID] = `${item.Name} - x${quantity}`;
                } else {
                    quantity++;
                    itemtext[item.ID] = `${item.Name} - x${quantity}`;
                }
            })
*/
            itemtext = itemtext.slice(0, 3);

            ctx.font = '40px Impact'
            ctx.fillStyle = '#262626';
            ctx.fillText(`Inventory:   `, 580, 250);

            ctx.font = '40px Impact'
            ctx.fillStyle = '#ff4e00';
            ctx.fillText(`\n/*`, 580, 250);

            // User Level and VIP Status
            ctx.font = '40px Impact'
            ctx.fillStyle = '#ff4e00';
            if (cuser === true) {
                ctx.fillText(`Level: ${cuser} | VIP`, 40, 700)
            } else {
                ctx.fillText(`Level: ${cuser}`, 40, 700)
            }

            ctx.font = '30px Impact'
            ctx.fillStyle = '#262626';
            ctx.fillText(`Visit our website: https://zora.netlify.com`, 700, 740)

            // Load avatar
            let tempurl = message.member.user.avatarURL;
            tempurl = tempurl.replace('?size=2048', '')
            await loadImage(tempurl).then(async function (image) {
                // Draw Avatar
                ctx.drawImage(image, 84, 47, 398, 398)
            });

            // Asynchronous PNG output to discord
            canvas.toBuffer(async function (err, buf) {
                if (err) throw err; // encoding failed
                await message.channel.send(`${message.author}`, {
                    file: buf
                });
            })
        })
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