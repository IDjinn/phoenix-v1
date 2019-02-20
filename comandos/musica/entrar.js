exports.run = async function(client, message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Você não está em um canal de voz.')
    //const permissions = voiceChannel.permissionsFor(message.guild.me);
    //if (!permissions.has(FLAGS.CONNECT)) return message.reply('I do not have enough permissions to connect to your voice channel. I am missing the CONNECT permission.')
    //if (!permissions.has(FLAGS.SPEAK)) return message.reply('I can connect... but not speak. Please turn on this permission so I can emit music.')
    
    if (message.guild.music.playing) {
        const canaldevoz = message.guild.music.voice.channel;
        if (voiceChannel.id === canaldevoz.id) return message.reply('Verifique seu volume, já estou tocando aqui!')
        return message.reply('Desculpe mas parece que estou tocando em um outro canal!')
    }

    message.guild.music.join(voiceChannel).then(() => message.sendMessage(`Entrei com sucesso no canal ${voiceChannel}`))
}

exports.configuracao = {
    apenasCriador: false,
    modulo: 'musica',
    aliases: ['join'],
    permissoesNecessarias: [],
    permissoesBot: ['CONNECT','SPEAK']
};

exports.ajuda = {
    nome: 'entrar',
    descricao: 'Entra no canal de músicas em que você está.',
    usar: 'entrar',
    exemplos: []
};