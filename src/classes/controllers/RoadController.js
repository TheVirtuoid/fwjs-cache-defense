import Road from "../Road.js";
import RoadDirection from "../types/RoadDirection.js";
import RoadType from "../types/RoadType.js";

export default class RoadController {

	static ERROR_GETROADSBYDIRECTION_ARGUMENT_INVALID = new TypeError(`"direction" argument must be one of the RoadDirection values.`);
	static ERROR_FILTERROADDIRECTIONS_ROADDIRECTIONARRAY_INVALID = new TypeError(`"roadDirectionArray" argument must be an array.`);
	static ERROR_FILTERROADDIRECTIONS_ROADDIRECTIONARRAY_TOO_FEW_ENTRIES = new TypeError(`"roadDirectionArray" argument must have 9 entries.`);
	static ERROR_FILTERROADDIRECTIONS_ROADDIRECTIONARRAY_INVALID_TYPES = new TypeError(`"roadDirectionArray" argument must have only RoadType values.`);
	static ERROR_FILTERROADDIRECTIONS_ENTRYDIRECTION_INVALID_DIRECTION = new TypeError(`"entryDirection" argument must be one of the RoadDirection values.`);

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

	getRoadsByDirection(direction) {
		if (RoadDirection.DIRECTIONS.indexOf(direction) === -1) {
			throw RoadController.ERROR_GETROADSBYDIRECTION_ARGUMENT_INVALID;
		}
		const roads = [];
		switch(direction) {
			case RoadDirection.TOP:
				roads.push(RoadType.HALF_BOTTOM);
				roads.push(RoadType.CORNER_BOTTOM_RIGHT);
				roads.push(RoadType.CORNER_BOTTOM_LEFT);
				roads.push(RoadType.T_TOP_BOTTOM_LEFT);
				roads.push(RoadType.T_TOP_BOTTOM_RIGHT);
				roads.push(RoadType.T_LEFT_RIGHT_BOTTOM);
				roads.push(RoadType.STRAIGHT_TOP_BOTTOM);
				break;
			case RoadDirection.RIGHT:
				roads.push(RoadType.HALF_LEFT);
				roads.push(RoadType.CORNER_TOP_LEFT);
				roads.push(RoadType.CORNER_BOTTOM_LEFT);
				roads.push(RoadType.T_LEFT_RIGHT_BOTTOM);
				roads.push(RoadType.T_LEFT_RIGHT_TOP);
				roads.push(RoadType.T_TOP_BOTTOM_LEFT);
				roads.push(RoadType.STRAIGHT_LEFT_RIGHT);
				break;
			case RoadDirection.BOTTOM:
				roads.push(RoadType.HALF_TOP);
				roads.push(RoadType.CORNER_TOP_RIGHT);
				roads.push(RoadType.CORNER_TOP_LEFT);
				roads.push(RoadType.T_TOP_BOTTOM_LEFT);
				roads.push(RoadType.T_TOP_BOTTOM_RIGHT);
				roads.push(RoadType.T_LEFT_RIGHT_TOP);
				roads.push(RoadType.STRAIGHT_TOP_BOTTOM);
				break;
			case RoadDirection.LEFT:
				roads.push(RoadType.HALF_RIGHT);
				roads.push(RoadType.CORNER_TOP_RIGHT);
				roads.push(RoadType.CORNER_BOTTOM_RIGHT);
				roads.push(RoadType.T_LEFT_RIGHT_BOTTOM);
				roads.push(RoadType.T_LEFT_RIGHT_TOP);
				roads.push(RoadType.T_TOP_BOTTOM_RIGHT);
				roads.push(RoadType.STRAIGHT_LEFT_RIGHT);
				break;
			default:
				break;
		}
		return roads;
	}

	filterRoadDirections (args = {}) {
		const { roadDirectionArray, entryDirection } = args;
		if (!Array.isArray(roadDirectionArray)) {
			throw RoadController.ERROR_FILTERROADDIRECTIONS_ROADDIRECTIONARRAY_INVALID;
		}
		if (roadDirectionArray.length !== 9) {
			throw RoadController.ERROR_FILTERROADDIRECTIONS_ROADDIRECTIONARRAY_TOO_FEW_ENTRIES;
		}
		if (roadDirectionArray.some((roadType) => !RoadType.ROAD_TYPES.has(roadType))) {
			throw RoadController.ERROR_FILTERROADDIRECTIONS_ROADDIRECTIONARRAY_INVALID_TYPES;
		}
		if (RoadDirection.DIRECTIONS.indexOf(entryDirection) === -1) {
			throw RoadController.ERROR_FILTERROADDIRECTIONS_ENTRYDIRECTION_INVALID_DIRECTION;
		}

		// if direction contains a road, direction is invalid

	}
}