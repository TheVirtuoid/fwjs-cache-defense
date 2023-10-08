import GameScene from "./phaser/GameScene.js";

export default class PhaserGraphicsEngine {

	#game;
	#scene;
	#gameConfig;
	#config;

	constructor(config) {
		this.#gameConfig = config;
		this.#config = config.graphics.engineSettings.phaser;
		this.#game = null;
		this.#scene = null;
	}

	init() {
		// this.#game = new Phaser.Game(this.#config);
		this.#scene = new GameScene(this.#config.scene);
		this.#config.scene = this.#scene;
	}

	buildGameBoard() {
		if (this.#scene) {
			console.log('--------config');
			console.log(this.#gameConfig);
			this.#config.parent = document.getElementById(this.#gameConfig.board.parentDom);
			this.#game = new Phaser.Game(this.#config);
			console.log('------built');
			console.log(this.#config);
			console.log(this.#game);
		}
	}

}