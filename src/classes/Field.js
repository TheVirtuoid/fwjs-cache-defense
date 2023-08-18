import Road from "./Road.js";
import ItemPosition from "./ItemPosition.js";
import BaseGameItem from "./BaseGameItem.js";

export default class Field {

	static ERROR_ADDROAD_INVALID_ROAD = new TypeError(`"road" argument must be Road.`);
	static ERROR_ADDROAD_INVALID_POSITION = new TypeError(`"position" argument must be ItemPosition.`);
	static ERROR_ADDROAD_POSITION_IS_DEFAULT_ON_ROAD = new TypeError(`"position" property of "road" is a default position.`);
	static ERROR_ADDROAD_POSITION_OCCUPIED = new TypeError(`"position" is already occupied by another road.`);
	static ERROR_GETROADBYPOSITION_INVALID_POSITION	= new TypeError(`"position" argument must be ItemPosition.`);
	static ERROR_PLACEITEM_INVALID_ITEM = new TypeError(`"item" argument must be BaseGameItem.`);
	static ERROR_PLACEITEM_INVALID_POSITION = new TypeError(`"position" argument must be ItemPosition.`);
	static ERROR_PLACEITEM_CANNOT_PLACE_ROAD = new TypeError(`Cannot place Road on Field.`);
	static ERROR_GETITEMBYPOSITION_INVALID_POSITION = new TypeError(`"position" argument must be ItemPosition.`);
	static ERROR_REMOVEITEM_INVALID_ITEM = new TypeError(`"item" argument must be BaseGameItem.`);

	#itemPositions;
	#roads;
	#items;
	constructor() {
		this.#itemPositions = new Map();
		this.#items = new Set();
		this.#roads = new Map();
	}

	addRoad(args = {}) {
		const { road, position } = args;
		let modifiedPosition;
		if (!(road instanceof Road)) {
			throw Field.ERROR_ADDROAD_INVALID_ROAD;
		}
		if (position === undefined && road.position.isDefault()) {
			throw Field.ERROR_ADDROAD_POSITION_IS_DEFAULT_ON_ROAD;
		} else {
			modifiedPosition = position === undefined ? road.position : position;
		}
		if (!(modifiedPosition instanceof ItemPosition)) {
			throw Field.ERROR_ADDROAD_INVALID_POSITION;
		}
		const roadKey = modifiedPosition.toString();
		if (this.#roads.has(roadKey)) {
			throw Field.ERROR_ADDROAD_POSITION_OCCUPIED;
		}
		if (road.position !== modifiedPosition) {
			road.setPosition(modifiedPosition);
		}
		this.#roads.set(roadKey, road);
	}

	getRoadByPosition(position) {
		if (!(position instanceof ItemPosition)) {
			throw Field.ERROR_GETROADBYPOSITION_INVALID_POSITION;
		}
		return this.#roads.get(position.toString()) || null;
	}

	placeItem(args = {}) {
		const { item, position } = args;
		let modifiedPosition;
		if (!(item instanceof BaseGameItem)) {
			throw Field.ERROR_PLACEITEM_INVALID_ITEM;
		}
		if (position === undefined && item.position.isDefault()) {
			throw Field.ERROR_PLACEITEM_INVALID_POSITION;
		} else {
			modifiedPosition = position === undefined ? item.position : position;
		}
		if (!(modifiedPosition instanceof ItemPosition)) {
			throw Field.ERROR_PLACEITEM_INVALID_POSITION;
		}
		const itemKey = modifiedPosition.toString();
		if (item instanceof Road) {
			throw Field.ERROR_PLACEITEM_CANNOT_PLACE_ROAD;
		}
		if (item.position !== modifiedPosition) {
			item.setPosition(modifiedPosition);
		}
		this.#itemPositions.set(itemKey, item);
		this.#items.add(item);
	}

	getItemByPosition(position) {
		if (!(position instanceof ItemPosition)) {
			throw Field.ERROR_GETITEMBYPOSITION_INVALID_POSITION;
		}
		return this.#itemPositions.get(position.toString()) || null;
	}

	removeItem(item) {
		if (!(item instanceof BaseGameItem)) {
			throw Field.ERROR_REMOVEITEM_INVALID_ITEM;
		}
		const itemKey = item.position.toString();
		this.#itemPositions.delete(itemKey);
		this.#items.delete(item);
	}
}