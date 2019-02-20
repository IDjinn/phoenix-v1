
    const Discord = require('discord.js');
exports.run = async function(client, message, args) {
    const ID = "376460601909706773"
    function clean(text) { if (typeof(text) === "string") 
    return text
    .replace(/`/g, '`' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
    .replace(/@/g, '@' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
    .replace(/\n/g, '\n' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
    .replace(client.servidorConfig.token, 'Oops! Token não')
    .replace(client.servidorConfig.dashboard.oauth, 'Oops! Token não')
    .replace(client.servidorConfig.dashboard.oauthBeta, 'Oops! Token não')
    .replace(client.servidorConfig.dashboard.sessionSecret, 'Oops! Token não')
    .replace(client.servidorConfig.googleAPIToken, 'Oops! Token não');
    
    else return text;
}
    if(message.author.id !== ID) return message.reply("Você não tem permissão para usar esse comando!").then(msg => { msg.delete(3000) }).catch(/*ERRO!*/);
        try {
            const code = args.join(" ");
            let evaled = eval(code);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

            const embed = new Discord.RichEmbed()
            .setDescription(`Entrada \`\`\`${message.content}\`\`\`\n\nSaída:\`\`\`${clean(evaled)}\`\`\``)
            .setColor('#ffffff')
            message.reply(embed)
          } catch (err) { const embed = new Discord.RichEmbed()
            .setDescription(`Entrada \`\`\`${message.content}\`\`\`\n\nSaída:\`\`\`${clean(err)}\`\`\``)
            .setColor('#ffffff')
            message.reply(embed)
          }
        
}
exports.configuracao = {
    apenasCriador: true,
    modulo: 'especiais',
    aliases: [],
    permissoesNecessarias: [],
    permissoesBot: []
};

exports.ajuda = {
    nome: 'eval',
    descricao: 'Beep Boop!',
    usar: 'eval [algo aqui]',
    exemplos: ['faz algo!']
};