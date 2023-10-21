import MonsterController from "./controllers/MonsterController.js";
import MonsterType from "./types/MonsterType.js";
import RoadController from "./controllers/RoadController.js";
import ItemPosition from "./ItemPosition.js";
import BoardController from "./controllers/BoardController.js";
import RoadDirection from "./types/RoadDirection.js";

export default class Round {
	static ERROR_ROUND_NOT_INTEGER = new TypeError(`"round" argument must be an integer.`);
	static ERROR_ROUND_LESS_THAN_ONE = new TypeError(`"round" argument must be greater than zero.`);
	static ERROR_GENERATEMONSTERS_ARGUMENT_NOT_INTEGER = new TypeError(`"numberOfMonstersToGenerate" argument must be an integer.`);
	static ERROR_GENERATEMONSTERS_ARGUMENT_LESS_THAN_ONE = new TypeError(`"numberOfMonstersToGenerate" argument must be greater than zero.`);
	static ERROR_ROUND_MISSING_MONSTERCONTROLLER = new TypeError(`"controllers" argument must have a MonsterController property.`);
	static ERROR_ROUND_MISSING_ROADCONTROLLER = new TypeError(`"controllers" argument must have a RoadController property.`);
	static ERROR_ROUND_MISSING_BOARDCONTROLLER = new TypeError(`"controllers" argument must have a BoardController property.`);
	static ERROR_GETROADSTOEXPAND_POSITION_NOT_ITEMPOSITION = new TypeError(`"position" argument must be an ItemPosition.`);
	static ERROR_GETROADSTOEXPAND_DIRECTION_NOT_ROADDIRECTION = new TypeError(`"direction" argument must be a RoadDirection.`);

	#round = 0;
	#monsterController;
	#roadController;
	#boardController;

	constructor(args = {}) {
		const { round, controllers = {} } = args;
		if (!Number.isInteger(round)) {
			throw Round.ERROR_ROUND_NOT_INTEGER;
		}
		if (round < 1) {
			throw Round.ERROR_ROUND_LESS_THAN_ONE;
		}
		const { monsterController, roadController, boardController } = controllers;
		if (!(monsterController instanceof MonsterController)) {
			throw Round.ERROR_ROUND_MISSING_MONSTERCONTROLLER;
		}
		if (!(roadController instanceof RoadController)) {
			throw Round.ERROR_ROUND_MISSING_ROADCONTROLLER;
		}
		if (!(boardController instanceof BoardController)) {
			throw Round.ERROR_ROUND_MISSING_BOARDCONTROLLER;
		}
		this.#monsterController = monsterController;
		this.#roadController = roadController;
		this.#boardController = boardController;
		this.#round = round;
	}

	get round() {
		return this.#round;
	}

	numberOfMonstersToGenerate() {
		return this.#round * (this.#round - 1) + 1;
	}

	generateMonsters(numberOfMonsters) {
		if (!Number.isInteger(numberOfMonsters)) {
			throw Round.ERROR_GENERATEMONSTERS_ARGUMENT_NOT_INTEGER;
		}
		if (numberOfMonsters < 1) {
			throw Round.ERROR_GENERATEMONSTERS_ARGUMENT_LESS_THAN_ONE;
		}
		const monsters = [];
		for (let i = 0; i < numberOfMonsters; i++) {
			monsters.push(this.#monsterController.createMonster({ type: MonsterType.ALIEN }));
		}
		return monsters;
	}

	getRoadsToExpand(args = {}) {
		const { position, direction } = args;
		if (!(position instanceof ItemPosition)) {
			throw Round.ERROR_GETROADSTOEXPAND_POSITION_NOT_ITEMPOSITION;
		}
		if (!(RoadDirection.isDirection(direction))) {
			throw Round.ERROR_GETROADSTOEXPAND_DIRECTION_NOT_ROADDIRECTION;
		}
		this.#boardController.getRoadsToExpand(args);
	}
}