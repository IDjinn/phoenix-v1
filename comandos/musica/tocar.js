exports.run = async function(client, message, args) {
  const { music } = message.guild;

  if (!music.queue.length)
    return message.reply(`Playlist vazia...`);

  if (!music.voiceChannel) return message.reply('nao estou em canal de música')

  if (music.playing) {
    return message.reply('Já estou tocando?');
  } else if (music.paused) {
    music.resume();
    return message.reply(`Tocando agora: ${music.queue[0].title}!`);
  } else {
    music.channel = message.channel;
  } 
}
/*
async function play(music) {
  while (music.queue.length) {
    const [song] = music.queue;
    await music.channel.send(`🎧 Tocando: **${song.title}** pedida por: **${song.requester}**`);

    try {
      if (!await new Promise(async (resolve) => {
        (await music.play())
          .on('end', () => {
            music.skip();
            resolve(true);
          })
          .on('error', (err) => {
            music.channel.send('Whoops! This disk broke!');
            //music.client.emit('error', err);
            music.skip();
            resolve(true);
          })
          .once('disconnect', () => {
            resolve(false);
          });
      })) return;

      // Autofetch if the autoplayer is enabled
      if (!music.queue.length && music.autoplay) await autoPlayer(music);
    } catch (error) {
      client.emit('error', error);
      music.channel.send(error);
      music.leave();
      break;
    }
  }

  if (!music.queue.length) {
    music.channel.send('⏹ From 1 to 10, being 1 the worst score and 10 the best, how would you rate the session? It just ended!')
      .then(() => music.leave());
  }
}
function autoPlayer(music) {
  return music.add('YouTube AutoPlay', music.next);
}
*/

exports.configuracao = {
    apenasCriador: true,
    modulo: 'especiais',
    aliases: [],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'tocar',
    descricao: 'Convites importantes do Phoenix!.',
    usar: 'tocar',
    exemplos: []
};