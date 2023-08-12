/*
	Although we are keeping it in here, we have decided not to offer the cross type
 */

import Road from "../Road.js";

export default class RoadType {
	static CORNER_TOP_LEFT = { directions: [ true, false, false, true ], value: 9 };
	static CORNER_BOTTOM_LEFT = { directions: [ false, false, true, true ], value: 12 };
	static CORNER_TOP_RIGHT = { directions: [ true, true, false, false ], value: 3 };
	static CORNER_BOTTOM_RIGHT = { directions: [ false, true, true, false ], value: 6 };

	static STRAIGHT_LEFT_RIGHT = { directions: [ false, true, false, true ], value: 10 };
	static STRAIGHT_TOP_BOTTOM = { directions: [ true, false, true, false ], value: 5 };

	static T_TOP_BOTTOM_RIGHT = { directions: [ true, true, true, false ], value: 7 };
	static T_TOP_BOTTOM_LEFT = { directions: [ true, false, true, true ], value: 13 };
	static T_LEFT_RIGHT_TOP = { directions: [ true, true, false, true ], value: 11 };
	static T_LEFT_RIGHT_BOTTOM = { directions: [ false, true, true, true ], value: 14 };

	static HALF_RIGHT = { directions: [ false, true, false, false ], value: 2 };
	static HALF_BOTTOM = { directions: [ false, false, true, false ], value: 4 };
	static HALF_LEFT = { directions: [ false, false, false, true ], value: 8 };
	static HALF_TOP = { directions: [ true, false, false, false ], value: 1 };

	// static CROSS = { directions: [ true, true, true, true ], value: 15 };

	static NO_ROAD = Symbol('no_road');

	static OFF_ROAD = Symbol('off_road');

	static BRANCH_ROAD = Symbol('branch_road');

	static ROAD_TYPES = new Set([
			RoadType.CORNER_TOP_LEFT,
			RoadType.CORNER_BOTTOM_LEFT,
			RoadType.CORNER_TOP_RIGHT,
			RoadType.CORNER_BOTTOM_RIGHT,
			RoadType.STRAIGHT_LEFT_RIGHT,
			RoadType.STRAIGHT_TOP_BOTTOM,
			RoadType.T_TOP_BOTTOM_RIGHT,
			RoadType.T_TOP_BOTTOM_LEFT,
			RoadType.T_LEFT_RIGHT_TOP,
			RoadType.T_LEFT_RIGHT_BOTTOM,
			RoadType.HALF_RIGHT,
			RoadType.HALF_BOTTOM,
			RoadType.HALF_LEFT,
			RoadType.HALF_TOP,
			// RoadType.CROSS,
			RoadType.NO_ROAD,
			RoadType.OFF_ROAD,
			RoadType.BRANCH_ROAD
	])
}