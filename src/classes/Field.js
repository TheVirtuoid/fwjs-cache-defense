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

	getXY(args = {}) {
		const { x, y } = args;
		if (x === undefined) throw new Error(`'x' must be a property.`);
		if (y === undefined) throw new Error(`'y' must be a property.`);
		if (!Number.isInteger(x)) throw new Error(`'x' must be an integer.`);
		if (!Number.isInteger(y)) throw new Error(`'y' must be an integer.`);

		const graphicX = this.#halfSize + this.#tileSize.width * x;
		const graphicY = this.#halfSize + this.#tileSize.height * y;

		if (graphicX < 0 || graphicX >= this.#boardSize.width) throw new Error(`'x' is out of range.`);
		if (graphicY < 0 || graphicY >= this.#boardSize.height) throw new Error(`'y' is out of range.`);

		return { x: graphicX, y: graphicY };
	}
}