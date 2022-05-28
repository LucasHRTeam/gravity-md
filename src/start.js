const {
    default: makeWASocket,
    useSingleFileAuthState,
} = require('@adiwajshing/baileys');

const pino = require('pino');

const { state } = useSingleFileAuthState('./auth.json');

const sock = makeWASocket({
    logger: pino({ level: 'silent'}),
    version: [2, 2204, 13],
    printQRInTerminal: true,
    auth: state
});

module.exports = {
    sock
}