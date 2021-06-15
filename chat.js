import {LOGS} from './constants.js';
import {getRandomNum} from './utils.js';
import {$chat} from './domConstants.js';

function generateLogs(type, { name: attackerName }, { name: defendingName, hp: defendingHp }, damage) {
    const data = LOGS[type];
    const date = new Date();
    const time = date.toTimeString().slice(0, 5);
    const i = (getRandomNum(data.length) - 1);
    let log;

    switch (type) {
        case 'start':
            log = data.replace('[time]', time).replace('[player1]', attackerName).replace('[player2]', defendingName);
            break;
        case 'end':
            log = `${time} ${data[i].replace('[playerWins]', attackerName).replace('[playerLose]', defendingName)}`;
            break;
        case 'hit':
        case 'defence':
            let text = data[i].replace('[playerKick]', attackerName).replace('[playerDefence]', defendingName);
            log = `${time} ${text} ${(damage ? (defendingName + ' -' + damage + 'hp: ' + defendingHp + '/100') : '')}`;
            break;
        case 'draw':
            log = `${time} ${data}`;
            break;
        default:
            log = 'Something went wrong...';
            break;
    }

    const el = `<p>${log}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

export { generateLogs };
