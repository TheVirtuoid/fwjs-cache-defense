import RoadType from "./types/RoadType.js";
import BaseGameItem from "./BaseGameItem.js";
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

	get value() {
		return this.#type.value;
	}
}