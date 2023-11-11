import Road from "./Road.js";
import ItemPosition from "./ItemPosition.js";
import BaseGameItem from "./BaseGameItem.js";
import RoadDirection from "./types/RoadDirection.js";
import RoadType from "./types/RoadType.js";

export default class Field {

	static ERROR_ADDROAD_INVALID_ROAD = new TypeError(`"road" argument must be Road.`);
	static ERROR_ADDROAD_INVALID_POSITION = new TypeError(`"position" argument must be ItemPosition.`);
	static ERROR_ADDROAD_POSITION_IS_DEFAULT_ON_ROAD = new TypeError(`"position" property of "road" is a default position.`);
	static ERROR_ADDROAD_POSITION_OCCUPIED = new TypeError(`"position" is already occupied by another road.`);
	static ERROR_GETROADBYPOSITION_INVALID_POSITION	= new TypeError(`"position" argument must be ItemPosition.`);
	static ERROR_PLACEITEM_INVALID_ITEM = new TypeError(`"item" argument must be BaseGameItem.`);
	static ERROR_PLACEITEM_INVALID_POSITION = new TypeError(`"position" argument must be ItemPosition.`);
	static ERROR_PLACEITEM_CANNOT_PLACE_ROAD = new TypeError(`Cannot place Road on Field.`);
	static ERROR_GETITEMBYPOSITION_INVALID_POSITION = new TypeError(`"position" argument must be ItemPosition.`);
	static ERROR_REMOVEITEM_INVALID_ITEM = new TypeError(`"item" argument must be BaseGameItem.`);

	static ERROR_PLACENEXTROAD_INVALID_POSITION = new TypeError(`"position" argument must be ItemPosition.`);
	static ERROR_PLACENEXTROAD_INVALID_DIRECTION = new TypeError(`"direction" argument must be Direction.`);
	static ERROR_PLACENEXTROAD_NO_ROAD_AT_POSITION = new TypeError(`No road at "position".`);
	static ERROR_PLACENEXTROAD_CANNOT_PLACE_IN_DIRECTION = new TypeError(`Road at "position" has no connection to direction specified.`);

	static ROAD_OPPOSITES = new Map([
		[RoadDirection.TOP, RoadDirection.BOTTOM],
		[RoadDirection.BOTTOM, RoadDirection.TOP],
		[RoadDirection.LEFT, RoadDirection.RIGHT],
		[RoadDirection.RIGHT, RoadDirection.LEFT]
	]);

	/**
	 * RoadConnections includes all the roads that CONNECT to the road in the specified direction.
	 * 		For example, a direction of TOP will return all the roads that connect to the BOTTOM of the road begin checked.
	 * @type {Map<unknown, unknown>}
	 */

	static ROAD_CONNECTIONS = new Map([
		[RoadDirection.TOP, [...RoadType.ROAD_TYPES].filter((roadType) => (roadType.value & RoadDirection.BOTTOM.value) !== 0)],
		[RoadDirection.RIGHT, [...RoadType.ROAD_TYPES].filter((roadType) => (roadType.value & RoadDirection.LEFT.value) !== 0)],
		[RoadDirection.BOTTOM, [...RoadType.ROAD_TYPES].filter((roadType) => (roadType.value & RoadDirection.TOP.value) !== 0)],
		[RoadDirection.LEFT, [...RoadType.ROAD_TYPES].filter((roadType) => (roadType.value & RoadDirection.RIGHT.value) !== 0)]
	]);

	static getOppositeRoadConnections(direction) {
		return Field.ROAD_CONNECTIONS.get(Field.ROAD_OPPOSITES.get(direction));
	}

	#itemPositions;
	#roads;
	#items;
	#roadConnections = new Map();
	constructor() {
		this.#itemPositions = new Map();
		this.#items = new Set();
		this.#roads = new Map();
		// build roadConnections
		RoadDirection.ROAD_DIRECTIONS.forEach((direction) => {
			const roadOpposite = Field.ROAD_OPPOSITES.get(direction);
			const legalRoads = [];
			RoadType.ROAD_TYPES.forEach((roadType) => {
				if ((roadType.value & roadOpposite.value) !== 0) {
					legalRoads.push(roadType);
				}
			});
			this.#roadConnections.set(direction, legalRoads);
		});
	}

