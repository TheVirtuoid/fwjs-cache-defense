export default class ItemPosition {

	#x;
	#y;
	constructor() {
		this.#x = 0;
		this.#y = 1;
	}

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}
}