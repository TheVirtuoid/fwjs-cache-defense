export default class CacheTower {

	static ERROR_HEALTH_NOT_INTEGER = new TypeError(`"health" property must be an integer.`);
	static ERROR_HEALTH_LESS_THAN_ONE = new RangeError(`"health" property must be greater than zero.`);
	static ERROR_ADJUSTHEALTH_ARGUMENT_NOT_INTEGER = new TypeError(`"health" property must be an integer.`);
	static DEFAULT_HEALTH = 10;

	#health;

	constructor(args = {}) {
		const { health= CacheTower.DEFAULT_HEALTH } = args;
		if (!Number.isInteger(health)) {
			throw CacheTower.ERROR_HEALTH_NOT_INTEGER;
		}
		if (health < 1) {
			throw CacheTower.ERROR_HEALTH_LESS_THAN_ONE;
		}
		this.#health = health;
	}

	get health() {
		return this.#health;
	}

	adjustHealth(health) {
		if (!Number.isInteger(health)) {
			throw CacheTower.ERROR_ADJUSTHEALTH_ARGUMENT_NOT_INTEGER;
		}
		this.#health += health;
		this.#health = Math.max(this.#health, 0);
	}
}