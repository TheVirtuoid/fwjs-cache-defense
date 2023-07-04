import Weapon from "../Weapon.js";

export default class ArsenalController {

	#weapons = new Map();
	constructor() {
		this.initialize();
	}

	createWeapon(args) {
		const weapon = new Weapon(args);
		this.#weapons.set(weapon.id, weapon);
		return weapon;
	}

	getWeapon(id) {
		return this.#weapons.get(id) || null;
	}

	removeWeapon(id) {
		return this.#weapons.delete(id);
	}

	initialize() {
		this.#weapons.clear();
	}
}