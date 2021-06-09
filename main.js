const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

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

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $restartButton = createElement('button', 'button');
    $restartButton.innerText = 'Restart';
    $reloadWrap.appendChild($restartButton);
    return $reloadWrap;
}

const player1 = {
    player: 1,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['palm', 'stick'],
    attack: function() {
        console.log(this.name + ' fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
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
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
};

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

    const $reloadButton = createReloadButton();
    $arenas.appendChild($reloadButton);
    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    })
}

$randomButton.addEventListener('click', function () {
    player1.changeHP(getRandomNum(20));
    player1.renderHP();

    player2.changeHP(getRandomNum(20));
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        calcFinalScore();
    }
})



$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));


