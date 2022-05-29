const { sock } = require('./start');
const { connection, creds, messages, chats, group_participants } = require('./events');

async function startSock() {
    console.log('iniciando bot baileys multidevice...\n', JSON.stringify(sock.user, null, 4));
    connection();
    creds();
    messages();
    chats();
    group_participants();
};


startSock();
