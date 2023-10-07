import RoadDirection from "./RoadDirection.js";
import ItemPosition from "../ItemPosition.js";

export default class PathType {

	static ERROR_POSITION_NOT_POSITION =  new TypeError(`"position" property is not an ItemPosition`);
	static ERROR_Y_NOT_NUMBER = new TypeError(`"y" property is not a number`);
	static ERROR_DIRECTION_NOT_ROADDIRECTION_OR_NULL = new TypeError(`"direction" property is not a RoadDirection or null`);

	#position;
	#direction;
	constructor(args = {}) {
		const { position, direction } = args;
		if (!(position instanceof ItemPosition)) {
			throw PathType.ERROR_POSITION_NOT_POSITION;
		}
		if (direction !== null && !RoadDirection.isDirection(direction)) {
			throw PathType.ERROR_DIRECTION_NOT_ROADDIRECTION_OR_NULL;
		}
		this.#position = position;
		this.#direction = direction;
	}

	get x() {
		return this.#position.x;
	}

	get y() {
		return this.#position.y;
	}

	get direction() {
		return this.#direction;
	}

	getObject() {
		return { x: this.#position.x, y: this.#position.y, direction: this.#direction };
	}
}