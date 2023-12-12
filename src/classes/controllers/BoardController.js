import BaseGameItem from "../BaseGameItem.js";
import ItemPosition from "../ItemPosition.js";
import Field from "../Field.js";
import Road from "../Road.js";

export default class BoardController {

	static ERROR_INSERTITEM_WRONGITEM = new TypeError(`"item" argument must be a BaseGameItem object.`);
	static ERROR_INSERTITEM_WRONGPOSITION = new TypeError(`"position" argument must be an ItemPosition object.`);
	static ERROR_INSERTITEM_DUPLICATEID = new TypeError(`"item" has duplicate id with item already inserted.`);
	static ERROR_GETITEM_UNDEFINED_ID = new TypeError(`"item" is undefined.`);
	static ERROR_REMOVEITEM_INVALID_ARG = new TypeError(`"item" argument must be a BaseGameItem object.`);
	static ERROR_GETITEMSBYPOSITION_ARGUMENT_NOT_POSITION = new TypeError(`"position" argument must be an ItemPosition object.`);

	#items = new Map();

	#field;
	#graphicsEngine;
	#itemPositions;
	constructor(args = {}) {
		const { graphicsEngine = null } = args;
		this.#field = null;
		this.#graphicsEngine = graphicsEngine;
		this.#itemPositions = new Map();
	}

	get field() {
		return this.#field;
	}

	get graphicsEngine() {
		return this.#graphicsEngine;
	}


	newBoard() {
		this.#field = new Field();
		return this.#graphicsEngine.buildGameBoard();
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
		const positionKey = position.toKey();
		const itemsAtPosition = this.#itemPositions.get(positionKey) || [];
		itemsAtPosition.push(item);
		this.#itemPositions.set(positionKey, itemsAtPosition);
		this.#items.set(item.id, item);
		if (item instanceof Road) {
			this.#field.addRoad({ road: item });
		} else {
			this.#field.placeItem({ item });
		}
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
		const positionKey = item.position.toKey();
		const itemsAtPosition = this.#itemPositions.get(positionKey) || [];
		this.#itemPositions.set(positionKey, itemsAtPosition.filter((i) => i.id !== item.id));
		const didRemove = this.#items.delete(item.id);
		if (didRemove) {
			this.#field.removeItem({ item });
		}
		return didRemove;
	}

	getItemsByPosition(position) {
		if (!(position instanceof ItemPosition)) {
			throw BoardController.ERROR_GETITEMSBYPOSITION_ARGUMENT_NOT_POSITION;
		}
		const positionKey = position.toKey();
		return this.#itemPositions.get(positionKey) || [];
	}

	getRoadsToExpand(args = {}) {
		return this.#field.legalRoadsToPlace(args);
	}

	addImage(args) {
		if (this.#graphicsEngine) {
			this.#graphicsEngine.addImage(args);
		}
	}
}