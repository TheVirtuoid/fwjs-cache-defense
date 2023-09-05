import RoadType from "./types/RoadType.js";
import BaseGameItem from "./BaseGameItem.js";
import RoadDirection from "./types/RoadDirection.js";
export default class Road extends BaseGameItem {

	static ERROR_ROAD_INVALID_ROAD_TYPE = new TypeError(`Invalid Road type.`);
	static ERROR_GETROADBYDIRECTION_INVALID_DIRECTION = new TypeError(`"direction" argument must be one of the RoadDirection values.`);
	static ERROR_SETROADINDIRECTION_INVALID_DIRECTION = new TypeError(`"direction" argument must be one of the RoadDirection values.`);
	static ERROR_SETROADINDIRECTION_INVALID_ROAD = new TypeError(`"road" argument must be a Road.`);

	#type;
	#connections;

	constructor(args = {}) {
		const { type } = args;
		if (!RoadType.ROAD_TYPES.has(type)) {
			throw Road.ERROR_ROAD_INVALID_ROAD_TYPE;
		}
		super(args);
		this.#type = type;
		this.#connections = new Map();
	}

	get type() {
		return this.#type;
	}

	get top() {
		return this.#type?.directions?.[RoadDirection.TOP.index];
	}

	get right() {
		return this.#type?.directions?.[RoadDirection.RIGHT.index];
	}

	get bottom() {
		return this.#type?.directions?.[RoadDirection.BOTTOM.index];
	}

	get left() {
		return this.#type?.directions?.[RoadDirection.LEFT.index];
	}

	get value() {
		return this.#type?.value || 0;
	}

	getRoadByDirection(direction) {
		if (!RoadDirection.isDirection(direction)) {
			throw Road.ERROR_GETROADBYDIRECTION_INVALID_DIRECTION;
		}
		return this.#connections.get(direction) || null;
	}

	setRoadInDirection(args = {}) {
		const { direction, road } = args;
		if (!RoadDirection.isDirection(direction)) {
			throw Road.ERROR_SETROADINDIRECTION_INVALID_DIRECTION;
		}
		if (!(road instanceof Road)) {
			throw Road.ERROR_SETROADINDIRECTION_INVALID_ROAD;
		}
		this.#connections.set(direction, road);
	};

	get connections () {
		return this.#connections;
	}

	get value() {
		return this.#type.value;
	}
}