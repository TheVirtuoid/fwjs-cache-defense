export default class RoadDirection {
	static TOP = { index: 0, x: 0, y: 1 };
	static RIGHT = { index: 1, x: 1, y: 0 };
	static BOTTOM = { index: 2, x: 0, y: -1 };
	static LEFT = { index: 3, x: -1, y: 0 };

	static TOP_LEFT = { index: 4, x: -1, y: 1 };
	static TOP_RIGHT = { index: 5, x: 1, y: 1 };
	static BOTTOM_RIGHT = { index: 6, x: 1, y: -1 };
	static BOTTOM_LEFT = { index: 7, x: -1, y: -1 };

	static NONE = { index: 8, x: 0, y: 0 };

	static DIRECTIONS = [
			RoadDirection.TOP, RoadDirection.RIGHT, RoadDirection.BOTTOM, RoadDirection.LEFT,
			RoadDirection.TOP_LEFT, RoadDirection.TOP_RIGHT, RoadDirection.BOTTOM_RIGHT, RoadDirection.BOTTOM_LEFT,
			RoadDirection.NONE
	];

	static isDirection(direction) {
		return RoadDirection.DIRECTIONS.indexOf(direction) !== -1;
	}
}