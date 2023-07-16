
/*

MAKE SURE you talk about how now having a singleton instance means states are carried
over for each test

So do adjustCoins before resetCoins
 */

import WeaponType from "../types/WeaponType.js";
import Weapon from "../Weapon.js";

let instance;
export default class ControlPanel {

	static ERROR_SETCOINS_ARGUMENT_NOT_INTEGER = new TypeError(`"coins" must be an integer.`);
	static ERROR_SETCOUNT_ARGUMENT_NOT_POSITIVE = new RangeError(`"coins" must be positive.`);
	static ERROR_SETROUNDNUMBER_ARGUMENT_NOT_INTEGER = new TypeError(`"roundNumber" must be an integer.`);
	static ERROR_SETROUNDNUMBER_ARGUMENT_NOT_GREATERTHAN_ZERO = new RangeError(`"roundNumber" must be greater than zero.`);
	static ERROR_SETHEALTH_ARGUMENT_NOT_INTEGER = new TypeError(`"health" must be an integer.`);
	static ERROR_SETHEALTH_ARGUMENT_NOT_POSITIVE = new RangeError(`"health" must be positive.`);
	static ERROR_SETWEAPONS_ARGUMENT_NOT_ARRAY = new TypeError(`"weapons" argument must be an array.`);
	static ERROR_SETWEAPONS_ARGUMENT_EMPTY_ARRAY = new RangeError(`"weapons" array argument must not be empty`);
	static ERROR_SETWEAPONS_ARGUMENT_NOT_ARRAY_WEAPONS = new TypeError(`"weapons" array must be an array of Weapon`);

	#dom;
	constructor(args = {}) {
		if (!instance) {
			const { dom } = args;
			this.setDom(dom);
			instance = this;
		}
		return instance;
	}

	get coinsDom() {
		return this.#dom?.coinsDom;
	}

	get weaponsSelectionDom() {
		return this.#dom?.weaponsSelectionDom;
	}

	get roundNumberDom() {
		return this.#dom?.roundNumberDom;
	}

	get healthDom() {
		return this.#dom?.healthDom;
	}

	setDom(dom) {
		this.#dom = dom;
	}

	setCoins(coins) {
		if (!Number.isInteger(coins)) {
			throw ControlPanel.ERROR_SETCOINS_ARGUMENT_NOT_INTEGER;
		}
		if (coins < 0) {
			throw ControlPanel.ERROR_SETCOUNT_ARGUMENT_NOT_POSITIVE;
		}
		if (this.coinsDom) {
			this.coinsDom.textContent = `${coins}`;
		}
	}

	setRoundNumber(roundNumber) {
		if (!Number.isInteger(roundNumber)) {
			throw ControlPanel.ERROR_SETROUNDNUMBER_ARGUMENT_NOT_INTEGER;
		}
		if (roundNumber < 1) {
			throw ControlPanel.ERROR_SETROUNDNUMBER_ARGUMENT_NOT_GREATERTHAN_ZERO;
		}
		if (this.roundNumberDom) {
			this.roundNumberDom.textContent = `${roundNumber}`;
		}
	}

	setHealth(health) {
		if (!Number.isInteger(health)) {
			throw ControlPanel.ERROR_SETHEALTH_ARGUMENT_NOT_INTEGER;
		}
		if (health < 0) {
			throw ControlPanel.ERROR_SETHEALTH_ARGUMENT_NOT_POSITIVE;
		}
		if (this.healthDom) {
			this.healthDom.textContent = `${health}`;
		}
	}

	setWeapons(weapons) {
		if (!Array.isArray(weapons)) {
			throw ControlPanel.ERROR_SETWEAPONS_ARGUMENT_NOT_ARRAY;
		}
		if (weapons.length === 0) {
			throw ControlPanel.ERROR_SETWEAPONS_ARGUMENT_EMPTY_ARRAY;
		}
		if (weapons.some((weapon) => !(weapon instanceof Weapon))) {
			throw ControlPanel.ERROR_SETWEAPONS_ARGUMENT_NOT_ARRAY_WEAPONS;
		}
		if (this.#dom?.weaponsSelectionDom) {
			const weaponsDom = this.#dom.weaponsSelectionDom;
			let output = `<select>`;
			weapons.forEach((weapon) => {
				const weaponObj = weapon.toObject();
				output = `${output}<option value="${weapon.id}">${weapon.name}</option>`;
			});
			output = `${output}</select>`;
			while(weaponsDom.firstChild) {
				weaponsDom.removeChild(weaponsDom.firstChild);
			}
			weaponsDom.insertAdjacentHTML('afterbegin', output);
		}
	}
};