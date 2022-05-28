const fs = require('fs');

const { sock } = require('../start');
const { prefixos, ownerNumber } = JSON.parse(fs.readFileSync('./src/database/infoBot.json'));

const loadCommands = async (msg, type, body, command, isGroup, from, idWa, reply) => {
    switch (command) {
        case 'run':
            try {
                eval(body.slice(command.length + 1));
            } catch (e) {
                console.log('EvalError ', e);
            }
            break;
    
        default:
            break;
    }
};

module.exports = {
    loadCommands
};