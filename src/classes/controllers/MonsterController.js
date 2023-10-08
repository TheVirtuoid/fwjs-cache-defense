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
	static ERROR_MOVEMONSTER_INVALID_MONSTER = new TypeError(`"monster" argument is not a type Monster`);
	static ERROR_MOVEMONSTER_MONSTER_NOT_PART_OF_CONTROLLER = new Error(`"monster" argument is not part of the Controller`);
	static ERROR_MOVEMONSTER_MONSTER_NOT_PLACED = new Error(`"monster" has not been placed`);
	static ERROR_PLACEMONSTER_INVALID_PATH = new TypeError(`"path" argument is not a type Array`);

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
		const { monster, position, speed, subPosition, health, path } = args;
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
		if(!(path instanceof Array)) {
			throw MonsterController.ERROR_PLACEMONSTER_INVALID_PATH;
		}
		monster.setPosition(position);
		monster.setSubPosition(subPosition);
		monster.setSpeed(speed);
		monster.setHealth(health);
		monster.setPath(path);
		return monster;
	}

	moveMonster(monster) {
		if (!(monster instanceof Monster)) {
			throw MonsterController.ERROR_MOVEMONSTER_INVALID_MONSTER;
		}
		if (!this.#monsters.has(monster.id)) {
			throw MonsterController.ERROR_MOVEMONSTER_MONSTER_NOT_PART_OF_CONTROLLER;
		}
		if (!monster.hasSubPositionBeenSet()) {
			throw MonsterController.ERROR_MOVEMONSTER_MONSTER_NOT_PLACED;
		}
		const { speed, subPosition } = monster;
		const { x: subPosX, y: subPosY } = subPosition;
		const { x: speedX, y: speedY } = speed;
		const { direction } = monster.getCurrentSubPath();
		if (direction !== null) {
			const { x: speedMultiplierX, y: speedMultiplierY } = direction.speed;
			const newSubPosition = new ItemPosition({
				x: this.#threeDigit(subPosX + speedX * speedMultiplierX),
				y: this.#threeDigit(subPosY + speedY * speedMultiplierY)
			});
			monster.setSubPosition(newSubPosition);
		}
		return monster;
	}

	#threeDigit(number) {
		return parseFloat(number.toFixed(3));
	}
}