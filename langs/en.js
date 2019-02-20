module.exports = {
    dashboard: {
        index: {
            title: 'Dashboard',
            desc: 'This is an bot made by Djinn#0760 for everything you need.',
            commands: ' Commands »',
            support: {
                title: 'Discord Guild',
                desc: 'Coming soon',
                button: 'Coming Soon »'
            },
            dash: {
                title: 'Dashboard',
                desc: 'Yeah, the Phoenix now has a dashboard!',
                button: 'Login »'
            },
            invite: 'Inivte Bot',
            manage: 'Manage'
        },
        admin:{
            title: 'Administration',
            button: 'Manage'
        },
        stats:{
            title: 'Stats',
            guilds: 'Guilds',
            uptime: 'Uptime',
            command: 'Commands',
            member: 'Members',
            memory: 'Memory',
            text: 'Text Channels',
            voice: 'Voice Channels',
            version: 'Versions'
        },
        commands:{
            title: 'Commands',
			more: 'More',
            modules: {
                fun: 'Fun',
                mod: 'Moderation',
                misc: 'Miscelaneous',
                owner: 'System',
                util: 'Utilities',
                music: 'Music',
                adm: 'Administration',
                game: 'Games',
                eco: 'Economy',
                other: 'Outros',
                ps: 'Photoshop',
            },
            command: {
                desc: 'Description: ',
                module: 'Category: ',
                exemple: 'Usage Exemple: ',
                aliases: 'Command Aliases: ',
                button: 'Close'
            }
        },
        manage: {
			nav: {
				geral: 'Geral',
				logs: 'Logs',
				mod: 'Moderation',
				counter: 'Couter',
				welcome: 'Join/Leave',
				music: 'Music',
				safety: 'Safety',
			},
            info: {
                owner: 'Owner:',
                channels: 'Channels',
                leave: {
                    button: 'Leave',
                    title: 'Leave Server?',
                    desc: 'Are you sure you want the {bot.user.username} to leave your server?',
                    cancel: 'Cancel',
                    leave: 'Leave'
                },
                reset: {
                    button: 'Reset',
                    title: 'Reset Settings?',
                    desc: 'Are you sure you want to reset the settings?',
                    cancel: 'Cancel',
                    leave: 'Leave'
                },
                member: 'Membros',
                role: 'Roles'
            },
            settings: {
                prefix: {
                    title: 'prefix',
                    value: '>'
                },
                modLog: {
                    title: 'modLog',
                    value: 'channel-id'
                },
                modRole: {
                    title: 'modRole',
                    value: 'mod-role-id'
                },
                admRole: {
                    title: 'admRole',
                    value: 'admRole'
                },
                welcomeChannel: {
                    title: 'welcomeChannel',
                    value: 'channel-id'
                },
                welcome: {
                    title: 'welcomeMessage',
                    value: 'heloo'
                },
                inviteFilter: {
                    title: 'inviteFilterEnabled',
                    value: 'false'
                },
                inviteWhitelist: {
                    title: 'inviteWhitelist',
                    value: 'rroles,roles'
                },
                inviteFilter: {
                    title: 'inviteFilterEnabled',
                    value: 'false'
                }
            },
            save: 'Submit'
        }
    },
    footer: {
        title: 'Back to Top'
    },
    nav: {
        home: 'Home',
        commands: 'Commands',
        stats: 'Stats',
        add: 'Add to Guild',
        on: 'On {{guilds-size}} Guilds',
        theme: 'Change Theme',
        login: 'Login',
        dash: 'Dashboard',
        admin: 'Admin',
        logout: 'Logout',
		login: 'Login'
    }
}