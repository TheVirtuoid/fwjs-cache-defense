import ItemPosition from "./ItemPosition.js";
import { v4 as uuidv4 } from 'uuid';

export default class BaseGameItem {
	#id;
	#position;
	constructor(args = {}) {
		const { id = uuidv4() } = args;
		this.#id = id;
		this.#position = new ItemPosition();
	}

	get id() {
		return this.#id;
	}

	get position() {
		return this.#position;
	}

	setPosition(position) {
		this.#position = position;
	}
}