module.exports = new (class Conquista {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='photoshop';
            this.aliases = ['achievement'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'conquista';
            this.descricao = 'Desbloqueie uma conquista do Minecraft!';
            this.usar = 'conquista <texto>';
            this.exemplos = ['Um texto bem legal aqui']
        }
async run(client, message, args) {
    const { createCanvas, loadImage, registerFont } = require('canvas');
    const path = require('path');
    const util = require('../../utilitarios/util.js')
    let text = args.join(' ')
    if(!text) return message.reply("Insira um texto válido!")
    registerFont(('./assets/fontes/Minecraftia.ttf'), { family: 'Minecraftia' });
		const base = await loadImage('./assets/imagens/achievement.png')
		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(base, 0, 0);
		ctx.font = '17px Minecraftia';
		ctx.fillStyle = '#ffff00';
		ctx.fillText('Conquista Desbloqueada!', 60, 40);
		ctx.fillStyle = '#ffffff';
		ctx.fillText(await util.shortenText(ctx, text, 230), 60, 60);
        return await message.reply({ files: [{ attachment: canvas.toBuffer(), name: 'conquista.png' }] });
}
})