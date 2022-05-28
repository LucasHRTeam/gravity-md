const { DisconnectReason } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');

const { sock } = require('../../start');

module.exports = () => sock.ev.on('connection.update', update => {
    const { connection, lastDisconnection } = update;
    if (connection == 'close') {
        let reason = new Boom(lastDisconnection?.error)?.output.statusCode;
        if (reason == DisconnectReason.badSession) {
            console.log('arquivo de sessao invalido. Exclua a sessao e tente novamente.');
            sock.logout();
        } else if (reason == DisconnectReason.connectionClosed) {
            console.log('conexao fechada, reconectando...');
            fs.unlikSync('./auth.json'); process.exit();
        } else if (reason == DisconnectReason.connectionLost) {
            console.log('conexao perdida dp servidor, reconectando...');
            fs.unlikSync('./auth.json'); process.exit();
        } else if (reason == DisconnectReason.connectionReplaced) {
            console.log('conexao substituida, outra nova sessao aberta, fecha a sessao atual primeiro');
            sock.logout();
            fs.unlinkSync('./auth.json');
        } else if (reason == DisconnectReason.loggedOut) {
            console.log('Reinicializacao necessaria, reinciando...');
            fs.unlikSync('./auth.json'); process.exit();
        } else if (reason == DisconnectReason.timedOut) {
            console.log('a conexao expirou, reconectando...');
            fs.unlikSync('./auth.json'); process.exit();
        } else {
            sock.end(`Razao de desconexao desconhecida: ${reason}|${connection}`);
        };

        if (connection == 'connecting') {
            console.log('conectando...');
        }
        if (connection == 'connected') {
            console.log('conectado');
        }
    }
});