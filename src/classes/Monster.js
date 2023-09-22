import BaseGameItem from "./BaseGameItem.js";
import MonsterType from "./types/MonsterType.js";

export default class Monster extends BaseGameItem {

	static DEFAULT_SPEED = { x: 0, y: 0 };

	static ERROR_INVALID_MONSTER_TYPE = new TypeError(`"type" property not a valid Monster Type`);
	static ERROR_SUBPOSITION_X_NOT_NUMBER = new TypeError(`"x" property is not a number`);
	static ERROR_SUBPOSITION_Y_NOT_NUMBER = new TypeError(`"y" property is not a number`);
	static ERROR_SUBPOSITION_X_OUT_OF_RANGE = new RangeError(`"x" property must be between 0 and .999, inclusive.`);
	static ERROR_SUBPOSITION_Y_OUT_OF_RANGE = new RangeError(`"y" property must be between 0 and .999, inclusive.`);
	static ERROR_SETSPEED_X_NOT_NUMBER = new TypeError(`"x" property is not a number`);
	static ERROR_SETSPEED_Y_NOT_NUMBER = new TypeError(`"y" property is not a number`);
	static ERROR_SETSPEED_X_OUT_OF_RANGE = new RangeError(`"x" property must be between -1 and 1, exclusive.`);
	static ERROR_SETSPEED_Y_OUT_OF_RANGE = new RangeError(`"y" property must be between -1 and 1, exclusive.`);

	#type;
	#subPosition = {
		x: Number.POSITIVE_INFINITY,
		y: Number.POSITIVE_INFINITY
	};
	#speed = {
		x: Monster.DEFAULT_SPEED.x,
		y: Monster.DEFAULT_SPEED.y
	};

	constructor(args = {}) {
		const { type } = args;
		if (!(MonsterType.MONSTER_TYPES.has(type))) {
			throw Monster.ERROR_INVALID_MONSTER_TYPE;
		}
		super(args);
		this.#type = type;
		this.#changeSubPosition(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
	}

	getSubPosition() {
		return {
			x: this.#subPosition.x,
			y: this.#subPosition.y
		}
	}

	hasSubPositionBeenSet() {
		return !(this.#subPosition.x === Number.POSITIVE_INFINITY || this.#subPosition.y === Number.POSITIVE_INFINITY);
	}

	setSubPosition(x, y) {
		if (typeof(x) !== 'number') {
			throw Monster.ERROR_SUBPOSITION_X_NOT_NUMBER;
		}
		if (typeof(y) !== 'number') {
			throw Monster.ERROR_SUBPOSITION_Y_NOT_NUMBER;
		}
		if (x < 0 || x >= 1) {
			throw Monster.ERROR_SUBPOSITION_X_OUT_OF_RANGE;
		}
		if (y < 0 || y >= 1) {
			throw Monster.ERROR_SUBPOSITION_Y_OUT_OF_RANGE;
		}
		this.#changeSubPosition(x, y);
	}

	getSpeed() {
		return {
			x: this.#speed.x,
			y: this.#speed.y
		}
	}

	setSpeed(x, y) {
		if (typeof(x) !== 'number') {
			throw Monster.ERROR_SETSPEED_X_NOT_NUMBER;
		}
		if (typeof(y) !== 'number') {
			throw Monster.ERROR_SETSPEED_Y_NOT_NUMBER;
		}
		if (x <= -1 || x >=1) {
			throw Monster.ERROR_SETSPEED_X_OUT_OF_RANGE;
		}
		if (y <= -1 || y >=1) {
			throw Monster.ERROR_SETSPEED_Y_OUT_OF_RANGE;
		}
		this.#speed.x = x;
		this.#speed.y = y;
	}

	#changeSubPosition(x, y) {
		this.#subPosition.x = x;
		this.#subPosition.y = y;
	}
}