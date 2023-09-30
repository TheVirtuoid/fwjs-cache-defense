import BaseGameItem from "./BaseGameItem.js";
import MonsterType from "./types/MonsterType.js";
import ItemPosition from "./ItemPosition.js";
import MonsterSpeed from "./MonsterSpeed.js";

export default class Monster extends BaseGameItem {

	static DEFAULT_SPEED = new MonsterSpeed({ x: 0, y: 0 });
	static DEFAULT_SUBPOSITION = new ItemPosition({ x: -1, y: -1 });
	static DEFAULT_HEALTH = 1;

	static ERROR_INVALID_MONSTER_TYPE = new TypeError(`"type" property not a valid Monster Type`);
	static ERROR_SUBPOSITION_X_OUT_OF_RANGE = new RangeError(`"x" property must be between 0 and .999, inclusive.`);
	static ERROR_SUBPOSITION_Y_OUT_OF_RANGE = new RangeError(`"y" property must be between 0 and .999, inclusive.`);
	static ERROR_SETSPEED_NOT_MONSTERSPEED = new TypeError(`"speed" property is not a MonsterSpeed`);
	static ERROR_SETHEALTH_NOT_NUMBER = new TypeError(`"health" property is not a number`);
	static ERROR_SETHEALTH_GREATER_THAN_0 = new RangeError(`"health" property must be greater than 0`);
	static ERROR_SUBPOSITION_NOT_ITEMPOSITION = new TypeError(`"subPosition" parameter must be an ItemPosition`);

	#type;
	#health;
	#subPosition;
	#speed;

	constructor(args = {}) {
		const { type } = args;
		if (!(MonsterType.MONSTER_TYPES.has(type))) {
			throw Monster.ERROR_INVALID_MONSTER_TYPE;
		}
		super(args);
		this.#type = type;
		this.#subPosition = Monster.DEFAULT_SUBPOSITION;
		this.#health = Monster.DEFAULT_HEALTH;
		this.#speed = Monster.DEFAULT_SPEED;
	}

	get health() {
		return this.#health;
	}

	get subPosition() {
		return this.getSubPosition();
	}

	get speed() {
		return this.getSpeed();
	};

	getSubPosition() {
		return {
			x: this.#subPosition.x,
			y: this.#subPosition.y
		}
	}

	hasSubPositionBeenSet() {
		return !(this.#subPosition.x === Monster.DEFAULT_SUBPOSITION.x || this.#subPosition.y === Monster.DEFAULT_SUBPOSITION.y);
	}

	setSubPosition(subPosition) {
		if (!(subPosition instanceof ItemPosition)) {
			throw Monster.ERROR_SUBPOSITION_NOT_ITEMPOSITION;
		}
		const { x, y } = subPosition;
		if (x < 0 || x >= 1) {
			throw Monster.ERROR_SUBPOSITION_X_OUT_OF_RANGE;
		}
		if (y < 0 || y >= 1) {
			throw Monster.ERROR_SUBPOSITION_Y_OUT_OF_RANGE;
		}
		this.#subPosition = subPosition;
	}

	getSpeed() {
		return {
			x: this.#speed.x,
			y: this.#speed.y
		}
	}

	setSpeed(speed) {
		if (!(speed instanceof MonsterSpeed)) {
			throw Monster.ERROR_SETSPEED_NOT_MONSTERSPEED;
		}
		this.#speed = speed;
	}

	setHealth(health) {
		if (isNaN(health)) {
			throw Monster.ERROR_SETHEALTH_NOT_NUMBER;
		}
		if (health <= 0) {
			throw Monster.ERROR_SETHEALTH_GREATER_THAN_0;
		}
		this.#health = health;
	}
}