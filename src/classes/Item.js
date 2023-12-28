import ItemType from "./types/ItemType.js";
import RoadDirection from "./types/RoadDirection.js";

export default class Item {
	#id;
	#type;
	#image;
	#direction;

	constructor(args = {}) {
		const { id, type } = args;
		this.id = id;
		this.type = type;
		this.#direction = null;
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

	get image() {
		return this.#image;
	}

	set image(value) {
		if (!(value instanceof Object)) throw new Error(`'image' must be one of the legal image types`);
		this.#image = value;
	}

	get direction() {
		return this.#direction;
	}

	set direction(value) {
		if (!RoadDirection.isDirection(value)) throw new Error(`'direction' must be a valid direction.`);
		this.#direction = value;
	}

}