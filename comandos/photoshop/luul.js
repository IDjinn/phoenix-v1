exports.run = async function(client, message, args) {
    const { createCanvas, loadImage } = require('canvas');
    const request = require('node-superfetch');
    const path = require('path');
    const util = require('../../utilitarios/util.js')
    let usuario1 = await util.usuarioMencionado(args[0],client)
    let usuario2 = await util.usuarioMencionado(args[1],client)
	let usuario3 = await util.usuarioMencionado(args[2],client)
	if(!usuario1 || !usuario2 || !usuario3) return message.reply("Mencione 3 usuários!")
		const boyfriendAvatarURL = usuario1.avatarURL;
		const girlfriendAvatarURL = usuario2.avatarURL;
		const otherGirlAvatarURL = usuario3.avatarURL;
		try {
			const base = await loadImage('./assets/imagens/distracted-boyfriend.png');
			const boyfriendAvatarData = await request.get(boyfriendAvatarURL);
			const boyfriendAvatar = await loadImage(boyfriendAvatarData.body);
			const girlfriendAvatarData = await request.get(girlfriendAvatarURL);
			const girlfriendAvatar = await loadImage(girlfriendAvatarData.body);
			const otherGirlAvatarData = await request.get(otherGirlAvatarURL);
			const otherGirlAvatar = await loadImage(otherGirlAvatarData.body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			ctx.rotate(-18.06 * (Math.PI / 180));
			ctx.drawImage(boyfriendAvatar, 290, 165, 125, 125);
			ctx.rotate(18.06 * (Math.PI / 180));
			ctx.rotate(3.11 * (Math.PI / 180));
			ctx.drawImage(girlfriendAvatar, 539, 67, 100, 125);
			ctx.rotate(-3.11 * (Math.PI / 180));
			ctx.drawImage(otherGirlAvatar, 120, 96, 175, 175);
			return message.reply({ files: [{ attachment: canvas.toBuffer(), name: 'distracted-boyfriend.png' }] });
		} catch (err) {return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)}

}
exports.configuracao = {
    apenasCriador: true,
    modulo: 'photoshop',
    aliases: ['especiais'],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'luul',
    descricao: 'Desbloqueie uma conquista do Minecraft!',
    usar: 'luul [texto]',
    exemplos: ['Um texto bem legal aqui']
};