import BaseGameItem from "../BaseGameItem.js";
import ItemPosition from "../ItemPosition.js";
import Field from "../Field.js";

export default class BoardController {

	static ERROR_INSERTITEM_WRONGITEM = new TypeError(`"item" argument must be a BaseGameItem object.`);
	static ERROR_INSERTITEM_WRONGPOSITION = new TypeError(`"position" argument must be an ItemPosition object.`);
	static ERROR_INSERTITEM_DUPLICATEID = new TypeError(`"item" has duplicate id with item already inserted.`);
	static ERROR_GETITEM_UNDEFINED_ID = new TypeError(`"item" is undefined.`);
	static ERROR_REMOVEITEM_INVALID_ARG = new TypeError(`"item" argument must be a BaseGameItem object.`);

	#items = new Map();

	#field;
	#graphicsEngine;
	constructor(args = {}) {
		const { graphicsEngine = null } = args;
		this.#field = null;
		this.#graphicsEngine = graphicsEngine;
	}

	get field() {
		return this.#field;
	}


	newBoard() {
		this.#field = new Field();
	}

	get lastError() {
		return BoardController.ERROR_INSERTITEM_WRONGITEM;
	}

	insertItem(item, position) {
		if (!(item instanceof BaseGameItem)) {
			throw BoardController.ERROR_INSERTITEM_WRONGITEM;
		}
		if (!(position instanceof ItemPosition)) {
			throw BoardController.ERROR_INSERTITEM_WRONGPOSITION;
		}
		if (this.#items.has(item.id)) {
			throw BoardController.ERROR_INSERTITEM_DUPLICATEID;
		}
		item.setPosition(position);
		this.#items.set(item.id, item);
	}

	getItem(id) {
		if (!id) {
			throw BoardController.ERROR_GETITEM_UNDEFINED_ID;
		}
		return this.#items.get(id) || null;
	}

	removeItem(item) {
		if (!(item instanceof BaseGameItem)) {
			throw BoardController.ERROR_REMOVEITEM_INVALID_ARG;
		}
		return this.#items.delete(item.id);
	}



}