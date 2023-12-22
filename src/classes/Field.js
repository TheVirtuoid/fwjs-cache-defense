import Dim from "./Dim.js";

export default class Field {
	#boardSize;
	#tileSize;
	#halfSize;
	#subXSize;
	#subYSize;
	#subXHalfSize;
	#subYHalfSize;
	static SUBDIVISIONS = 3;
	constructor(args = {}) {
		const { boardSize, tileSize } = args;
		this.boardSize = boardSize;
		this.tileSize = tileSize;
		this.#halfSize = tileSize.width / 2;
		this.#subXSize = this.tileSize.width / Field.SUBDIVISIONS;
		this.#subYSize = this.tileSize.height / Field.SUBDIVISIONS;
		this.#subXHalfSize = this.#subXSize / 2;
		this.#subYHalfSize = this.#subYSize / 2;
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

		const graphicX = Math.floor(this.#halfSize + this.#tileSize.width * x);
		const graphicY = Math.floor(this.#halfSize + this.#tileSize.height * y);

		if (graphicX < 0 || graphicX >= this.#boardSize.width) throw new Error(`'x' is out of range.`);
		if (graphicY < 0 || graphicY >= this.#boardSize.height) throw new Error(`'y' is out of range.`);

		return { x: graphicX, y: graphicY };
	}

	getSubXY(args = {}) {
		const { x, y, subX, subY } = args;
		if (x === undefined) throw new Error(`'x' must be a property.`);
		if (y === undefined) throw new Error(`'y' must be a property.`);
		if (subX === undefined) throw new Error(`'subX' must be a property.`);
		if (subY === undefined) throw new Error(`'subY' must be a property.`);
		if (!Number.isInteger(x)) throw new Error(`'x' must be an integer.`);
		if (!Number.isInteger(y)) throw new Error(`'y' must be an integer.`);
		if (!Number.isInteger(subX)) throw new Error(`'subX' must be an integer.`);
		if (!Number.isInteger(subY)) throw new Error(`'subY' must be an integer.`);

		if(subX < 0 || subX >= Field.SUBDIVISIONS) throw new Error(`'x or subX' is out of range.`);
		if(subY < 0 || subY >= Field.SUBDIVISIONS) throw new Error(`'y or subY' is out of range.`);


		let graphicX = Math.floor(this.#tileSize.width * x + this.#halfSize + (subX - 1) * this.#subXSize);
		let graphicY = Math.floor(this.#tileSize.height * y + this.#halfSize + (subY - 1) * this.#subYSize);

		if (graphicX < 0 || graphicX >= this.#boardSize.width) throw new Error(`'x or subX' is out of range.`);
		if (graphicY < 0 || graphicY >= this.#boardSize.height) throw new Error(`'y or subY' is out of range.`);

		return { x: graphicX, y: graphicY };
	}
}