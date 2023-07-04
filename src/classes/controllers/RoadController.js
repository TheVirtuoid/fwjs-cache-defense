import Road from "../Road.js";

export default class RoadController {

	#roads = new Map();
	constructor() {
		this.initialize();
	}

	createRoad(args = {}) {
		const { type, id } = args;
		const road = new Road({ type, id });
		this.#roads.set(road.id, road);
		return road;
	}

	getRoad(id) {
		return this.#roads.get(id) || null;
	}

	initialize() {
		this.#roads.clear();
	}
}