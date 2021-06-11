const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $formButton = document.querySelector('.control .buttonWrap .button');

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function createPlayer(playerObj) {
    const $player = createElement('div', 'player'+playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $name.innerText = playerObj.name;
    $life.style.width = playerObj.hp + '%';
    $img.src = playerObj.img;

    $player.appendChild($progressbar);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($character);
    $character.appendChild($img);
    return $player;
}

// getting random integer number from 1 to max inclusively
function getRandomNum(max) {
    return Math.ceil(Math.random() * max);
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

function parsePlayer1Move(formElement) {
    const move = {};
    for (let item of formElement) {
        if (item.checked === true && item.name === 'hit') {
            move.value = getRandomNum(HIT[item.value]);
            move.hit = item.value;
        } else if (item.checked === true && item.name === 'defence') {
            move.defence = item.value;
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

function attack(ourMove, enemyMove) {
    const enemy = (this.player === 1 ? player2 : player1);
    if(ourMove.hit !== enemyMove.defence) {
        enemy.changeHP(ourMove.value);
        enemy.renderHP();
    }
}

function calcFinalScore() {
    let roundResult;
    if (player1.hp === 0 && player2.hp === 0) {
        roundResult = 'draw'
    } else if (player1.hp === 0) {
        roundResult = player2.name + ' wins';
    } else if (player2.hp === 0) {
        roundResult = player1.name + ' wins';
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

function createReloadButton() {
    const $reloadButtonContainer = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    })

    $reloadButtonContainer.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonContainer);
}

const player1 = {
    player: 1,
    name: 'SONYA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapons: ['fist', 'fireball'],
    attack,
    changeHP,
    elHP,
    renderHP,
};

const player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['palm', 'stick'],
    attack,
    changeHP,
    elHP,
    renderHP,
};

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

    console.log('##### next move #####');
    console.log(player1.name, ' hit enemy in the ', player1Move.hit, ' for ', player1Move.value, ' points. Defense their ', player1Move.defence);
    console.log(player2.name, ' hit enemy in the ', player2Move.hit, ' for ', player2Move.value, ' points. Defense their ', player2Move.defence);
    console.log('Final HPs: ', player1.name, ':', player1.hp, '   ', player2.name, ':', player2.hp);
})
