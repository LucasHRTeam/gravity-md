const { sock } = require('./start');
const { connection, creds, messages, chats, group_participants } = require('./events');

async function startSock() {
    console.log('iniciando bot baileys multidevice...\n', JSON.stringify(sock.user, null, 4));
    connection();
    creds();
    messages();
    chats();
    group_participants()
    /* setTimeout(() => {
        if (!sock) return;
        sock.sendMessage('559284928452@s.whatsapp.net', {
        text: `Estou ativo as ${Date.now()}`
    });
}, 3000) */
};


startSock();
