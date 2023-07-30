import Road from "../Road.js";
import RoadDirection from "../types/RoadDirection.js";
import RoadType from "../types/RoadType.js";
import ItemPosition from "../ItemPosition.js";

export default class RoadController {

	static ERROR_GETROADSBYDIRECTION_ARGUMENT_INVALID = new TypeError(`"direction" argument must be one of the RoadDirection values.`);
	static ERROR_FILTERROADDIRECTIONS_ROADDIRECTIONARRAY_INVALID = new TypeError(`"roadDirectionArray" argument must be an array.`);
	static ERROR_FILTERROADDIRECTIONS_ROADDIRECTIONARRAY_TOO_FEW_ENTRIES = new TypeError(`"roadDirectionArray" argument must have 9 entries.`);
	static ERROR_FILTERROADDIRECTIONS_ROADDIRECTIONARRAY_INVALID_TYPES = new TypeError(`"roadDirectionArray" argument must have only RoadType values.`);
	static ERROR_FILTERROADDIRECTIONS_ENTRYDIRECTION_INVALID_DIRECTION = new TypeError(`"entryDirection" argument must be one of the RoadDirection values.`);
	static ERROR_CANPLACEROAD_ARGUMENT_ROAD_INVALID = new TypeError(`"road" argument must be a Road.`);
	static ERROR_CANPLACEROAD_ARGUMENT_DIRECTION_INVALID = new TypeError(`"direction" argument must be one of the RoadDirection values.`);
	static ERROR_GETROADBYPOSITION_POSITION_INVALID = new TypeError(`"position" argument must be a type ItemPosition.`);

	#roads = new Map();
	#roadPositions = new Map();
	constructor() {
		this.initialize();
	}

	createRoad(args = {}) {
		const { type, id, position } = args;
		const road = new Road({ type, id, position });
		this.#roads.set(road.id, road);
		// this.#setConnections(road);
		return road;
	}

	getRoad(id) {
		return this.#roads.get(id) || null;
	}

	getRoadByPosition(position) {
		if (!(position instanceof ItemPosition)) {
			throw RoadController.ERROR_GETROADBYPOSITION_POSITION_INVALID;
		}
		return this.#roads.get(position.id) || null;
	}

	initialize() {
		this.#roads.clear();
		this.#roadPositions.clear();
	}

	/*getRoadsByDirection(direction) {
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
	}*/

	canPlaceRoad(args = {}) {
		const { road, direction } = args;
		if (!(road instanceof Road)) {
			throw RoadController.ERROR_CANPLACEROAD_ARGUMENT_ROAD_INVALID;
		}
		if(!RoadDirection.isDirection(direction)) {
			throw RoadController.ERROR_CANPLACEROAD_ARGUMENT_DIRECTION_INVALID;
		}
		const destinationRoad = this.#getRoadByDirection({ road, direction });
		return destinationRoad === null || destinationRoad.type === RoadType.NO_ROAD;
	}

	#getRoadByDirection(args = {}) {
		const { road, direction } = args;
		return road.getRoadByDirection(direction);
	}

	#setConnections(road) {
		const top = road.position.y - 1;
		const right = road.position.x + 1;
		const bottom = road.position.y + 1;
		const left = road.position.x - 1;

	}

}