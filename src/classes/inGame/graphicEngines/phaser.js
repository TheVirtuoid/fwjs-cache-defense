import GameScene from "./phaser/GameScene.js";

export default class PhaserGraphicsEngine {

	#game;
	#scene;
	#gameConfig;
	#config;

	constructor(config) {
		this.#gameConfig = config;
		this.#config = config.graphics.engineSettings.phaser;
		this.#config.parent = document.getElementById(this.#gameConfig.board.parentDom);
		this.#config.cacheDefenseDom = document.getElementById(this.#gameConfig.board.cacheDefenseDom);
		this.#game = null;
		this.#scene = null;
	}

	init() {
		return new Promise((resolve, reject) => {
			console.log('init');
			this.#scene = new GameScene(this.#gameConfig);
			resolve(true);
		});
	}

	buildGameBoard() {
		return new Promise((resolve, reject) => {
			if (this.#scene) {
				this.#config.parent = document.getElementById(this.#gameConfig.board.parentDom);
				this.#config.scene = this.#scene;
				this.#game = new Phaser.Game(this.#config);
				this.#gameConfig.boardDom.cacheDefenseDom.addEventListener(GameScene.EVENT_CREATE, (data) => {
					resolve(data);
				});
			} else {
				reject('No scene');
			}
		});
	}

	addImage(args) {
		if (this.#scene) {
			this.#scene.addImage(args);
		}
	}

}