	addRoad(args = {}) {
		const { road, position } = args;
		let modifiedPosition;
		if (!(road instanceof Road)) {
			throw Field.ERROR_ADDROAD_INVALID_ROAD;
		}
		if (position === undefined && road.position.isDefault()) {
			throw Field.ERROR_ADDROAD_POSITION_IS_DEFAULT_ON_ROAD;
		} else {
			modifiedPosition = position === undefined ? road.position : position;
		}
		if (!(modifiedPosition instanceof ItemPosition)) {
			throw Field.ERROR_ADDROAD_INVALID_POSITION;
		}
		const roadKey = modifiedPosition.toKey();
		if (this.#roads.has(roadKey)) {
			throw Field.ERROR_ADDROAD_POSITION_OCCUPIED;
		}
		if (road.position !== modifiedPosition) {
			road.setPosition(modifiedPosition);
		}
		this.#roads.set(roadKey, road);
		return road;
	}

	getRoadByPosition(position) {
		if (!(position instanceof ItemPosition)) {
			throw Field.ERROR_GETROADBYPOSITION_INVALID_POSITION;
		}
		return this.#roads.get(position.toKey()) || null;
	}

	placeItem(args = {}) {
		const { item, position } = args;
		let modifiedPosition;
		if (!(item instanceof BaseGameItem)) {
			throw Field.ERROR_PLACEITEM_INVALID_ITEM;
		}
		if (position === undefined && item.position.isDefault()) {
			throw Field.ERROR_PLACEITEM_INVALID_POSITION;
		} else {
			modifiedPosition = position === undefined ? item.position : position;
		}
		if (!(modifiedPosition instanceof ItemPosition)) {
			throw Field.ERROR_PLACEITEM_INVALID_POSITION;
		}
		const itemKey = modifiedPosition.toKey();
		if (item instanceof Road) {
			throw Field.ERROR_PLACEITEM_CANNOT_PLACE_ROAD;
		}
		if (item.position !== modifiedPosition) {
			item.setPosition(modifiedPosition);
		}
		this.#itemPositions.set(itemKey, item);
		this.#items.add(item);
	}

	getItemByPosition(position) {
		if (!(position instanceof ItemPosition)) {
			throw Field.ERROR_GETITEMBYPOSITION_INVALID_POSITION;
		}
		return this.#itemPositions.get(position.toKey()) || null;
	}

	removeItem(item) {
		if (!(item instanceof BaseGameItem)) {
			throw Field.ERROR_REMOVEITEM_INVALID_ITEM;
		}
		const itemKey = item.position.toKey();
		this.#itemPositions.delete(itemKey);
		this.#items.delete(item);
	}

