const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['palm', 'stick'],
    attack: function() {
        console.log(this.name + ' fight...');
    },
};

const player2 = {
    player: 2,
    name: 'SONYA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapons: ['fist', 'fireball'],
    attack: function() {
        console.log(this.name + ' fight...');
    },
};

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

function getRandomNum() {
    return Math.ceil(Math.random() * 20);
}

function changeHp(player) {
    const $playerLife = document.querySelector('.player'+ player.player +' .life');
    const points = getRandomNum();

    if (player.hp > points) {
        player.hp -= points;
    } else {
        player.hp = 0;
    }
    $playerLife.style.width = player.hp + '%';
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

$randomButton.addEventListener('click', function () {
    changeHp(player1);
    changeHp(player2);
    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        calcFinalScore();
    }
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
