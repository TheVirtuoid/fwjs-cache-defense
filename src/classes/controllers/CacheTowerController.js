import CacheTower from "../CacheTower.js";

export default class CacheTowerController {

	static DEFAULT_HEALTH = 10;
	static ERROR_ADJUSTCACHETOWERHEALTH_NO_CACHETOWER = new Error(`No cacheTower has been created. Use 'newCacheTower()'.`);

	#cacheTower;
	#gameOver;
	constructor() {
		this.#cacheTower = null;
		this.#gameOver = true;
	}

	get health() {
		return this.#cacheTower.health;
	}

	get gameOver() {
		return this.#gameOver;
	}

	newCacheTower(health) {
		this.#cacheTower = new CacheTower({ health });
		this.#gameOver = false;
	}

	adjustCacheTowerHealth(health) {
		if (this.#cacheTower === null) {
			throw CacheTowerController.ERROR_ADJUSTCACHETOWERHEALTH_NO_CACHETOWER;
		}
		this.#cacheTower.adjustHealth(health);
		this.#determineGameOver();
	}

	#determineGameOver() {
		this.#gameOver = this.#cacheTower === null || this.#cacheTower.health === 0;
	}

}
