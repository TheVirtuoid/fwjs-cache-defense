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

	/**
	 *
	 * @param {Object} args - Arguments object
	 * @param {Road} args.road - Road to check
	 * @param {RoadDirection} args.direction - Direction to check
	 * @returns {RoadType[]} - Array of RoadTypes that can be placed in the given direction
	 */
	canPlaceRoad(args = {}) {
		const { road, direction } = args;
		const legalRoads = [];
		if (!(road instanceof Road)) {
			throw RoadController.ERROR_CANPLACEROAD_ARGUMENT_ROAD_INVALID;
		}
		if(!RoadDirection.isDirection(direction)) {
			throw RoadController.ERROR_CANPLACEROAD_ARGUMENT_DIRECTION_INVALID;
		}
		const destinationRoad = this.#getRoadByDirection({ road, direction });
		if (destinationRoad === null || destinationRoad.type === RoadType.NO_ROAD) {
			// no road, so check the other roads
			const hits = {
				top: false,
				right: false,
				bottom: false,
				left: false
			};
			const position = road.position.getAdjacentPosition(direction);
			const top = this.getRoadByPosition(new ItemPosition({ x: position.x + RoadDirection.TOP.x, y: position.y + RoadDirection.TOP.y }));
			const right = this.getRoadByPosition(new ItemPosition({ x: position.x + RoadDirection.RIGHT.x, y: position.y + RoadDirection.RIGHT.y }));
			const bottom = this.getRoadByPosition(new ItemPosition({ x: position.x + RoadDirection.BOTTOM.x, y: position.y + RoadDirection.BOTTOM.y }));
			const left = this.getRoadByPosition(new ItemPosition({ x: position.x + RoadDirection.LEFT.x, y: position.y + RoadDirection.LEFT.y }));
			hits.top = top === road || top === null || top.type === RoadType.NO_ROAD;
			hits.right = right === road || right === null || right.type === RoadType.NO_ROAD;
			hits.bottom = bottom === road || bottom === null || bottom.type === RoadType.NO_ROAD;
			hits.left = left === road || left === null || left.type === RoadType.NO_ROAD;
			// check for 
			if (hits.top && hits.right && hits.bottom) {
				legalRoads.push(RoadType.CORNER_TOP_RIGHT);
			}

		}
		return legalRoads;
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