import { createElement } from '../utils/index.js';
import { generateLogs } from '../chat.js';

class Player {
    constructor(props) {
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.player = props.player;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }

    changeHP = (points) => {
        if (this.hp > points) {
            this.hp -= points;
        } else {
            this.hp = 0;
        }
    }

    elHP = () => {
        return document.querySelector(`.${this.selector} .life`);
    }

    renderHP = () => {
        const $life = this.elHP();
        $life.style.width = this.hp + '%';
    }

    createPlayer = () => {
        const $player = createElement('div', 'player'+ this.player);
        const $progressbar = createElement('div', 'progressbar');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $character = createElement('div', 'character');
        const $img = createElement('img');

        $name.innerText = this.name;
        $life.style.width = this.hp + '%';
        $img.src = this.img;

        $player.appendChild($progressbar);
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $player.appendChild($character);
        $character.appendChild($img);
        this.rootSelector.appendChild($player);
    }
}


export default Player;