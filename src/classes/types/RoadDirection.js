export default class RoadDirection {
	static TOP = 0;
	static RIGHT = 1;
	static BOTTOM = 2;
	static LEFT = 3;

	static TOP_LEFT = 4;
	static TOP_RIGHT = 5;
	static BOTTOM_RIGHT = 6;
	static BOTTOM_LEFT = 7;

	static DIRECTIONS = [
			RoadDirection.TOP, RoadDirection.RIGHT, RoadDirection.BOTTOM, RoadDirection.LEFT,
			RoadDirection.TOP_LEFT, RoadDirection.TOP_RIGHT, RoadDirection.BOTTOM_RIGHT, RoadDirection.BOTTOM_LEFT
	];

	static isDirection(direction) {
		return RoadDirection.DIRECTIONS.indexOf(direction) !== -1;
	}
}