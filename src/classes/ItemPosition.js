import RoadDirection from "./types/RoadDirection.js";

export default class ItemPosition {

	static ERROR_X_NOT_NUMBER = new TypeError(`"x" parameter must be a number.`);
	static ERROR_Y_NOT_NUMBER = new TypeError(`"y" parameter must be a number.`);
	static ERROR_INVALID_DIRECTION = new TypeError(`"direction" parameter must be a valid RoadDirection.`);
	static ERROR_COMPARETO_POSITION_NOT_ITEMPOSITION = new TypeError(`"position" parameter must be an ItemPosition.`);
	static ERROR_COMPARETO_DIRECTION_NOT_ROADDIRECTION = new TypeError(`"direction" parameter must be a valid RoadDirection.`);

	static DEFAULT_X = Number.POSITIVE_INFINITY;
	static DEFAULT_Y = Number.POSITIVE_INFINITY;

	#x;
	#y;
	constructor(args = {}) {
		const { x = ItemPosition.DEFAULT_X, y = ItemPosition.DEFAULT_Y } = args;
		if (typeof(x) !== 'number') {
			throw ItemPosition.ERROR_X_NOT_NUMBER;
		}
		if (typeof(y) !== 'number') {
			throw ItemPosition.ERROR_Y_NOT_NUMBER;
		}
		this.#x = x;
		this.#y = y;
	}

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}

	getAdjacentPosition(direction) {
		if (!RoadDirection.isDirection(direction)) {
			throw ItemPosition.ERROR_INVALID_DIRECTION;
		}
		return new ItemPosition({ x: this.#x + direction.x, y: this.#y + direction.y });
	};

	toObject() {
		return { x: this.#x, y: this.#y };
	}

	isDefault() {
		return this.#x === ItemPosition.DEFAULT_X && this.#y === ItemPosition.DEFAULT_Y;
	}

	clone() {
		return new ItemPosition({ x: this.#x, y: this.#y });
	}

	toKey() {
		return `${this.#x},${this.#y}`;
	}

	compareTo(args = {}) {
		const { position, direction } = args;
		if (!(position instanceof ItemPosition)) {
			throw ItemPosition.ERROR_COMPARETO_POSITION_NOT_ITEMPOSITION;
		}
		if(!RoadDirection.isDirection(direction)) {
			throw ItemPosition.ERROR_COMPARETO_DIRECTION_NOT_ROADDIRECTION;
		}
		switch(direction) {
			case RoadDirection.TOP:
				return this.#y - position.y;
			case RoadDirection.LEFT:
				return position.x - this.#x;
			case RoadDirection.BOTTOM:
				return position.y - this.#y;
			case RoadDirection.RIGHT:
				return this.#x - position.x;
		}
	}
}