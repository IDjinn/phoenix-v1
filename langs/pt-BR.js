module.exports = {
    dashboard: {
        index: {
            title: 'Painel de Controle',
            desc: 'Esse incrível bot feito por Djinn#0760 contendo tudo o que precisa.',
            commands: ' Comandos »',
            support: {
                title: 'Servidor de Suporte',
                desc: 'Em Breve',
                button: 'Em Breve »'
            },
            dash: {
                title: 'Painel de Controle',
                desc: 'Isso mesmo, agora o Phoenix tem um Painel de Controle!',
                button: 'Login »'
            },
            invite: 'Convidar',
            manage: 'Gerenciar'
        },
        admin:{
            title: 'Administração',
            button: 'Gerenciar'
        },
        stats:{
            title: 'Status',
            guilds: 'Servidores',
            uptime: 'Uptime',
            command: 'Comandos',
            member: 'Membros',
            memory: 'Memória',
            text: 'Canais de Texto',
            voice: 'Canais de Voz',
            version: 'Versões'
        },
        commands:{
            title: 'Comandos',
			more: 'Ver Mais',
            modules: {
                fun: 'Diversão',
                mod: 'Moderação',
                adm: 'Administração',
                game: 'Jogos',
                eco: 'Economia',
                other: 'Outros',
                ps: 'Photoshop',
                misc: 'Utilitários',
                owner: 'Criador',
                util: 'Outros',
                music: 'Música'
            },
            command: {
                desc: 'Descrição',
				permission: 'Permissão Necessária',
                module: 'Categoria',
                exemple: 'Modo de Usar',
                aliases: 'Outras Formas de Usar',
                button: 'Fechar'
            }
        },
        manage: {
			nav: {
				geral: 'Geral',
				logs: 'Logs',
				mod: 'Moderação',
				counter: 'Contador',
				welcome: 'Entrada/Saída',
				music: 'Música',
				safety: 'Proteção',
				economy: 'Economia'
			},
            info: {
                owner: 'Dono(a)',
                channel: 'Canais',
				role: 'Cargos',
                leave: {
                    button: 'Leave',
                    title: 'Sair do Servidor?',
                    desc: 'Você tem certeza que deseja que o {bot.user.username} saia do seu servidor?',
                    cancel: 'Cancelar',
                    leave: 'Continuar'
                },
                reset: {
                    button: 'Reset',
                    title: 'Reset Configurações?',
                    desc: 'Você tem certeza que deseja resetar as configurações?',
                    cancel: 'Cancelar',
                    leave: 'Continuar'
                },
				member: 'Membros'
            },
            settings: {
                title: 'Configurações',
				save: 'Salvar',
				alert: 'ATENÇÃO: Para configurar canais/cargos, use o ID do canal/cargo, invés do nome!',
				keys: {
					logs: {
						title: 'Canal Logs',
						desc: 'Canal onde será registrado tudo o que acontece no servidor. O Phoenix precisa ter permissão de ver registro de auditoria para esse módulo funcionar,'
					},
					punishment: {
						title: 'Canal Punição',
						desc: 'Canal onde será enviada todas as medidas de moderação como banimentos, expulsões, mutes e etc. '
					},
					suggest: {
						title: 'Canal Sugestão',
                        desc: 'Canal Sugestão será aplicado reações ✅, ❌ e ❓ toda mensagem que for enviada lá. Exemplo:',
                        img: 'https://cdn.discordapp.com/attachments/529295239106527291/536682819380838412/unknown.png'
					},
					announce: {
						title: 'Canal Anúncios',
						desc: 'Canal para os anúncios utilizando o comando >anuncio serão enviados (caso não esteja configurado, o anúncio será enviado no próprio canal)'
					},
					contadorbot: {
						title: 'Canal Contador Bots',
                        desc: 'Canal onde será indicado total de bots no servidor, exemplo:',
                        img: 'https://cdn.discordapp.com/attachments/529295239106527291/536895996953755659/unknown.png'
					},
					contadormembro: {
						title: 'Canal Contador Membros',
                        desc: 'Canal onde será indicado total de membros do servidor, exemplo:',
                        img: 'https://cdn.discordapp.com/attachments/529295239106527291/536895996953755659/unknown.png'
					},
					counterb: {
						title: 'Mensagem Contador Bots',
                        desc: 'Mensagem para o contador de bots do servidor'
					},
					counterm: {
						title: 'Mensagem Contador Membros',
                        desc: 'Mensagem para o contador de membros do servidor'
					},
					command: {
						title: 'Canal Comandos',
						desc: 'Canal onde o uso de comandos do Phoenix são permitidos.'
					},
					safety: {
						title: 'Canal Verificar',
						desc: 'Canal onde ficará o captcha de verificação. (mensagem com a reaação para verificar o usuário)'
					},
					level: {
						title: 'Canal Níveis',
						desc: 'Em breve.'
					},
					
					join: {
						channel:{
							title: 'Canal Entrada',
							desc: 'Canal onde será enviada a mensagem de entrada no servidor.'
						},
						message:{
							title: 'Mensagem de Entrada',
							desc: 'Mensagem que será enviada no canal de entrada do servidor.',
							var: ' Variáveis disponíveis: Mencionar: %usuario% ,Nome: %nome% ,ID: %usuario-id% ,Avatar: %usuario-avatar% ,Membros no Servidor: %membros-servidor%'
						}
					},
					leave: {
						channel:{
							title: 'Canal Saída',
							desc: 'Canal onde será enviada a mensagem de saída do servidor.'
						},
						message:{
							title: 'Mensagem de Saída',
							desc: 'Mensagem que será enviada no canal de saída do servidor.',
							var: ' Variáveis disponíveis: Mencionar: %usuario% ,Nome: %nome% ,ID: %usuario-id% ,Avatar: %usuario-avatar% ,Membros no Servidor: %membros-servidor%'
						}
					},
					
					role: {
						moderator:{
							title: 'Cargo Moderador',
							desc: 'Cargo que serão liberados comandos que precisam de permissão de Moderador.'
						},
						administrator:{
							title: 'Cargo Administrador',
							desc: 'Cargo que serão liberados comandos que precisam de permissão de Administrador.'
						},
						beginner:{
							title: 'Cargo Inicial',
							desc: 'Cargo dado quando alguém entra no seu servidor.'
						},
						verify:{
							title: 'Cargo Verificado',
							desc: 'Ao verificarem o captcha, receberão esse cargo.'
						}
					},
					
					prefix: {
						title: 'Prefixo',
						desc: 'Prefixo padrão do Phoenix é >, para alterá-lo, basta inserir abaixo o prefixo desejado.'
					},
					
					automod: {
						title: 'Auto-Moderação',
                        desc: 'Auto-Moderação possuí diversos módulos....',
						
						warn: {
							title: 'Punições automáticas',
							desc: 'Caso alguém for pego pelo filtro será punido automáticamente, primeiramente com mute (10 minutos), depois mute (30 minutos), kick, softban e banimento.'
						},
						raid: {
							title: 'Anti-Raid (Proteção contra ataques)',
							desc: 'Anti-Raid avalia cada mensagem enviada e o servidor no geral para verificar se existe ataques no servidor. Lembramos que caso essa função esteja ativa, o bot irá banir o Raider e enviará para canal de logs para sua equipe verificar o ocorrido.'
						},
						mention: {
							title: 'Anti-Spam Menções',
							desc: 'Verificará o se o número de menções na mensagem ultrapasse o valor configurado. Cada menção de @everyone ou @here equivalem 2 menções.'
						},
						lock: {
							title: 'Lock Server',
							desc: 'Caso entrem mais de 5 usuários em menos de 5 segundos, ele tranca o servidor por 5 minutos, e todo usuário que tentar entrar nele será banido.'
						},
						verify: {
							title: 'Canal Verificação',
							desc: 'Ao entrar no servidor, o usuário terá de passar pelo sistema de captcha para receber um cargo definido. Outra possibilidade é usar o comando >verificar, que configura isso automáticamente. Exemplo:',
							img: 'https://cdn.discordapp.com/attachments/534915875917004810/536908059902214226/unknown.png'
						},
						emoji: {
							title: 'Anti-Spam Emojis',
							desc: 'Verifica cada mensagem para ver se existe SPAM de emojis (75%+ da mensagem)'
						},
						invite: {
							title: 'Anti-Spam Convites',
							desc: 'Verifica dentro da mensagem todos os lugares possíveis se existe convites de servidores discord.'
						},
						blacklink: {
							title: 'Anti-Spam Link (BlackList)',
							desc: 'Links que não poderão ser enviados. Para bloquear todos, use %{all}'
                        },
                        whitelink:{
							title: 'Anti-Spam Link (WhiteList)',
							desc: 'Permite que links liberados possam ser enviados na mensagem. (Módulo só funcional caso o de cima estiver ativo)'
                        },
						caps: {
							title: 'Anti-Spam Caps',
							desc: 'Caso a mensagem conter mais do que essa quantidade definida (em porcentagem) de letras em CAIXA ALTA (caps lock)'
						},
						text: {
							title: 'Anti-Spam Texto Duplicado',
							desc: 'Se a mensagem conter mais do que essa quantidade definida (em porcentagem) de letras repetidas (exemplo: "kkkkkkkkk")'
						}
					},
					economy:{
						singular: {
							title:'Moeda no Singular',
							desc: 'Essa definição será o nome da sua moeda no singular, como por exemplo: Real.'
						},
						plural: {
							title:'Moeda no Plural',
							desc: 'Essa definição será o nome da sua moeda no plural, como por exemplo: Reais.'
						},
						valor: {
							title:'Valor da Moeda',
							desc: 'Esse valor será o valor da sua moeda, por exemplo 100 reais valerão 30 rubis.'
						},
					}
				}
            }
        }
    },
    footer: {
        title: 'Topo da Página'
    },
    nav: {
        home: 'Página Inicial',
        commands: 'Comandos',
        stats: 'Status',
        add: 'Adicionar ao Servidor',
        on: 'Em {{guilds-size}} Servidores',
        theme: 'Alterar Tema',
        login: 'Login',
        dash: 'Painel de Controle',
        admin: 'Administração',
        logout: 'Logout',
		login: 'Login'
    }
}