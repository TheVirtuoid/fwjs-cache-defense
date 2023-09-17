import cacheDefenseConfig from "../../cache-defense-config.js";

export default class GraphicsEngine {

	#ready;
	#engine;

	constructor(engine) {
		this.#ready = false;
		this.#engine = engine;
	}

	get ready() {
		return this.#ready;
	}

	get engine() {
		return this.#engine;
	}

	init() {
		if (this.#engine) {
			this.#engine.init();
			this.#ready = true;
		}
	}

	buildGameBoard() {
		if (this.#engine) {
			this.#engine.buildGameBoard();
		}
	}
}