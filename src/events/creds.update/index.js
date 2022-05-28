const { useSingleFileAuthState } = require('@adiwajshing/baileys');
const { saveState } = useSingleFileAuthState('./auth.json');

const { sock } = require('../../start');

module.exports = () => {
    sock.ev.on('creds.update', saveState)
    return sock
};