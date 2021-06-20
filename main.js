import { PLAYER1, PLAYER2, ATTACK, HIT } from "./constants";

import Game from './Game';
export const game = new Game({ PLAYER1, PLAYER2, ATTACK, HIT });

game.start();
