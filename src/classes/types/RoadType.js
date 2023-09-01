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

	static CORNER_TOP_LEFT = { value: RoadDirection.TOP.value + RoadDirection.LEFT.value };
	static CORNER_BOTTOM_LEFT = { value: RoadDirection.BOTTOM.value + RoadDirection.LEFT.value };
	static CORNER_TOP_RIGHT = { value: RoadDirection.TOP.value + RoadDirection.RIGHT.value };
	static CORNER_BOTTOM_RIGHT = { value: RoadDirection.BOTTOM.value + RoadDirection.RIGHT.value };

	static STRAIGHT_LEFT_RIGHT = { value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value };
	static STRAIGHT_TOP_BOTTOM = { value: RoadDirection.TOP.value + RoadDirection.BOTTOM.value };

	static T_TOP_BOTTOM_RIGHT = { value: RoadDirection.TOP.value + RoadDirection.RIGHT.value + RoadDirection.BOTTOM.value };
	static T_TOP_BOTTOM_LEFT = { value: RoadDirection.TOP.value + RoadDirection.LEFT.value + RoadDirection.BOTTOM.value };
	static T_LEFT_RIGHT_TOP = { value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value + RoadDirection.TOP.value };
	static T_LEFT_RIGHT_BOTTOM = { value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value + RoadDirection.BOTTOM.value };

	static HALF_RIGHT = { value: RoadDirection.RIGHT.value };
	static HALF_BOTTOM = { value: RoadDirection.BOTTOM.value };
	static HALF_LEFT = { value: RoadDirection.LEFT.value };
	static HALF_TOP = { value: RoadDirection.TOP.value };

	// static CROSS = { value: RoadDirection.TOP.value + RoadDirection.LEFT.value + RoadDirection.BOTTOM.value + RoadDirection.RIGHT.value } };

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
	]);

	static ROAD_VALUES = new Map([
		[RoadType.CORNER_TOP_LEFT.value, RoadType.CORNER_TOP_LEFT],
		[RoadType.CORNER_BOTTOM_LEFT.value, RoadType.CORNER_BOTTOM_LEFT],
		[RoadType.CORNER_TOP_RIGHT.value, RoadType.CORNER_TOP_RIGHT],
		[RoadType.CORNER_BOTTOM_RIGHT.value, RoadType.CORNER_BOTTOM_RIGHT],
		[RoadType.STRAIGHT_LEFT_RIGHT.value, RoadType.STRAIGHT_LEFT_RIGHT],
		[RoadType.STRAIGHT_TOP_BOTTOM.value, RoadType.STRAIGHT_TOP_BOTTOM],
		[RoadType.T_TOP_BOTTOM_RIGHT.value, RoadType.T_TOP_BOTTOM_RIGHT],
		[RoadType.T_TOP_BOTTOM_LEFT.value, RoadType.T_TOP_BOTTOM_LEFT],
		[RoadType.T_LEFT_RIGHT_TOP.value, RoadType.T_LEFT_RIGHT_TOP],
		[RoadType.T_LEFT_RIGHT_BOTTOM.value, RoadType.T_LEFT_RIGHT_BOTTOM],
		[RoadType.HALF_RIGHT.value, RoadType.HALF_RIGHT],
		[RoadType.HALF_BOTTOM.value, RoadType.HALF_BOTTOM],
		[RoadType.HALF_LEFT.value, RoadType.HALF_LEFT],
		[RoadType.HALF_TOP.value, RoadType.HALF_TOP],
		// [RoadType.CROSS.value, RoadType.CROSS]
	]);

}