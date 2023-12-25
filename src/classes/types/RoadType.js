import RoadDirection from "./RoadDirection.js";
import imgRoadCorner from '/src/img/roads/road-corner.png';
import imgRoadHalf from '/src/img/roads/road-half.png';
import imgRoadStraight from '/src/img/roads/road-straight.png';
import imgRoadT from '/src/img/roads/road-t.png';

export default class RoadType {

	static CORNER_TOP_LEFT = {
		value: RoadDirection.TOP.value + RoadDirection.LEFT.value,
		graphics: {
			image: imgRoadCorner,
			rotation: 270,
			key: 'road-corner-top-left'
		}
	};
	static CORNER_BOTTOM_LEFT = {
		value: RoadDirection.BOTTOM.value + RoadDirection.LEFT.value,
		graphics: {
			image: imgRoadCorner,
			rotation: 180,
			key: 'road-corner-bottom-left'
		}
	};
	static CORNER_TOP_RIGHT = {
		value: RoadDirection.TOP.value + RoadDirection.RIGHT.value,
		graphics: {
			image: imgRoadCorner,
			rotation: 0,
			key: 'road-corner-top-right'
		}
	};
	static CORNER_BOTTOM_RIGHT = {
		value: RoadDirection.BOTTOM.value + RoadDirection.RIGHT.value,
		graphics: {
			image: imgRoadCorner,
			rotation: 90,
			key: 'road-corner-bottom-right'
		}
	};

	static STRAIGHT_LEFT_RIGHT = {
		value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value,
		graphics: {
			image: imgRoadStraight,
			rotation: 0,
			key: 'road-straight-left-right'
		}
	};
	static STRAIGHT_TOP_BOTTOM = {
		value: RoadDirection.TOP.value + RoadDirection.BOTTOM.value,
		graphics: {
			image: imgRoadStraight,
			rotation: 90,
			key: 'road-straight-top-bottom'
		}
	};

	static T_TOP_BOTTOM_RIGHT = {
		value: RoadDirection.TOP.value + RoadDirection.RIGHT.value + RoadDirection.BOTTOM.value,
		graphics: {
			image: imgRoadT,
			rotation: 0,
			key: 'road-top-bottom-right'
		}
	};

	static T_TOP_BOTTOM_LEFT = {
		value: RoadDirection.TOP.value + RoadDirection.LEFT.value + RoadDirection.BOTTOM.value,
		graphics: {
			image: imgRoadT,
			rotation: 180,
			key: 'road-top-bottom-left'
		}
	};

	static T_LEFT_RIGHT_TOP = {
		value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value + RoadDirection.TOP.value,
		graphics: {
			image: imgRoadT,
			rotation: 270,
			key: 'road-left-right-top'
		}
	};
	static T_LEFT_RIGHT_BOTTOM = {
		value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value + RoadDirection.BOTTOM.value,
		graphics: {
			image: imgRoadT,
			rotation: 90,
			key: 'road-left-right-bottom'
		}
	};

	static HALF_RIGHT = {
		value: RoadDirection.RIGHT.value,
		graphics: {
			image: imgRoadHalf,
			rotation: 0,
			key: 'road-half-right'
		}
	};
	static HALF_BOTTOM = {
		value: RoadDirection.BOTTOM.value,
		graphics: {
			image: imgRoadHalf,
			rotation: 90,
			key: 'road-half-bottom'
		}
	};
	static HALF_LEFT = {
		value: RoadDirection.LEFT.value,
		graphics: {
			image: imgRoadHalf,
			rotation: 180,
			key: 'road-half-left'
		}
	};
	static HALF_TOP = {
		value: RoadDirection.TOP.value,
		graphics: {
			image: imgRoadHalf,
			rotation: 270,
			key: 'road-half-top'
		}
	};

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