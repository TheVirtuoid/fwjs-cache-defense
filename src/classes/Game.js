import ControlPanel from "./inGame/ControlPanel.js";
import WeaponType from "./types/WeaponType.js";
import Weapon from "./Weapon.js";
import GraphicsEngine from "./inGame/GraphicsEngine.js";
import PhaserGraphicsEngine from "./inGame/graphicEngines/phaser.js";
import cacheDefenseConfig from "../cache-defense-config.js";

import ArsenalController from "./controllers/ArsenalController.js";
import BoardController from "./controllers/BoardController.js";
import CacheTowerController from "./controllers/CacheTowerController.js";
import MonsterController from "./controllers/MonsterController.js";
import RoadController from "./controllers/RoadController.js";

export default class Game {

	static DEFAULT_COINS = 100;
	static INITIAL_ROUND_NUMBER = 1;
	static DEFAULT_HEALTH = 10;
	static DEFAULT_WEAPON = [
		new Weapon({ type: WeaponType.SHOOTER })
	];

	#gameInProgress;
	#boardController;
	#cacheTowerController;
	#roadController;
	#arsenalController;
	#monsterController;
	#round;

	#dom;
	#config;
	#controlPanel;

	#graphicsEngine;

	#readyFlag = {
		'arsenal': false,
		'board': false,
		'cacheTower': false,
		'monster': false,
		'road': false
	};

	#readyHandle;
	#readyTimeout = 5000;
	#readyInterval = 1;

	constructor(args = {}) {

		const {dom = {}, config = {}} = args;
		this.#dom = dom;
		this.#config = config;

		this.#gameInProgress = false;
		/*this.#arsenalController = new Worker('/src/classes/workers/arsenalController.js');
		this.#boardController = new Worker('/src/classes/workers/boardController.js');
		this.#cacheTowerController = new Worker('/src/classes/workers/cacheTowerController.js');
		this.#monsterController = new Worker('/src/classes/workers/monsterController.js');
		this.#roadController = new Worker('/src/classes/workers/roadController.js');
		this.#round = null;

		this.#arsenalController.onmessage = this.#arsenalMessage.bind(this);
		this.#boardController.onmessage = this.#boardMessage.bind(this);
		this.#cacheTowerController.onmessage = this.#cacheTowerMessage.bind(this);
		this.#monsterController.onmessage = this.#monsterMessage.bind(this);
		this.#roadController.onmessage = this.#roadMessage.bind(this);

		this.#arsenalController.postMessage({ message: 'construct', data: ArsenalController });
		this.#boardController.postMessage('initialize');
		this.#cacheTowerController.postMessage('initialize');
		this.#monsterController.postMessage('initialize');
		this.#roadController.postMessage('initialize');*/

		this.#arsenalController = new ArsenalController();
		this.#boardController = new BoardController();
		this.#cacheTowerController = new CacheTowerController();
		this.#monsterController = new MonsterController();
		this.#roadController = new RoadController();


		this.#controlPanel = new ControlPanel({ dom: this.#dom?.controlPanelDoms });

		this.#graphicsEngine = new GraphicsEngine(new PhaserGraphicsEngine(cacheDefenseConfig));

		this.#readyHandle = setInterval(this.#readyChecker.bind(this), this.#readyInterval);
	}

	get gameInProgress() {
		return this.#gameInProgress;
	}

	get boardController() {
		return this.#boardController;
	}

	get cacheTowerController() {
		return this.#cacheTowerController;
	}

	get roadController() {
		return this.#roadController;
	}

	get arsenalController() {
		return this.#arsenalController;
	}

	get monsterController() {
		return this.#monsterController;
	}

	get round() {
		return this.#round;
	}

	newGame() {
		this.#gameInProgress = true;
		this.#round = 0;
		this.#hide(this.#dom.newGameButton);
		this.#show(this.#dom.gameBoard);
		this.#controlPanel.setCoins(Game.DEFAULT_COINS);
		this.#controlPanel.setRoundNumber(Game.INITIAL_ROUND_NUMBER);
		this.#controlPanel.setHealth(Game.DEFAULT_HEALTH);
		this.#controlPanel.setWeapons(Game.DEFAULT_WEAPON);
		this.#show(this.#dom.controlPanel);

		this.#graphicsEngine.init();
		this.#graphicsEngine.buildGameBoard();
	}

	sendMessage(worker, message) {
		this.#boardController.postMessage(message);
	}

	#arsenalMessage(message) {
		this.#readyFlag.arsenal = true;
	}

	#boardMessage(message) {
		this.#readyFlag.board = true;
	}

	#cacheTowerMessage(message) {
		this.#readyFlag.cacheTower = true;
	}

	#monsterMessage(message) {
		this.#readyFlag.monster = true;
	}

	#roadMessage(message) {
		this.#readyFlag.road = true;
	}

	#readyChecker() {
		const {arsenal, board, cacheTower, monster, road} = this.#readyFlag;
		if (arsenal && board && cacheTower && monster && road) {
			clearInterval(this.#readyHandle);
			const {loading, gameReady, newGameButton} = this.#dom;
			this.#hide(loading);
			this.#show(gameReady);
			newGameButton.addEventListener('click', this.newGame.bind(this), {once: true});
		}
		this.#readyTimeout--;
		if (this.#readyTimeout <= 0) {
			clearInterval(this.#readyHandle);
		}
	}

	#hide(dom) {
		dom.classList.add('hidden');
	}

	#show(dom) {
		dom.classList.remove('hidden');
	}
}
