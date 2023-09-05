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
		this.#roadPositions.set(road.position.toString(), road);
		this.#setConnections(road);
		return road;
	}

	getRoad(id) {
		return this.#roads.get(id) || null;
	}

	getRoadByPosition(position) {
		if (!(position instanceof ItemPosition)) {
			throw RoadController.ERROR_GETROADBYPOSITION_POSITION_INVALID;
		}
		return this.#roadPositions.get(position.toString()) || null;
	}

	initialize() {
		this.#roads.clear();
		this.#roadPositions.clear();
	}

	#getRoadByDirection(args = {}) {
		const { road, direction } = args;
		const newPosition = road.position.getAdjacentPosition(direction);
		return this.getRoadByPosition(newPosition);
	}

	#setConnections(road) {
		let destinationRoad;

		destinationRoad = this.#getRoadByDirection({ road, direction: RoadDirection.TOP });
		if (destinationRoad instanceof Road) {
			road.setRoadInDirection({direction: RoadDirection.TOP, road: destinationRoad});
			destinationRoad.setRoadInDirection({direction: RoadDirection.BOTTOM, road});
		}

		destinationRoad = this.#getRoadByDirection({ road, direction: RoadDirection.RIGHT });
		if (destinationRoad instanceof Road) {
			road.setRoadInDirection({direction: RoadDirection.RIGHT, road: destinationRoad});
			destinationRoad.setRoadInDirection({direction: RoadDirection.LEFT, road});
		}

		destinationRoad = this.#getRoadByDirection({ road, direction: RoadDirection.BOTTOM });
		if (destinationRoad instanceof Road) {
			road.setRoadInDirection({direction: RoadDirection.BOTTOM, road: destinationRoad});
			destinationRoad.setRoadInDirection({direction: RoadDirection.RIGHT, road});
		}

		destinationRoad = this.#getRoadByDirection({ road, direction: RoadDirection.LEFT });
		if (destinationRoad instanceof Road) {
			road.setRoadInDirection({direction: RoadDirection.LEFT, road: destinationRoad});
			destinationRoad.setRoadInDirection({direction: RoadDirection.RIGHT, road});
		}

	}

}