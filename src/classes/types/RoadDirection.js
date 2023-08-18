export default class RoadDirection {
	static TOP = { value: 1, x: 0, y: 1 };
	static BOTTOM = { value:  4, x: 0, y: -1 };
	static LEFT = { value: 8, x: -1, y: 0 };
	static RIGHT = { value: 2, x: 1, y: 0 };

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