/* eslint-disable */
var config = { // NOTE: DO NOT LEAVE ANYTHING BLANK
	// ALL settings are strings. Do NOT just use true or false, use these in strings such as 'true' or 'false'. This is due to how some code works when changing the settings
	ownerID: '376460601909706773', // Your ID here
	token: 'NTEyOTkyNDkzMTE4MjkxOTc4.DyN9Qw.HtfXuJwWtubBp_5vkwEEY70LKVA', // Your bot token here
	status: 'dnd', // Bot status [online/idle/invisible/dnd]
	debug: 'false', // This is used to output some debug info if needed. The token will be in the console and other information could be in the console
	playingGame: '{{prefix}}help | {{guilds}} guilds | v{{version}}', // The game you want the bot to play. {{prefix}} is replaced with the default prefix below, {{guilds}} is replaced with the guild count and {{version}} is replaced with the bot version. Leave blank to disable
	purgeLogFormat: '\n Message ID: {{mID}} | Message Timestamp: {{mTS}} | Content: {{mC}} \n', // {{mID}}: Message ID; {{mTS}} Message Timestamp; {{mC}}: Message Content;
	eightBallResponses: ['Yes', 'No', 'Certainly', 'My sources say yes', 'Try again later', 'Without a doubt', 'Better not to tell you now'], // An array of responses for the 8ball command
	cleverbotToken: '', // API Token for CleverBot
  googleAPIToken: 'AIzaSyAmffT-E8F5prLAb3XpWc2Y30S_bk-5L0c', // Used for link shortener and music features. You need to have these APIs enabled.
  logTimeFormat: 'D MMM YYYY HH:mm:ss ZZ',
  musicEnabled: 'false',
	defaultSettings: {
		logs: 'false',
		punicao: 'false',
		entrada: 'false',
		saida: 'false',
		welcome: 'false',
		leave: 'false',
		sugestao: 'false',
		anunciar: 'false',
		contadormembro: 'false',
		contadorbot: 'false',
		counterb: 'false',
		counterm: 'false',
		comandos: 'false',
		niveis: 'false',
		verificar: 'false',
		mod: 'false',
		adm: 'false',
		inicial: 'false',
		verificado: 'false',
		prefixo: '>',
		autowarn: 'false',
		antiraid: 'false',
		antispamemoji: 'false',
		antispaminvite: 'false',
		blacklink: 'false',
		whitelink: 'false',
		antispamcaps: 'false',
		antispammention: 'false',
		lockserver: 'false',
		serverislocked: 'false',
		textdup: 'false',
		singular: 'Real',
    plural: 'Reais',
    valor: '1000',
	},
	dashboard: {
		enabled: 'false', // This setting controls whether the dashboard is enabled or not.
		oauth: 'Zdolrk7Osl0lZF-tyiaO5vplszvrR3Ej', // The client secret from the Discord bot page
		oauthBeta: "WrdlGz7bJoEd4nTdWP4-i1vorXI8I4i9",
		secure: 'false', // HTTPS: 'true' for true, 'false' for false
		sessionSecret: 'KRP3mBLTAaMLLJFGC12msdbVsxCiCi7', // Go crazy on the keyboard here, this is used as a session secret
		//domain: 'nemoboot.herokuapp.com', // Domain name (with port if not running behind proxy running on port 80). Example: 'domain': 'dashboard.bot-website.com' OR 'domain': 'localhost:3000'
		domainBeta: 'localhost:3000',
		domain: 'localhost:3000',
		secureBeta: 'false',
		port: '3000', // The port that it should run on
		invitePerm: '8',
		protectStats: 'false',
		legalTemplates: {
			contactEmail: 'admin@ndt3.ml', // This email will be used in the legal page of the dashboard if someone needs to contact you for any reason regarding this page
			lastEdited: '18 November 2017' // Change this if you update the `TERMS.md` or `PRIVACY.md` files in `dashboard/public/`
		}
	}
};

module.exports = config;
