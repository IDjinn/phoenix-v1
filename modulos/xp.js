const removerDuplicados = s => s.split("").sort().reduce((a,b)=>(a[a.length-1]!=b)?(a+b):a,"")
const gXP = require('../utilitarios/niveis.js')
module.exports = (message) => {
	let mensagemPura = removerDuplicados(message.content)
	let mensagemXP;
	if(mensagemPura.length >= 7) mensagemXP = Math.floor(Math.random() * 3 + 1)
	if(mensagemPura.length >= 12) mensagemXP += Math.floor(Math.random() * 3 + 1)
	if(mensagemXP > 0){
		gXP.AdicionarXP(message,mensagemXP)
		gXP.AdicionarXPLocal(message,mensagemXP)
	}
}