
const Discord = require ("discord.js");
const ytdl = require('ytdl-core');
let prefix = ">"/*
client.on("message", async message => {
	const args = message.content.split(' ');
	const command = args.shift().slice(2);
  if (!message.content.startsWith(prefix)) return;
var searchString = args.slice(1).join(' ');
var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
var playlist = queue.get(message.guild.id);
  switch (command.toLowerCase()) {


  case "play":
    break;
    case "pular":
    if (!message.member.voiceChannel) return message.channel.send('Você não está em um canal de voz!');
    if (!playlist) return message.channel.send('Não há nenhuma música que eu poderia pular para você.');
    playlist.conexao.dispatcher.end('O comando pular foi usado!');
    return undefined;
    break;
    case "parar":
    if (!message.member.voiceChannel) return message.channel.send('Você não está em um canal de voz!');
    if (!playlist) return message.channel.send('Não há nada que eu possa fazer para você.');
    playlist.musicas = [];
    playlist.conexao.dispatcher.end('O comando de parar foi usado!');
    const parar = new Discord.RichEmbed()
    .setAuthor("Parado", "https://cdn.discordapp.com/emojis/465209209420775445.png?v=1")
    .setDescription("As músicas foram paradas.")
    .setFooter("Equipe de desenvolvimento de músicas", "https://images-ext-2.discordapp.net/external/Iq2TPn9I7xlnd4foQYGoCsSwxv1cAt5BuKtgC8H8be8/https/images-ext-2.discordapp.net/external/kD6vBZJ1FoVt8-lwhl8wLoDXB2yoqQ8ANOsaLwbi2I0/https/cdn.discordapp.com/attachments/444946317018529804/466307134393548810/Chest.gif")
    .setTimestamp()
    message.channel.send(parar)
    return undefined;
  break;
    case "volume":
    if (!message.member.voiceChannel) return message.channel.send('Você não está em um canal de voz!');
    if (!playlist) return message.channel.send('Não há nada tocando.');
    const volumeinfo = new Discord.RichEmbed()
    .setAuthor("Volume", "https://cdn.discordapp.com/attachments/431989517088456705/505137704305164291/emoji.png")
    .setDescription(`O volume atual é: **${playlist.volume}**`)
    .setFooter("Equipe de desenvolvimento de músicas", "https://images-ext-2.discordapp.net/external/Iq2TPn9I7xlnd4foQYGoCsSwxv1cAt5BuKtgC8H8be8/https/images-ext-2.discordapp.net/external/kD6vBZJ1FoVt8-lwhl8wLoDXB2yoqQ8ANOsaLwbi2I0/https/cdn.discordapp.com/attachments/444946317018529804/466307134393548810/Chest.gif")
    .setTimestamp()
    if (!args[0]) return message.channel.send(volumeinfo);
    if(args[0] > 100 || args[0] < 0) return message.channel.send("Use números válidos! O volume só pode ser definido de 0 à 100!")
    playlist.volume = parseInt(args[0])
    playlist.conexao.dispatcher.setVolumeLogarithmic(parseInt(args[0]) / 100);
    const volume = new Discord.RichEmbed()
    .setAuthor("Volume", "https://cdn.discordapp.com/attachments/431989517088456705/505137704305164291/emoji.png")
    .setDescription(`O volume atual é: **${playlist.volume}**`)
    .setFooter("Equipe de desenvolvimento de músicas", "https://images-ext-2.discordapp.net/external/Iq2TPn9I7xlnd4foQYGoCsSwxv1cAt5BuKtgC8H8be8/https/images-ext-2.discordapp.net/external/kD6vBZJ1FoVt8-lwhl8wLoDXB2yoqQ8ANOsaLwbi2I0/https/cdn.discordapp.com/attachments/444946317018529804/466307134393548810/Chest.gif")
    .setTimestamp()
    return message.channel.send(volume);
  break;
    case "tocando":
    if (!playlist) return message.channel.send('Não há nada tocando.');
    return message.channel.send(`🎶 Agora tocando: **${playlist.musicas[0].title}**`);
  break;
    case "playlist":
    if (!playlist) return message.channel.send('Não há nada tocando.');
  const playlists = new Discord.RichEmbed()
    .setAuthor("Fila de músicas:", "https://cdn.discordapp.com/emojis/465209209479495690.png?v=1")
    .setDescription(`${playlist.musicas.map(musica => `**-** ${musica.title}`).join('\n')}`)
    .setFooter(`Agora tocando:** ${playlist.musicas[0].title}**`, "https://images-ext-2.discordapp.net/external/Iq2TPn9I7xlnd4foQYGoCsSwxv1cAt5BuKtgC8H8be8/https/images-ext-2.discordapp.net/external/kD6vBZJ1FoVt8-lwhl8wLoDXB2yoqQ8ANOsaLwbi2I0/https/cdn.discordapp.com/attachments/444946317018529804/466307134393548810/Chest.gif")
    .setTimestamp()
    return message.channel.send(playlists)
    case "pausar":
    if (playlist && playlist.playing) {
      playlist.playing = false;
      playlist.conexao.dispatcher.pause();
    const pausar = new Discord.RichEmbed()
    .setAuthor("Pausado", "https://cdn.discordapp.com/emojis/465209209420775445.png?v=1")
    .setDescription("A música foi pausada")	
    .setFooter("Equipe de desenvolvimento de músicas", "https://images-ext-2.discordapp.net/external/Iq2TPn9I7xlnd4foQYGoCsSwxv1cAt5BuKtgC8H8be8/https/images-ext-2.discordapp.net/external/kD6vBZJ1FoVt8-lwhl8wLoDXB2yoqQ8ANOsaLwbi2I0/https/cdn.discordapp.com/attachments/444946317018529804/466307134393548810/Chest.gif")
    .setTimestamp()
      return message.channel.send(pausar);
    }
    return message.channel.send('Não há nada tocando.');
  break;
    case "continuar":
    if (playlist && !playlist.playing) {
      playlist.playing = true;
      playlist.conexao.dispatcher.resume();
      return message.channel.send('▶ A música foi resumida. !');
    }
    return message.channel.send('Não há nada tocando.');
  
  
  return undefined;
  break;
    case "play":
  }*/
  
  module.exports.handleVideo = async (video, message, voiceChannel, isPlayList = false) => {
  var playlist = message.guild.playlist
  var musica = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if(!playlist) {
    var playlistNova = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      conexao: undefined,
      musicas: [],
      volume: 100,
      playing: true
    };
    message.guild.playlist = playlistNova
    message.guild.playlist.musicas.push(musica);
  
    let conexao = await voiceChannel.join().catch((error) => {
      console.log(error)
		  console.error(`Eu não pude entrar no canal de voz: ${error}`);
      delete message.guild.playlist
		  return message.channel.send(`Eu não pude entrar no canal de voz: ${error}`);
    })
      message.guild.playlist.conexao = conexao
		  isso.play(message.guild, message.guild.playlist.musicas[0]);

  } else {
    message.guild.playlist.musicas.push(musica);
    if(isPlayList) return
    else return message.channel.send(`✅ **${musica.title}** foi adicionado à fila!`);
  }
  return
  }

  exports.play = async (guild, musica) => {
  var playlist = guild.playlist
  
  if (!musica) {
	playlist.voiceChannel.leave();
	delete guild.playlist
  return;
  }

  const dispatcher = await playlist.conexao.playStream(ytdl(musica.url))
    dispatcher.on('end', reason => {/*
      if (reason === 'Stream is not generating quickly enough.')console.log('Música terminada.');
      else console.log(reason);*/
      playlist.musicas.shift();
      isso.play(guild, playlist.musicas[0]);
    })
    dispatcher.on('error', error => console.error(error));
  dispatcher.setVolumeLogarithmic(playlist.volume / 100);
  
  const tocar2 = new Discord.RichEmbed()
  .setAuthor("Começa a tocar agora:", "https://cdn.discordapp.com/emojis/465209209479495690.png?v=1")
  .setDescription(`**${musica.title}**`)
  .setFooter("Equipe de desenvolvimento de músicas.", "https://images-ext-2.discordapp.net/external/Iq2TPn9I7xlnd4foQYGoCsSwxv1cAt5BuKtgC8H8be8/https/images-ext-2.discordapp.net/external/kD6vBZJ1FoVt8-lwhl8wLoDXB2yoqQ8ANOsaLwbi2I0/https/cdn.discordapp.com/attachments/444946317018529804/466307134393548810/Chest.gif")
  .setTimestamp()
  playlist.textChannel.send(tocar2)
}

const isso = require('./music.js')