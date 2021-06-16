import { createElement } from './utils.js';
import { createPlayer, parsePlayer1Move, generatePlayer2Move } from './player.js';
import { $arenas, $formFight, $formButton, createReloadButton } from './domConstants.js';
import { generateLogs} from './chat.js';
import { player1, player2 } from './playersConfig.js';

function calcFinalScore() {
    let roundResult;
    if (player1.hp === 0 && player2.hp === 0) {
        roundResult = 'draw';
        generateLogs('draw');
    } else if (player1.hp === 0) {
        roundResult = player2.name + ' wins';
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0) {
        roundResult = player1.name + ' wins';
        generateLogs('end', player1, player2);
    } else {
        console.log('Something went wrong');
    }

    const $titleExist = document.querySelector('.loseTitle');
    if ($titleExist) {
        $titleExist.innerText = roundResult;
    } else {
        const $newTitle = createElement('div', 'loseTitle');
        $newTitle.innerText = roundResult;
        $arenas.appendChild($newTitle);
    }
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const player1Move = parsePlayer1Move($formFight);
    const player2Move = generatePlayer2Move();

    player1.attack(player1Move, player2Move);
    player2.attack(player2Move, player1Move);

    if (player1.hp === 0 || player2.hp === 0) {
        $formButton.disabled = true;
        calcFinalScore();
        createReloadButton();
    }
})
generateLogs('start', player1, player2);
