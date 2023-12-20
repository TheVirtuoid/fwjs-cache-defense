import Dim from "./Dim.js";

export default class Field {
	#boardSize;
	#tileSize;
	#halfSize;
	constructor(args = {}) {
		const { boardSize, tileSize } = args;
		this.boardSize = boardSize;
		this.tileSize = tileSize;
		this.#halfSize = tileSize.width / 2;
	}
	get boardSize() {
		return this.#boardSize;
	}
	set boardSize(value) {
		if (value === undefined) throw new Error(`'boardSize' must be a property.`);
		if (!(value instanceof Dim)) throw new Error(`'boardSize' must be a Dim class.`);
		this.#boardSize = value;
	}
	get tileSize() {
		return this.#tileSize;
	}
	set tileSize(value) {
		if (value === undefined) throw new Error(`'tileSize' must be a property.`);
		if (!(value instanceof Dim)) throw new Error(`'tileSize' must be a Dim class.`);
		this.#tileSize = value;
	}
}