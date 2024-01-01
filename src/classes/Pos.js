export default class Pos {

	#x;
	#y;
	constructor(args = {}) {
		const { x, y } = args;
		if (x === undefined) throw new Error(`'x' must be a property.`);
		if (y === undefined) throw new Error(`'y' must be a property.`);
		this.x = x;
		this.y = y;
	}

	get x() {
		return this.#x;
	}
	set x(value) {
		if (!Number.isInteger(value)) throw new Error(`'x' must be an integer.`);
		if (value < 0) throw new Error(`'x' must be greater than or equal to 0.`);
		this.#x = value;
	}

	get y() {
		return this.#y;
	}
	set y(value) {
		if (!Number.isInteger(value)) throw new Error(`'y' must be an integer.`);
		if (value < 0) throw new Error(`'y' must be greater than or equal to 0.`);
		this.#y = value;
	}

	toString() {
		return `${this.x}-${this.y}`;
	}
}