import {$arenas, $formButton, $formFight, createReloadButton} from "../constants/domConstants.js";
import {ATTACK, HIT, PLAYER1, PLAYER2} from "../constants";
import {createElement, getRandomNum} from "../utils";
import {generateLogs} from "../chat.js";
import Player from "../Player";

const player1 = new Player(PLAYER1);
const player2 = new Player(PLAYER2);

class Game {
     parsePlayer1Move = (formElement) => {
        const move = {};
        for (let item of formElement) {
            const { name, value, checked } = item;
            if (checked === true && name === 'hit') {
                move.value = getRandomNum(HIT[value]);
                move.hit = value;
            } else if (checked === true && name === 'defence') {
                move.defence = value;
            }
            item.checked = false;
        }
        return move;
    }

    generatePlayer2Move = () => {
        const hit = ATTACK[getRandomNum(3) - 1];
        const defence = ATTACK[getRandomNum(3) - 1];
        return {
            value: getRandomNum(HIT[hit]),
            hit,
            defence,
        }
    }

    calcFinalScore = () => {
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

    start = () => {
        $formFight.addEventListener('submit',  (e) => {
            e.preventDefault();
            const player1Move = this.parsePlayer1Move($formFight);
            const player2Move = this.generatePlayer2Move();

            player1.attack(player1Move, player2Move);
            player2.attack(player2Move, player1Move);

            if (player1.hp === 0 || player2.hp === 0) {
                $formButton.disabled = true;
                this.calcFinalScore();
                createReloadButton();
            }
        })

        player1.createPlayer();
        player2.createPlayer();
        generateLogs('start', player1, player2);
    }
}

export { Game, player1, player2 };