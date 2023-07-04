export default class CacheController {

	static DEFAULT_HEALTH = 10;
	static ERROR_NEWCACHE_ARGUMENT_NOT_INTEGER = new TypeError(`"health" argument is not an integer.`);
	static ERROR_NEWCACHE_ARGUMENT_LESS_THAN_ONE = new RangeError(`"health" argument must be greater than 0.`);
	static ERROR_ADJUSTHEALTH_ARGUMENT_NOT_INTEGER = new TypeError(`"health" argument is not an integer.`);

	#health;
	#gameOver;
	constructor() {
		this.#health = 0;
		this.#gameOver = true;
	}

	get health() {
		return this.#health;
	}

	get gameOver() {
		return this.#gameOver;
	}

	newCache(health = CacheController.DEFAULT_HEALTH) {
		if (!Number.isInteger(health)) {
			throw CacheController.ERROR_NEWCACHE_ARGUMENT_NOT_INTEGER;
		}
		if (health < 1) {
			throw CacheController.ERROR_NEWCACHE_ARGUMENT_LESS_THAN_ONE;
		}
		this.#health = health;
		this.#gameOver = false;
	}

	adjustHealth(health) {
		if (!Number.isInteger(health)) {
			throw CacheController.ERROR_ADJUSTHEALTH_ARGUMENT_NOT_INTEGER;
		}
		this.#health += health;
		this.#determineGameOver();
	}

	#determineGameOver() {
		this.#health = Math.max(this.#health, 0);
		this.#gameOver = this.#health === 0;
	}

}
