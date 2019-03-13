module.exports = new (class MassKick {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='administracao';
            this.aliases = ['expulsartodos','removertodos'];
            this.permissoesNecessarias = ['ADM'];
            this.permissoesBot = ['KICK_MEMBERS'];
            this.nome = 'masskick';
            this.descricao = 'Remove todos os membros do seu servidor.';
            this.usar = 'masskick';
            this.exemplos = []
        }

async run(client, message, args) {
    let motivo = args.slice(1).join(" ")
    message.guild.members.forEach(async m => {
        await m.kick(motivo)
    });
    message.reply("Membros expulsos com sucesso!")
}
})