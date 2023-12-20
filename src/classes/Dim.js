export default class Dim {
	#width = null;
	#height = null;

	constructor({ width, height }) {
		if (width === undefined) throw new Error(`'width' must be a property.`);
		if (height === undefined) throw new Error(`'height' must be a property.`);
		this.width = width;
		this.height = height;
	}

	get width() { return this.#width; }
	set width(value) {
		if (!Number.isInteger(value)) throw new Error(`'width' must be an integer.`);
		if (value < 0) throw new Error(`'width' must be greater than or equal to 0.`);
		this.#width = value;
	}

	get height() { return this.#height; }
	set height(value) {
		if (!Number.isInteger(value)) throw new Error(`'height' must be an integer.`);
		if (value < 0) throw new Error(`'height' must be greater than or equal to 0.`);
		this.#height = value;
	}

	clone() {
		return new Dim({ width: this.width, height: this.height });
	}
}