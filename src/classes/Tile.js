import Pos from "./Pos.js";
import RoadType from "./types/RoadType.js";
import Item from "./Item.js";
import RoadDirection from "./types/RoadDirection.js";

export default class Tile {

	#position;
	#roadType;
	#id;
	#image;
	#subPositions = new Map();
	constructor(args = {}) {
		const { position, roadType, id } = args;
		this.position = position;
		this.id = id;
		this.roadType = roadType;
	}

	get id() {
		return this.#id;
	}

	set id(value) {
		if (value === undefined) throw new Error(`'id' must be a property.`);
		this.#id = value;
	}

	get position() {
		return this.#position;
	}

	set position(value) {
		if (value === undefined) throw new Error(`'position' must be a property.`);
		if (!(value instanceof Pos)) throw new Error(`'position' must be a Pos class.`);
		this.#position = value;
	}

	get roadType() {
		return this.#roadType;
	}

	set roadType(value) {
		if (value === undefined) throw new Error(`'roadType' must be a property.`);
		if (!RoadType.ROAD_TYPES.has(value)) throw new Error(`'roadType' must be a valid type.`);
		this.#roadType = value;
	}

	get image() {
		return this.#image;
	}

	set image(value) {
		if (!(value instanceof Object)) throw new Error(`'image' must be one of the legal objects.`);
		this.#image = value;
	}

	addItem(args = {}) {
		const { item, subPosition } = args;
		if (item === undefined) throw new Error(`'item' must be a property.`);
		if (!(item instanceof Item)) throw new Error(`'item' must be an Item class.`);
		if (subPosition === undefined) throw new Error(`'subPosition' must be a property.`);
		if (!(subPosition instanceof Pos)) throw new Error(`'subPosition' must be a Pos class.`);
		if (this.#subPositions.has(subPosition)) throw new Error(`'subPosition' is already occupied.`);
		this.#subPositions.set(subPosition, item);
	}

	getItem(subPosition) {
		if (subPosition === undefined) throw new Error(`'subPosition' must be a property.`);
		if (!(subPosition instanceof Pos)) throw new Error(`'subPosition' must be a Pos class.`);
		return this.#subPositions.get(subPosition);
	}

	removeItem(subPosition) {
		if (subPosition === undefined) throw new Error(`'subPosition' must be a property.`);
		if (!(subPosition instanceof Pos)) throw new Error(`'subPosition' must be a Pos class.`);
		if (!this.#subPositions.has(subPosition)) throw new Error(`'subPosition' is not occupied.`);
		this.#subPositions.delete(subPosition);
	}

	getItems() {
		return [...this.#subPositions.values()];
	}

	getNextPosition(direction) {
		if (!RoadDirection.isDirection(direction)) throw new Error(`'direction' must be a valid RoadDirection.`);
		return new Pos({ x: this.position.x + direction.x, y: this.position.y + direction.y });
	}
}