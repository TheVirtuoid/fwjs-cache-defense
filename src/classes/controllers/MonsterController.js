import Monster from "../Monster.js";
import ItemPosition from "../ItemPosition.js";
import MonsterSpeed from "../MonsterSpeed.js";

export default class MonsterController {

	static ERROR_PLACEMONSTER_INVALID_MONSTER = new TypeError(`"monster" argument is not a type Monster`);
	static ERROR_PLACEMONSTER_INVALID_POSITION = new TypeError(`"position" argument is not a type ItemPosition`);
	static ERROR_PLACEMONSTER_INVALID_SPEED = new TypeError(`"speed" argument is not a type MonsterSpeed`);
	static ERROR_PLACEMONSTER_INVALID_SUBPOSITION = new TypeError(`"subPosition" argument is not a type ItemPosition`);
	static ERROR_PLACEMONSTER_INVALID_HEALTH = new TypeError(`"health" argument is not a number`);
	static ERROR_PLACEMONSTER_HEALTH_ZERO_OR_LESS = new RangeError(`"health" argument must be greater than 0`);
	static ERROR_PLACEMONSTER_MONSTER_NOT_IN_CONTROLLER = new Error(`"monster" argument is not part of the Controller`);

	#monsters = new Map();
	constructor() {
		this.initialize();
	}

	createMonster(args) {
		const monster = new Monster(args);
		this.#monsters.set(monster.id, monster);
		return monster;
	}

	getMonster(id) {
		return this.#monsters.get(id) || null;
	}

	removeMonster(id) {
		return this.#monsters.delete(id);
	}

	initialize() {
		this.#monsters.clear();
	}

	placeMonster(args = {}) {
		const { monster, position, speed, subPosition, health } = args;
		if (!(monster instanceof Monster)) {
			throw MonsterController.ERROR_PLACEMONSTER_INVALID_MONSTER;
		}
		if (!(position instanceof ItemPosition)) {
			throw MonsterController.ERROR_PLACEMONSTER_INVALID_POSITION;
		}
		if (!(speed instanceof MonsterSpeed)) {
			throw MonsterController.ERROR_PLACEMONSTER_INVALID_SPEED;
		}
		if (!(subPosition instanceof ItemPosition)) {
			throw MonsterController.ERROR_PLACEMONSTER_INVALID_SUBPOSITION;
		}
		if (typeof(health) !== 'number') {
			throw MonsterController.ERROR_PLACEMONSTER_INVALID_HEALTH;
		}
		if (health <= 0) {
			throw MonsterController.ERROR_PLACEMONSTER_HEALTH_ZERO_OR_LESS;
		}
		if (!this.#monsters.has(monster.id)) {
			throw MonsterController.ERROR_PLACEMONSTER_MONSTER_NOT_IN_CONTROLLER;
		}
		monster.setPosition(position);
		monster.setSpeed(speed);
		monster.setSubPosition(subPosition);
		monster.setHealth(health);
		return monster;
	}
}