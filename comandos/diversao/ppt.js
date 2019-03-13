module.exports = new (class PedraPapelTesoura {
    constructor(){
            this.apenasCriador = false;
            this.modulo ='diversao';
            this.aliases = ['rps','pedrapapeltesoura','jokenpo'];
            this.permissoesNecessarias = [];
            this.permissoesBot = [];
            this.nome = 'ppt';
            this.descricao = 'Joga uma partida de Pedra Papel Tesoura.';
            this.usar = 'ppt <pedra/papel/tesoura>';
            this.exemplos = []
        }
async run(client, message, args) {
    let escolha = args[0]
    if(!escolha) return client.emit('ajudaComando', message, this)
    let tipo = 0
    switch(escolha.toLowerCase()){
        case 'pedra':
        case 'rock':
        tipo = 1
        break;
        case 'papel':
        case 'paper':
        tipo = 2
        break;
        case 'tesoura':
        case 'scissor':
        tipo = 3
        break;
    }
    if(!tipo) return client.emit("embedDescricao",message,"Você deve escolher entre `pedra, papel` ou `tesoura`!",false)

        let rand = Math.floor(Math.random() * 3 + 1)
        let ganhou = ''
        if((tipo == 1 && rand == 3) || (tipo == 2 && rand == 1) || (tipo == 3 && rand == 2)) ganhou = 'Você Ganhou! Eu escolhi %rand% e você escolheu %tipo%'
        else if((tipo == 3 && rand == 1) || (tipo == 1 && rand == 2) || (tipo == 2 && rand == 3)) ganhou = 'Eu ganhei! Você escolheu %tipo% e eu escolhi %rand%!'
        ganhou = ganhou.replace('%tipo%','%'+tipo+'%').replace('%rand%','%'+rand+'%')
        ganhou = ganhou.replace(/%1%/g,'pedra').replace(/%2%/g,'papel').replace(/%3%/g,'tesoura')
        return client.emit("embedDescricao",message,ganhou,false)
    
}
})