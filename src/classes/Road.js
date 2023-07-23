import RoadType from "./types/RoadType.js";
import BaseGameItem from "./BaseGameItem.js";
import RoadDirection from "./types/RoadDirection.js";
export default class Road extends BaseGameItem {

	static ERROR_ROAD_INVALID_ROAD_TYPE = new TypeError(`Invalid Road type.`);

	#type;

	constructor(args = {}) {
		const { type } = args;
		if (!RoadType.ROAD_TYPES.has(type)) {
			throw Road.ERROR_ROAD_INVALID_ROAD_TYPE;
		}
		super(args);
		this.#type = type;
	}

	get type() {
		return this.#type;
	}

	get top() {
		return this.#type?.directions?.[RoadDirection.TOP];
	}

	get right() {
		return this.#type?.directions?.[RoadDirection.RIGHT];
	}

	get bottom() {
		return this.#type?.directions?.[RoadDirection.BOTTOM];
	}

	get left() {
		return this.#type?.directions?.[RoadDirection.LEFT];
	}

}