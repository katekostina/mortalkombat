import {changeHP, elHP, renderHP, attack} from './player.js';

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

export { player1, player2 };