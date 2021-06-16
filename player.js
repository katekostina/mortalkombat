import { createElement } from './utils.js';
import { generateLogs } from './chat.js';
import { player1, player2 } from './playersConfig.js';
import {getRandomNum} from './utils.js';
import {ATTACK, HIT} from './constants.js';

function createPlayer({ name, hp, img, player }) {
    const $player = createElement('div', 'player'+ player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $name.innerText = name;
    $life.style.width = hp + '%';
    $img.src = img;

    $player.appendChild($progressbar);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($character);
    $character.appendChild($img);
    return $player;
}

function changeHP(points) {
    if (this.hp > points) {
        this.hp -= points;
    } else {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector('.player'+ this.player +' .life');
}

function renderHP() {
    const $life = this.elHP();
    $life.style.width = this.hp + '%';
}

function attack(ourMove, enemyMove) {
    const attacker = (this.player === 1 ? player1 : player2);
    const defending = (this.player === 1 ? player2 : player1);
    if (ourMove.hit !== enemyMove.defence) {
        defending.changeHP(ourMove.value);
        defending.renderHP();
        generateLogs('hit', attacker, defending, ourMove.value);
    } else {
        generateLogs('defence', attacker, defending, 0);
    }
}

function parsePlayer1Move(formElement) {
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

function generatePlayer2Move() {
    const hit = ATTACK[getRandomNum(3) - 1];
    const defence = ATTACK[getRandomNum(3) - 1];
    return {
        value: getRandomNum(HIT[hit]),
        hit,
        defence,
    }
}

export { createPlayer, elHP, changeHP, renderHP, attack, parsePlayer1Move, generatePlayer2Move };