const { sock } = require('../../start');

module.exports = () => sock.ev.on('group-participants.update', group => {
    //console.log('group-participants.update', group);
    const { action, id, participants } = group;
    switch (action) {
        case 'add':
            if (!participants[0].startsWith(55)) return sock.groupParticipantsUpdate(id, participants[0], 'remove');
            sock.sendMessage(id, {
                text: `Seja bem vindo @${participants[0].replace('@s.whatsapp.net', '')}`,
            mentions: participants });
            break;
            case 'remove':
                case 'leave':
                sock.sendMessage(id, {
                    text: `Adeus @${participants[0].replace('@s.whatsapp.net', '')}`,
                mentions: participants });
                break;
    };
});