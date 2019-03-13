const util = require('../../utilitarios/util.js')
module.exports = new (class Limpar {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='moderacao';
            this.aliases = ['clear'];
            this.permissoesNecessarias = ['MANAGE_MESSAGES'];
            this.permissoesBot = [];
            this.nome = 'limpar';
            this.descricao = 'Limpe o chat!';
            this.usar = 'limpar <usuário/quantidade>';
            this.exemplos = ['100','@Djinn 100']
        }
async run(client, message, args) {
const user = message.mentions.users.first() ? message.mentions.users.first() : client.users.get(args[0])
const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])

if (!amount) return client.emit('ajudaComando', message, this)
if (!amount && !user)return client.emit('ajudaComando', message, this)
if(amount > 1000) return message.reply("Só é possível limpar de 2 a 1000 mensagens por vez!")

message.channel.fetchMessages({
 limit: amount,
}).then((messages) => {
 if (user) {
 const filterBy = user ? user.id : Client.user.id;
 messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 util.punir(message.guild.id, filterBy, '$Clear$', message.author.id, 3, 'false', client)
 }
 message.channel.bulkDelete(messages).catch(RangeError => message.reply(`Não conseguir deletar as mensagens\n**Motivo:** ${RangeError}`).then(msg => { msg.delete(3000) }).catch(/*ERRO!*/));
});
}
})