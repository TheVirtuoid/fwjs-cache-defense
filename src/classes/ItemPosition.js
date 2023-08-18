export default class ItemPosition {

	static ERROR_X_NOT_NUMBER = new TypeError(`"x" parameter must be a number.`);
	static ERROR_Y_NOT_NUMBER = new TypeError(`"y" parameter must be a number.`);

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

	toObject() {
		return { x: this.#x, y: this.#y };
	}

	isDefault() {
		return this.#x === ItemPosition.DEFAULT_X && this.#y === ItemPosition.DEFAULT_Y;
	}

	clone() {
		return new ItemPosition({ x: this.#x, y: this.#y });
	}
}