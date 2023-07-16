import "./css/cacheDefense.pcss";
import Game from "./classes/Game.js";

const newGameButton = document.getElementById('new-game-button');
const gameReady = document.getElementById('game-ready');
const gameBoard = document.getElementById('game-board');
const loading = document.getElementById('loading');
const controlPanel = document.getElementById('control-panel');

const coinsDom = document.getElementById('coins');
const weaponsSelectionDom = document.getElementById('weapons-selection');
const roundNumberDom = document.getElementById('round-number');
const healthDom = document.getElementById('health');

const game = new Game({
	dom: {
		newGameButton,
		gameReady,
		gameBoard,
		loading,
		controlPanel,
		controlPanelDoms: {
			coinsDom, weaponsSelectionDom, roundNumberDom, healthDom
		}
	}
});
