export default class MonsterSpeed {

	static ERROR_X_NOT_NUMBER = new TypeError(`"x" property is not a number`);
	static ERROR_Y_NOT_NUMBER = new TypeError(`"y" property is not a number`);
	static ERROR_X_OUT_OF_RANGE = new RangeError(`"x" property is out of range`);
	static ERROR_Y_OUT_OF_RANGE = new RangeError(`"y" property is out of range`);

	#x;
	#y;
	constructor(args = {}) {
		const { x = 0, y = 0 } = args;
		if (typeof(x) !== 'number') {
			throw MonsterSpeed.ERROR_X_NOT_NUMBER;
		}
		if (typeof(y) !== 'number') {
			throw MonsterSpeed.ERROR_Y_NOT_NUMBER;
		}
		if (x < -1 || x > 1) {
			throw MonsterSpeed.ERROR_X_OUT_OF_RANGE;
		}
		if (y < -1 || y > 1) {
			throw MonsterSpeed.ERROR_Y_OUT_OF_RANGE;
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
}