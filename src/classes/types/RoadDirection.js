export default class RoadDirection {
	static TOP = { value: 1 };
	static BOTTOM = { value:  4 };
	static LEFT = { value: 8 };
	static RIGHT = { value: 2 };

	static ROAD_DIRECTIONS = new Set([
			RoadDirection.TOP,
			RoadDirection.BOTTOM,
			RoadDirection.LEFT,
			RoadDirection.RIGHT
	])

	static isDirection(direction) {
		return RoadDirection.ROAD_DIRECTIONS.has(direction);
	}
}