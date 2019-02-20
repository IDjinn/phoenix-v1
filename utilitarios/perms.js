const permissions = {
    CREATE_INSTANT_INVITE: 1,
    KICK_MEMBERS: 2,
    BAN_MEMBERS: 4,
    ADMINISTRATOR: 8,
    MANAGE_CHANNELS: 16,
    MANAGE_GUILD: 32,
    ADD_REACTIONS: 64,
    VIEW_AUDIT_LOG: 128,
    PRIORITY_SPEAKER: 256,
    VIEW_CHANNEL: 1024,
    READ_MESSAGES: 1024,
    SEND_MESSAGES: 2048,
    SEND_TTS_MESSAGES: 4096,
    MANAGE_MESSAGES: 8192,
    EMBED_LINKS: 16384,
    ATTACH_FILES: 32768,
    READ_MESSAGE_HISTORY: 65536,
    MENTION_EVERYONE: 131072,
    EXTERNAL_EMOJIS: 262144,
    USE_EXTERNAL_EMOJIS: 262144,
    CONNECT: 1048576,
    SPEAK: 2097152,
    MUTE_MEMBERS: 4194304,
    DEAFEN_MEMBERS: 8388608,
    MOVE_MEMBERS: 16777216,
    USE_VAD: 33554432,
    CHANGE_NICKNAME: 67108864,
    MANAGE_NICKNAMES: 134217728,
    MANAGE_ROLES: 268435456,
    MANAGE_ROLES_OR_PERMISSIONS: 268435456,
    MANAGE_WEBHOOKS: 536870912,
    MANAGE_EMOJIS: 1073741824 };
 const convertReadable = function(permName, readable=true, debug=false) {
     if (!readable) return permName;
     if (debug) console.log(permName);
     let names = {
            CREATE_INSTANT_INVITE: "Criar Convite Instantâneo",
            KICK_MEMBERS: "Kickar Membros",
            BAN_MEMBERS: "Banir Membros",
            ADMINISTRATOR: "Administrador",
            MANAGE_CHANNELS: "Gerenciar Canais",
            MANAGE_GUILD: "Gerenciar Servidor",
            ADD_REACTIONS: "Adicionar Reações",
            VIEW_AUDIT_LOG: "Ver Registros de Auiditoria",
            PRIORITY_SPEAKER: "Priority Speaker",
            VIEW_CHANNEL: "Ver Canal",
            READ_MESSAGES: "Ler Mensagens",
            SEND_MESSAGES: "Enviar Mensagens",
            SEND_TTS_MESSAGES: "Enviar Mensagens em TSS",
            MANAGE_MESSAGES: "Gerenciar Mensagens",
            EMBED_LINKS: "Embed Links",
            ATTACH_FILES: "Arquivos em Anexos",
           READ_MESSAGE_HISTORY: "Ler Histórico de Mensagens",
           MENTION_EVERYONE: "Mencionar Everyone/Here",
            EXTERNAL_EMOJIS: "Emojis Externos",
            USE_EXTERNAL_EMOJIS: "Usar Emojis Externos",
            CONNECT: "Conectar",
            SPEAK: "Falar",
            MUTE_MEMBERS: "Silenciar Mmebros",
            DEAFEN_MEMBERS: "Desativar Aúdio de Membros",
            MOVE_MEMBERS: "Mover Membros",
            USE_VAD: "Usar Detecção de Voz",
            CHANGE_NICKNAME: "Mudar Apelido",
            MANAGE_NICKNAMES: "Gerenciar Apelidos",
            MANAGE_ROLES: "Gerenciar Cargos",
            MANAGE_ROLES_OR_PERMISSIONS: "Gerenciar Cargos",
            MANAGE_WEBHOOKS: "Gerenciar Webhooks",
            MANAGE_EMOJIS: "Manage Emojis"
 };
 
     if (!names[permName]) throw new RangeError("Invalid permission given!");
     return names[permName];
 };
 
 const converterPermissoes = function(permNumber, readableNames=false, debug=false) {
     //if readableNames is set to true, use the names at Discord instead of the names of PermissionResolvables at discord.js.
     if (isNaN(Number(permNumber))) throw new TypeError(`Expected permissions number, and received ${typeof permNumber} instead.`);
     permNumber = Number(permNumber);
     let evaluatedPerms = {};
     for (let perm in permissions) {
         let hasPerm = Boolean(permNumber & permissions[perm]);
         evaluatedPerms[perm] = {
             valor: this.convertReadable(perm, readableNames, debug),
             permitido: hasPerm
         };
     }
     return evaluatedPerms;
 };
 module.exports = {
     convertReadable,
     permissions,
     converterPermissoes
 };
 