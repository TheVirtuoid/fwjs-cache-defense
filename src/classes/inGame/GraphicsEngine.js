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
		return new Promise((resolve, reject) => {
			if (this.#engine) {
				this.#engine.init()
						.then((data) => {
							this.#ready = true;
							resolve(data);
						})
			} else {
				reject('No graphics engine');
			}
		});
	}

	buildGameBoard() {
		return this.#engine.buildGameBoard();
	}

	addImage(args) {
		if (this.#engine) {
			this.#engine.addImage(args);
		}
	}
}