import ControlPanel from "./inGame/ControlPanel.js";
import WeaponType from "./types/WeaponType.js";
import Weapon from "./Weapon.js";
// import GraphicsEngine from "./inGame/GraphicsEngine.js";
// import PhaserGraphicsEngine from "./inGame/graphicEngines/phaser.js";
// import cacheDefenseConfig from "../cache-defense-config.js";

import ArsenalController from "./controllers/ArsenalController.js";
import BoardController from "./controllers/BoardController.js";
import CacheTowerController from "./controllers/CacheTowerController.js";
import MonsterController from "./controllers/MonsterController.js";
import RoadController from "./controllers/RoadController.js";
import GraphicsEngine from "./inGame/GraphicsEngine.js";
import PhaserGraphicsEngine from "./inGame/graphicEngines/phaser.js";
import cacheDefenseConfig from "../cache-defense-config.js";

export default class Game {

	static ERROR_SETROUND_ARGUMENT_NOT_INTEGER = new TypeError(`"round" argument must be an integer.`);
	static ERROR_SETROUND_ARGUMENT_LESS_THAN_ONE = new TypeError(`"round" argument must be greater than zero.`);

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

	#ready = {
		'arsenalController': false,
		'boardController': false,
		'cacheTowerController': false,
		'monsterController': false,
		'roadController': false
	};

	#gameOver = false;

	constructor(args = {}) {

		const {dom = {}, config = {}} = args;
		this.#dom = dom;
		this.#config = config;

		this.#config.boardDom.cacheDefenseDom = document.getElementById(this.#config.board.cacheDefenseDom);
		this.#config.boardDom.parentDom = document.getElementById(this.#config.board.parentDom);

		this.#gameInProgress = false;

		this.#arsenalController = new ArsenalController();
		this.#cacheTowerController = new CacheTowerController();
		this.#monsterController = new MonsterController();
		this.#roadController = new RoadController();

		this.#controlPanel = new ControlPanel({ dom: this.#dom?.controlPanelDoms });

		this.#graphicsEngine = new GraphicsEngine(new PhaserGraphicsEngine(this.#config));

		this.#boardController = new BoardController({ graphicsEngine: this.#graphicsEngine});

		this.#ready = {
			'arsenalController': true,
			'boardController': true,
			'cacheTowerController': true,
			'monsterController': true,
			'roadController': true,
			'graphicsEngine': true
		};

		this.#waitForGameReady()
				.then(this.#newGame.bind(this))
				.then(this.#setupGame.bind(this));

	}
	get ready() {
		return this.#ready.arsenalController &&
				this.#ready.boardController &&
				this.#ready.cacheTowerController &&
				this.#ready.monsterController &&
				this.#ready.roadController &&
				this.#ready.graphicsEngine;
	}

	get readDetails() {
		return this.#ready;
	}

	get gameInProgress() {
		return this.#gameInProgress;
	}

	get round() {
		return this.#round;
	}

	#newGame() {
		return new Promise((resolve, reject) => {
			this.#dom.loading.classList.add('hidden');
			this.#dom.gameReady.classList.remove('hidden');
			this.#dom.newGameButton.addEventListener('click', () => resolve(), { once: true });

		});
	}

	#setupGame() {
		this.#round = Game.INITIAL_ROUND_NUMBER;
		this.#controlPanel.setRoundNumber(this.#round);
		this.#controlPanel.setCoins(Game.DEFAULT_COINS);
		this.#controlPanel.setHealth(Game.DEFAULT_HEALTH);
		this.#controlPanel.setWeapons(Game.DEFAULT_WEAPON);
		this.#gameInProgress = true;
		this.#dom.newGameButton.classList.add('hidden');
		this.#dom.gameBoard.classList.remove('hidden');
		return this.#graphicsEngine.init()
				.then(this.#boardController.newBoard.bind(this.#boardController))
				.then(() => {
					this.#boardController.addImage({ imageKey: 'road-half-left', x: 400, y: 300 });
					this.#boardController.addImage({ imageKey: 'cache', x: 400, y: 300 });
				});
	}

	#waitForGameReady() {
		return new Promise((resolve, reject) => {
			do {
				requestAnimationFrame(() => {});
			} while (!this.ready);
			resolve();
		});
	}

}
