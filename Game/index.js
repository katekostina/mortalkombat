import {$arenas, $formButton, $formFight, createReloadButton} from "../constants/index.js";
import {createElement, getRandomNum} from "../utils/index.js";
import {generateLogs} from "../chat.js";
import Player from "../Player/index.js";

class Game {
    getPlayers = async () => {
        const res = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players', { method: 'GET' });
        const body = await res.json();
        return body;
    };

    getAutoEnemy = async () => {
        const body = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
        return body;
    }

    start = async () => {
        const autoEnemy = await this.getAutoEnemy();
        const playerPicked = JSON.parse(localStorage.getItem('player1'));

        this.player1 = new Player({
            ...playerPicked,
            player: 1,
            rootSelector: $arenas,
        });

        this.player2 = new Player({
            ...autoEnemy,
            player: 2,
            rootSelector: $arenas,
        });

        $formFight.addEventListener('submit',  async (e) => {
            e.preventDefault();
            const player1Choice = this.parsePlayer1Choice($formFight);

            const { player1: player1Move,  player2: player2Move } = await this.getPlayersMoves(player1Choice);

            this.fight(player1Move, player2Move);

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

    parsePlayer1Choice = (formElement) => {
        const move = {};
        for (let item of formElement) {
            const { name, value, checked } = item;
            if (checked) {
                switch (name) {
                    case 'hit': move.hit = value;
                        break;
                    case 'defence': move.defence = value;
                        break;
                }
            }
            item.checked = false;
        }
        return move;
    }

    getPlayersMoves = async ({ hit, defence}) => {
        const res = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        }).then(res => res.json());
        return res;
    }

    fight = (player1Move, player2Move) => {
        // player1 attacks player 2
        if (player1Move.hit !== player2Move.defence) {
            this.player2.changeHP(player1Move.value);
            this.player2.renderHP();
            generateLogs('hit', this.player1, this.player2, player1Move.value);
        } else {
            generateLogs('defence', this.player1, this.player2, player1Move.value);
        }

        //player2 attacks player1
        if (player2Move.hit !== player1Move.defence) {
            this.player1.changeHP(player2Move.value);
            this.player1.renderHP();
            generateLogs('hit', this.player2, this.player1, player2Move.value);
        } else {
            generateLogs('defence', this.player2, this.player1, player2Move.value);
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
}

export default Game;