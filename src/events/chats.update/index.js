const { sock } = require('../../start');

module.exports = () => sock.ev.on('chats.update', info => {}/*console.log('chats.update ', info)*/);