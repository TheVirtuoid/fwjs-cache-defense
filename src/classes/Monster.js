import BaseGameItem from "./BaseGameItem.js";
import MonsterType from "./types/MonsterType.js";

export default class Monster extends BaseGameItem {

	static ERROR_INVALID_MONSTER_TYPE = new TypeError(`"type" property not a valid Monster Type`);

	#type;

	constructor(args = {}) {
		const { type } = args;
		if (!(MonsterType.MONSTER_TYPES.has(type))) {
			throw Monster.ERROR_INVALID_MONSTER_TYPE;
		}
		super(args);
		this.#type = type;
	}
}