const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];
const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $formButton = document.querySelector('.control .buttonWrap .button');
const $chat = document.querySelector('.chat');

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
    const attacker = (this.player === 1 ? player1 : player2);
    const defending = (this.player === 1 ? player2 : player1);
    if (ourMove.hit !== enemyMove.defence) {
        defending.changeHP(ourMove.value);
        defending.renderHP();
        generateLogs('hit', attacker, defending, ourMove.value);
    } else {
        generateLogs('defence', attacker, defending);
    }
}

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

function generateLogs(type, attacker, defending, damage) {
    const data = logs[type];
    const date = new Date();
    const time = date.toTimeString().slice(0, 5);
    const i = (getRandomNum(data.length) - 1);
    let log;

    switch (type) {
        case 'start':
            log = data.replace('[time]', time).replace('[player1]', player1.name).replace('[player2]', player2.name);
            break;
        case 'end':
            log = `${time} ${data[i].replace('[playerWins]', attacker.name).replace('[playerLose]', defending.name)}`;
            break;
        case 'hit':
        case 'defence':
            let text = data[i].replace('[playerKick]', attacker.name).replace('[playerDefence]', defending.name);
            log = `${time} ${text} ${(damage ? (defending.name + ' -' + damage + 'hp: ' + defending.hp + '/100') : '')}`;
            break;
        case 'draw':
            log = `${time} ${data}`;
            break;
        default:
            log = 'Something went wrong...';
            break;
    }

    const el = `<p>${log}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
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

    console.log('##########');
    console.log(player1.name, ' hit enemy in the ', player1Move.hit, ' for ', player1Move.value, ' points. Defense their ', player1Move.defence);
    console.log(player2.name, ' hit enemy in the ', player2Move.hit, ' for ', player2Move.value, ' points. Defense their ', player2Move.defence);
    console.log('HPs: ', player1.name, ':', player1.hp, '   ', player2.name, ':', player2.hp);
})

generateLogs('start', player1, player2);
