import {$arenas, $formButton, $formFight, createReloadButton} from "../constants/domConstants.js";
import {createElement, getRandomNum} from "../utils";
import {generateLogs} from "../chat.js";
import Player from "../Player";

class Game {
    constructor(props) {
        this.player1 = new Player(props.PLAYER1);
        this.player2 = new Player(props.PLAYER2);
        this.attackParts = props.ATTACK;
        this.hitPoints = props.HIT;
    }
     parsePlayer1Move = (formElement) => {
        const move = {};
        for (let item of formElement) {
            const { name, value, checked } = item;
            if (checked === true && name === 'hit') {
                move.value = getRandomNum(this.hitPoints[value]);
                move.hit = value;
            } else if (checked === true && name === 'defence') {
                move.defence = value;
            }
            item.checked = false;
        }
        return move;
    }

    generatePlayer2Move = () => {
        const hit = this.attackParts[getRandomNum(3) - 1];
        const defence = this.attackParts[getRandomNum(3) - 1];
        return {
            value: getRandomNum(this.hitPoints[hit]),
            hit,
            defence,
        }
    }

    calcFinalScore = () => {
        let roundResult;
        if (this.player1.hp === 0 && this.player2.hp === 0) {
            roundResult = 'draw';
            generateLogs('draw');
        } else if (this.player1.hp === 0) {
            roundResult = this.player2.name + ' wins';
            generateLogs('end', this.player2, this.player1);
        } else if (this.player2.hp === 0) {
            roundResult = this.player1.name + ' wins';
            generateLogs('end', this.player1, this.player2);
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

            this.player1.attack(player1Move, player2Move);
            this.player2.attack(player2Move, player1Move);

            if (this.player1.hp === 0 || this.player2.hp === 0) {
                $formButton.disabled = true;
                this.calcFinalScore();
                createReloadButton();
            }
        })

        this.player1.createPlayer();
        this.player2.createPlayer();
        generateLogs('start', this.player1, this.player2);
    }
}

export default Game;