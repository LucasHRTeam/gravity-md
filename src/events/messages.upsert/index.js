const fs = require('fs');

const { sock } = require('../../start');
const { prefixos } = JSON.parse(fs.readFileSync('./src/database/infoBot.json'));

const { loadCommands } = require('../../commands');
const { loadMessage } = require('../../messages');

module.exports = () => sock.ev.on('messages.upsert', async ack => {
    try {
    const msg = ack.messages[0];
    if (!msg.message) return;
    if (msg.key.remoteJid == 'status@broadcast') return;
    const type = Object.keys(msg.message)[0];
    console.log(type)
    const body = type == 'conversation' ? msg.message[type] : type == 'extendedTextMessage' ? msg.message[type].text : '';
    const isCommand = prefixos.includes(body[0]);
    const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const isGroup = msg.key.remoteJid.includes('@g.us');
    const from = msg.key.remoteJid
    const idWa = isGroup ? msg.key.participant : from;

    const reply = text => sock.sendMessage(from, { text , mentions: idWA});

    if (isCommand) {
        console.log('COMANDO RECEBIDO', comando)
        loadCommands(msg, type, body, command, isGroup, from, idWa, reply);
    } else {
        console.log(`MENSAGEM RECEBIDA DE ${idWa}\n`, !body ? msg : body, body[0], isCommand)
        loadMessages()
    };
  } catch (erro) {
  }
});