	legalRoadsToPlace(args = {}) {
		const { position, direction } = args;
		if (!(position instanceof ItemPosition)) {
			throw Field.ERROR_PLACENEXTROAD_INVALID_POSITION;
		}
		if (!RoadDirection.isDirection(direction)) {
			throw Field.ERROR_PLACENEXTROAD_INVALID_DIRECTION;
		}
		const anchorRoad = this.getRoadByPosition(position);
		if(!anchorRoad) {
			throw Field.ERROR_PLACENEXTROAD_NO_ROAD_AT_POSITION;
		}
		const legalDirection = anchorRoad.value & direction.value;
		if (legalDirection === 0) {
			throw Field.ERROR_PLACENEXTROAD_CANNOT_PLACE_IN_DIRECTION;
		}
		const targetPosition = new ItemPosition({ x: position.x + direction.x, y: position.y + direction.y });
		const targetRoad = this.getRoadByPosition(targetPosition);
		let legalRoadTypes = Field.ROAD_CONNECTIONS.get(direction);
		if (!targetRoad) {
			// there is no road. Now we check for Level 1 roads
			const roadTop = this.getRoadByPosition(new ItemPosition({ x: targetPosition.x + RoadDirection.TOP.x, y: targetPosition.y + RoadDirection.TOP.y }));
			const roadRight = this.getRoadByPosition(new ItemPosition({ x: targetPosition.x + RoadDirection.RIGHT.x, y: targetPosition.y + RoadDirection.RIGHT.y }));
			const roadBottom = this.getRoadByPosition(new ItemPosition({ x: targetPosition.x + RoadDirection.BOTTOM.x, y: targetPosition.y + RoadDirection.BOTTOM.y }));
			const roadLeft = this.getRoadByPosition(new ItemPosition({ x: targetPosition.x + RoadDirection.LEFT.x, y: targetPosition.y + RoadDirection.LEFT.y }));
			if (roadTop && !(direction === RoadDirection.BOTTOM)) {
				legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0);
			}
			if (roadRight && !(direction === RoadDirection.LEFT)) {
				legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0);
			}
			if (roadBottom && !(direction === RoadDirection.TOP)) {
				legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0);
			}
			if (roadLeft && !(direction === RoadDirection.RIGHT)) {
				legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0);
			}
			//
			// level 2 checks
			//
			if (!roadTop) {
				const x = targetPosition.x + RoadDirection.TOP.x;
				const y = targetPosition.y + RoadDirection.TOP.y;
				const roadTopTop = this.getRoadByPosition(new ItemPosition({ x: x + RoadDirection.TOP.x, y: y + RoadDirection.TOP.y }));
				const roadTopRight = this.getRoadByPosition(new ItemPosition({ x: x + RoadDirection.RIGHT.x, y: y + RoadDirection.RIGHT.y }));
				const roadTopLeft = this.getRoadByPosition(new ItemPosition({ x: x + RoadDirection.LEFT.x, y: y + RoadDirection.LEFT.y }));
				if (roadTopTop && (roadTopTop.value & RoadDirection.BOTTOM.value) !== 0) {
					legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0);
				}
				if (roadTopRight && (roadTopRight.value & RoadDirection.LEFT.value) !== 0) {
					legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0);
				}
				if (roadTopLeft && (roadTopLeft.value & RoadDirection.RIGHT.value) !== 0) {
					legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0);
				}
			}
			if (!roadRight) {
				const x = targetPosition.x + RoadDirection.RIGHT.x;
				const y = targetPosition.y + RoadDirection.RIGHT.y;
				const roadRightTop = this.getRoadByPosition(new ItemPosition({ x: x + RoadDirection.TOP.x, y: y + RoadDirection.TOP.y }));
				const roadRightRight = this.getRoadByPosition(new ItemPosition({ x: x + RoadDirection.RIGHT.x, y: y + RoadDirection.RIGHT.y }));
				const roadRightBottom = this.getRoadByPosition(new ItemPosition({ x: x + RoadDirection.BOTTOM.x, y: y + RoadDirection.BOTTOM.y }));
				if (roadRightTop && (roadRightTop.value & RoadDirection.BOTTOM.value) !== 0) {
					legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0);
				}
				if (roadRightRight && (roadRightRight.value & RoadDirection.LEFT.value) !== 0) {
					legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0);
				}
				if (roadRightBottom && (roadRightBottom.value & RoadDirection.TOP.value) !== 0) {
					legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0);
				}
			}
			if (!roadBottom) {
				const x = targetPosition.x + RoadDirection.BOTTOM.x;
				const y = targetPosition.y + RoadDirection.BOTTOM.y;
				const roadBottomRight = this.getRoadByPosition(new ItemPosition({ x: x + RoadDirection.RIGHT.x, y: y + RoadDirection.RIGHT.y }));
				const roadBottomBottom = this.getRoadByPosition(new ItemPosition({ x: x + RoadDirection.BOTTOM.x, y: y + RoadDirection.BOTTOM.y }));
				const roadBottomLeft = this.getRoadByPosition(new ItemPosition({ x: x + RoadDirection.LEFT.x, y: y + RoadDirection.LEFT.y }));
				if (roadBottomRight && (roadBottomRight.value & RoadDirection.LEFT.value) !== 0) {
					console.log('----------------------------', targetPosition,x,y);
					console.log('-------position: ', position);
					console.log('BOTTOMRIGHT, LEFT.VAlUE', roadBottomRight.value, RoadDirection.LEFT.value);
					legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0);
				}
				if (roadBottomBottom && (roadBottomBottom.value & RoadDirection.TOP.value) !== 0) {
					console.log('BOTTOMBOTTOM, TOP.VAlUE')
					legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0);
				}
				if (roadBottomLeft && (roadBottomLeft.value & RoadDirection.RIGHT.value) !== 0) {
					console.log('BOTTOMLEFT, RIGHT.VAlUE')
					legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0);
				}
			}
			if (!roadLeft) {
				const x = targetPosition.x + RoadDirection.LEFT.x;
				const y = targetPosition.y + RoadDirection.LEFT.y;
				const roadLeftTop = this.getRoadByPosition(new ItemPosition({ x: x + RoadDirection.TOP.x, y: y + RoadDirection.TOP.y }));
				const roadLeftBottom = this.getRoadByPosition(new ItemPosition({ x: x + RoadDirection.BOTTOM.x, y: y + RoadDirection.BOTTOM.y }));
				const roadLeftLeft = this.getRoadByPosition(new ItemPosition({ x: x + RoadDirection.LEFT.x, y: y + RoadDirection.LEFT.y }));
				if (roadLeftTop && (roadLeftTop.value & RoadDirection.BOTTOM.value) !== 0) {
					legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0);
				}
				if (roadLeftBottom && (roadLeftBottom.value & RoadDirection.TOP.value) !== 0) {
					legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0);
				}
				if (roadLeftLeft && (roadLeftLeft.value & RoadDirection.RIGHT.value) !== 0) {
					legalRoadTypes = legalRoadTypes.filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0);
				}
			}

			return legalRoadTypes;
		} else {
			// there is a road
			return [];
		}
	};
}