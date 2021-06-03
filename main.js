const player1 = {
    name: 'SUB-ZERO',
    hp: 85,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['palm', 'stick'],
    attack: function() {
        console.log(this.name + ' fight...');
    },
};

const player2 = {
    name: 'SONYA',
    hp: 70,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapons: ['fist', 'fireball'],
    attack: function() {
        console.log(this.name + ' fight...');
    },
};

function createPlayer(className, player) {
    const $arenas = document.querySelector('.arenas');

    const $player = document.createElement('div');
    $player.classList.add(className);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    $player.appendChild($progressbar);

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = player.hp + '%';
    $progressbar.appendChild($life);

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = player.name;
    $progressbar.appendChild($name);

    const $character = document.createElement('div');
    $character.classList.add('character');
    $player.appendChild($character);

    const $img = document.createElement('img');
    $img.src = player.img;
    $character.appendChild($img);

    $arenas.appendChild($player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);
