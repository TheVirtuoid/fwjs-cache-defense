export default class RoadStartLocation {
	static TOP = { subPosition: { x: .5, y: 0 }, speed: { x: 0, y: -1 } };
	static RIGHT = { subPosition: { x: 1, y: .5 }, speed: { x: -1, y: 0 } };
	static BOTTOM = { subPosition: { x: .5, y: 1 }, speed: { x: 0, y: 1 } };
	static LEFT = { subPosition: { x: 0, y: .5 }, speed: { x: 1, y: 0 } };

	static ROAD_START_LOCATIONS = new Set([
		RoadStartLocation.TOP,
		RoadStartLocation.RIGHT,
		RoadStartLocation.BOTTOM,
		RoadStartLocation.LEFT
	]);

	static isStartLocation(startLocation) {
		return RoadStartLocation.ROAD_START_LOCATIONS.has(startLocation);
	}
}
