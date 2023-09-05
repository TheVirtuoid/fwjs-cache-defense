import BaseGameItem from "./BaseGameItem.js";
import WeaponType from "./types/WeaponType.js";

export default class Weapon extends BaseGameItem {

	static ERROR_INVALID_WEAPON_TYPE = new TypeError(`"type" property not a valid Weapon Type`);

	#type;

	constructor(args = {}) {
		const { type } = args;
		if (!(WeaponType.WEAPON_TYPES.has(type))) {
			throw Weapon.ERROR_INVALID_WEAPON_TYPE;
		}
		super(args);
		this.#type = type;
	}

	get type () {
		return this.#type;
	}

	get name () {
		return this.#type.name;
	}

	toObject() {
		const base = super.toObject();
		return { type: this.#type, name: this.name, ...base };
	}

	toJSON() {
		return super.toJSON();
	}
}