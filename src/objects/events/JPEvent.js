export default class JPEvent {
	#name;
	#data;
	constructor(name, data = {}) {
		this.#name = name;
		this.#data = data;
		Object.seal(this);
	}

	get name () {
		return this.#name;
	}

	set name (value) {
		this.#name = value;
	}

	get data() {
		return this.#data;
	}

	set data(value) {
		this.#data = value;
	}

	get message() {
		return { name: this.name, data: this.data };
	}
}