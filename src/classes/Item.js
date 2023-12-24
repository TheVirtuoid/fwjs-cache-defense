import ItemType from "./types/ItemType.js";

export default class Item {
	#id;
	#type;

	constructor(args = {}) {
		const { id, type } = args;
		this.id = id;
		this.type = type;
	}

	get id() {
		return this.#id;
	}
	set id(value) {
		if (value === undefined) throw new Error(`'id' must be a property.`);
		this.#id = value;
	}
	get type() {
		return this.#type;
	}

	set type(value) {
		if (value === undefined) throw new Error(`'type' must be a property.`);
		if (!ItemType.ITEM_TYPES.has(value)) throw new Error(`'type' must be a valid type.`);
		this.#type = value;
	}

}