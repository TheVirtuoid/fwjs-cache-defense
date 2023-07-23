/*
	Although we are keeping it in here, we have decided not to offer the cross type
 */

import Road from "../Road.js";

export default class RoadType {
	static CORNER_TOP_LEFT = { directions: [ true, false, false, true ] };
	static CORNER_BOTTOM_LEFT = { directions: [ false, false, true, true ] };
	static CORNER_TOP_RIGHT = { directions: [ true, true, false, false ] };
	static CORNER_BOTTOM_RIGHT = { directions: [ false, true, true, false ] };

	static STRAIGHT_LEFT_RIGHT = { directions: [ false, true, false, true ] };
	static STRAIGHT_TOP_BOTTOM = { directions: [ true, false, true, false ] };

	static T_TOP_BOTTOM_RIGHT = { directions: [ true, true, true, false ] };
	static T_TOP_BOTTOM_LEFT = { directions: [ true, false, true, true ] };
	static T_LEFT_RIGHT_TOP = { directions: [ true, true, false, true ] };
	static T_LEFT_RIGHT_BOTTOM = { directions: [ false, true, true, true ] };

	static HALF_RIGHT = { directions: [ false, true, false, false ] };
	static HALF_BOTTOM = { directions: [ false, false, true, false ] };
	static HALF_LEFT = { directions: [ false, false, false, true ] };
	static HALF_TOP = { directions: [ true, false, false, false ] };

	// static CROSS = { directions: [ true, true, true, true ] };

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