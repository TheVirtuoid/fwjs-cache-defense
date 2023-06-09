import ItemPosition from "./ItemPosition.js";
import { v4 as uuidv4 } from 'uuid';

export default class BaseGameItem {

	static ERROR_ARG_NOT_ITEMPOSITION = new TypeError(`"position" argument must be ItemPosition.`);

	#id;
	#position;
	constructor(args = {}) {
		const { id = uuidv4(), position = new ItemPosition() } = args;
		this.#id = id;
		if (!(position instanceof ItemPosition)) {
			throw BaseGameItem.ERROR_ARG_NOT_ITEMPOSITION;
		}
		this.#position = position;
	}

	get id() {
		return this.#id;
	}

	get position() {
		return this.#position;
	}

	setPosition(position) {
		if (!(position instanceof ItemPosition)) {
			throw BaseGameItem.ERROR_ARG_NOT_ITEMPOSITION;
		}
		this.#position = position;
	}
}