import Monster from "../Monster.js";

export default class MonsterController {

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
}