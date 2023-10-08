import "./css/cacheDefense.pcss";
import Game from "./classes/Game.js";
import cacheDefenseConfig from "./cache-defense-config.js";

const newGameButton = document.getElementById('new-game-button');
const gameReady = document.getElementById('game-ready');
const gameBoard = document.getElementById('game-board');
const loading = document.getElementById('loading');
const controlPanel = document.getElementById('control-panel');

const coinsDom = document.getElementById('coins');
const weaponsSelectionDom = document.getElementById('weapons-selection');
const roundNumberDom = document.getElementById('round-number');
const healthDom = document.getElementById('health');

const playingField = document.getElementById('playing-field');

const game = new Game({
	config: cacheDefenseConfig,
	dom: {
		newGameButton,
		gameReady,
		gameBoard,
		loading,
		controlPanel,
		playingField,
		controlPanelDoms: {
			coinsDom, weaponsSelectionDom, roundNumberDom, healthDom
		}
	}
});
