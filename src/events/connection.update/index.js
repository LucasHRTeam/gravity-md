const { DisconnectReason } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');

const { sock } = require('../../start');

module.exports = () => sock.ev.on('connection.update', update => {
    const { connection, lastDisconnection } = update;
    if (connection == 'close') {
        let reason = new Boom(lastDisconnection?.error)?.output.statusCode;
        if (reason == DisconnectReason.badSession) {
            console.log('arquivo de sessão invalido. Exclua a sessão e tente novamente.');
            sock.logout();
        } else if (reason == DisconnectReason.connectionClosed) {
            console.log('conexão fechada, reconectando...');
            fs.unlikSync('./auth.json'); process.exit();
        } else if (reason == DisconnectReason.connectionLost) {
            console.log('conexão perdida do servidor, reconectando...');
            fs.unlikSync('./auth.json'); process.exit();
        } else if (reason == DisconnectReason.connectionReplaced) {
            console.log('conexão substituída, outra nova sessao aberta, fecha a sessao atual primeiro');
            sock.logout();
            fs.unlinkSync('./auth.json');
        } else if (reason == DisconnectReason.loggedOut) {
            console.log('Reinicializacão necessária, reinciando...');
            fs.unlikSync('./auth.json'); process.exit();
        } else if (reason == DisconnectReason.timedOut) {
            console.log('a conexão expirou, reconectando...');
            fs.unlikSync('./auth.json'); process.exit();
        } else {
            sock.end(`Razão de desconexao desconhecida: ${reason}|${connection}`);
        };

        if (connection == 'connecting') {
            console.log('conectando...');
        }
        if (connection == 'connected') {
            console.log('conectado.');
        }
    }
});
