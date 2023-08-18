import RoadDirection from "./RoadDirection.js";

export default class RoadType {
/*
	static CORNER_TOP_LEFT = Symbol();
	static CORNER_BOTTOM_LEFT = Symbol();
	static CORNER_TOP_RIGHT = Symbol();
	static CORNER_BOTTOM_RIGHT = Symbol();

	static STRAIGHT_LEFT_RIGHT = Symbol();
	static STRAIGHT_TOP_BOTTOM = Symbol();

	static T_TOP_DOWN_RIGHT = Symbol();
	static T_TOP_DOWN_LEFT = Symbol();
	static T_LEFT_RIGHT_TOP = Symbol();
	static T_LEFT_RIGHT_DOWN = Symbol();

	static HALF_RIGHT = Symbol();
	static HALF_BOTTOM = Symbol();
	static HALF_LEFT = Symbol();
	static HALF_TOP = Symbol();

	static CROSS = Symbol();
*/

	static CORNER_TOP_LEFT = { value: RoadDirection.TOP + RoadDirection.LEFT };
	static CORNER_BOTTOM_LEFT = { value: RoadDirection.BOTTOM + RoadDirection.LEFT };
	static CORNER_TOP_RIGHT = { value: RoadDirection.TOP + RoadDirection.RIGHT };
	static CORNER_BOTTOM_RIGHT = { value: RoadDirection.BOTTOM + RoadDirection.RIGHT };

	static STRAIGHT_LEFT_RIGHT = { value: RoadDirection.RIGHT + RoadDirection.LEFT };
	static STRAIGHT_TOP_BOTTOM = { value: RoadDirection.TOP + RoadDirection.BOTTOM };

	static T_TOP_BOTTOM_RIGHT = { value: RoadDirection.TOP + RoadDirection.RIGHT + RoadDirection.BOTTOM };
	static T_TOP_BOTTOM_LEFT = { value: RoadDirection.TOP + RoadDirection.LEFT + RoadDirection.BOTTOM };
	static T_LEFT_RIGHT_TOP = { value: RoadDirection.RIGHT + RoadDirection.LEFT + RoadDirection.TOP };
	static T_LEFT_RIGHT_BOTTOM = { value: RoadDirection.RIGHT + RoadDirection.LEFT + RoadDirection.BOTTOM };

	static HALF_RIGHT = { value: RoadDirection.RIGHT };
	static HALF_BOTTOM = { value: RoadDirection.BOTTOM };
	static HALF_LEFT = { value: RoadDirection.LEFT };
	static HALF_TOP = { value: RoadDirection.TOP };

	// static CROSS = { value: RoadDirection.TOP + RoadDirection.LEFT + RoadDirection.BOTTOM + RoadDirection.RIGHT } };

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
			// RoadType.CROSS
	])
}