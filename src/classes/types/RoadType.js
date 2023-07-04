export default class RoadType {
	static CORNER_TOP_LEFT = Symbol();
	static CORNER_BOTTOM_LEFT = Symbol();
	static CORNER_TOP_RIGHT = Symbol();
	static CORNER_BOTTOM_RIGHT = Symbol();

	static STRAIGHT_LEFT_RIGHT = Symbol();
	static STRAIGHT_TOP_BOTTOM = Symbol();

	static T_UP_DOWN_RIGHT = Symbol();
	static T_UP_DOWN_LEFT = Symbol();
	static T_LEFT_RIGHT_UP = Symbol();
	static T_LEFT_RIGHT_DOWN = Symbol();

	static HALF_RIGHT = Symbol();
	static HALF_BOTTOM = Symbol();
	static HALF_LEFT = Symbol();
	static HALF_UP = Symbol();

	static CROSS = Symbol();

	static ROAD_TYPES = new Set([
			RoadType.CORNER_TOP_LEFT,
			RoadType.CORNER_BOTTOM_LEFT,
			RoadType.CORNER_TOP_RIGHT,
			RoadType.CORNER_BOTTOM_RIGHT,
			RoadType.STRAIGHT_LEFT_RIGHT,
			RoadType.STRAIGHT_TOP_BOTTOM,
			RoadType.T_UP_DOWN_RIGHT,
			RoadType.T_UP_DOWN_LEFT,
			RoadType.T_LEFT_RIGHT_UP,
			RoadType.T_LEFT_RIGHT_DOWN,
			RoadType.HALF_RIGHT,
			RoadType.HALF_BOTTOM,
			RoadType.HALF_LEFT,
			RoadType.HALF_UP,
			RoadType.CROSS
	])
}