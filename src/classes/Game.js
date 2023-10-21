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

		this.#gameInProgress = false;

		this.#arsenalController = new ArsenalController();
		this.#cacheTowerController = new CacheTowerController();
		this.#monsterController = new MonsterController();
		this.#roadController = new RoadController();
		this.#boardController = new BoardController();

		this.#controlPanel = new ControlPanel({ dom: this.#dom?.controlPanelDoms });

		// this.#graphicsEngine = new GraphicsEngine(new PhaserGraphicsEngine(cacheDefenseConfig));
		this.#graphicsEngine = true;

		this.#ready = {
			'arsenalController': true,
			'boardController': true,
			'cacheTowerController': true,
			'monsterController': true,
			'roadController': true,
			'graphicsEngine': true
		};

	}

	get ready() {
		return this.#ready;
	}

	get gameInProgress() {
		return this.#gameInProgress;
	}

	get round() {
		return this.#round;
	}

}
