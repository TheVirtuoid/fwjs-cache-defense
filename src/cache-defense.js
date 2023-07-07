import "./css/cacheDefense.pcss";
import Game from "./classes/Game.js";

const newGameButton = document.getElementById('new-game-button');
const gameReady = document.getElementById('game-ready');
const gameBoard = document.getElementById('game-board');
const loading = document.getElementById('loading');

const game = new Game({
	dom: {
		newGameButton,
		gameReady,
		gameBoard,
		loading
	}
});
