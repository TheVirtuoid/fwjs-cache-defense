import RoadDirection from "./RoadDirection.js";
import imgRoadCorner from '/src/img/roads/road-corner.png';
import imgRoadHalf from '/src/img/roads/road-half.png';
import imgRoadStraight from '/src/img/roads/road-straight.png';
import imgRoadT from '/src/img/roads/road-t.png';
import Pos from "../Pos.js";

const top = new Pos({ x: 1, y: 0 });
const right = new Pos({ x: 2, y: 1 });
const bottom = new Pos({ x: 1, y: 2 });
const left = new Pos({ x: 0, y: 1 });
const middle = new Pos({ x: 1, y: 1 });
const pTop = new Pos({ x: 1, y: 0 });
const pRight = new Pos({ x: 2, y: 1 });
const pBottom = new Pos({ x: 1, y: 2 });
const pLeft = new Pos({ x: 0, y: 1 });
const pMiddle = new Pos({ x: 1, y: 1 });
const dTop = RoadDirection.TOP;
const dRight = RoadDirection.RIGHT;
const dBottom = RoadDirection.BOTTOM;
const dLeft = RoadDirection.LEFT;
const stop = null;

const vpLeft = { direction: dRight, position: pLeft };

/*
		VICTORYPATH

		Indicates the path a monster must take in order to eventually get to the cache.
		The key is the direction that connects this tile to the originating tile
		   1. For example, if the originating tile is a HALF_LEFT tile, then the direction
		      will be RoadDirection.LEFT
		The value is an array of directions that the monster must take to get to the cache
 */
export default class RoadType {

	static CORNER_TOP_LEFT = {
		value: RoadDirection.TOP.value + RoadDirection.LEFT.value,
		victoryPath: {
			[RoadDirection.BOTTOM.value]: [[
				{ direction: dRight, position: pLeft },
				{ direction: dTop, position: pMiddle },
				{ direction: dTop, position: pTop }
			]],
			[RoadDirection.RIGHT.value]: [[
				{ direction: dBottom, position: pTop },
				{ direction: dLeft, position: pMiddle },
				{ direction: dLeft, position: pLeft }
			]]
		},
		graphics: {
			image: imgRoadCorner,
			rotation: 180,
			key: 'road-corner-top-left'
		}
	};
	static CORNER_BOTTOM_LEFT = {
		value: RoadDirection.BOTTOM.value + RoadDirection.LEFT.value,
		victoryPath: {
			[RoadDirection.TOP.value]: [[
				{ direction: dRight, position: pLeft },
				{ direction: dBottom, position: pMiddle },
				{ direction: dBottom, position: pBottom }
			]],
			[RoadDirection.RIGHT.value]: [[
				{ direction: dTop, position: pBottom },
				{ direction: dLeft, position: pMiddle },
				{ direction: dLeft, position: pLeft }
			]]
		},
		graphics: {
			image: imgRoadCorner,
			rotation: 90,
			key: 'road-corner-bottom-left'
		}
	};
	static CORNER_TOP_RIGHT = {
		value: RoadDirection.TOP.value + RoadDirection.RIGHT.value,
		victoryPath: {
			[RoadDirection.BOTTOM.value]: [[
				{ direction: dLeft, position: pRight },
				{ direction: dTop, position: pMiddle },
				{ direction: dTop, position: pTop }
			]],
			[RoadDirection.LEFT.value]: [[
				{ direction: dBottom, position: pTop },
				{ direction: dRight, position: pMiddle },
				{ direction: dRight, position: pRight }
			]]
		},
		graphics: {
			image: imgRoadCorner,
			rotation: 270,
			key: 'road-corner-top-right'
		}
	};
	static CORNER_BOTTOM_RIGHT = {
		value: RoadDirection.BOTTOM.value + RoadDirection.RIGHT.value,
		victoryPath: {
			[RoadDirection.TOP.value]: [[
				{ direction: dLeft, position: pRight },
				{ direction: dBottom, position: pMiddle },
				{ direction: dBottom, position: pBottom }
			]],
			[RoadDirection.LEFT.value]: [[
				{ direction: dTop, position: pBottom },
				{ direction: dRight, position: pMiddle },
				{ direction: dRight, position: pRight }
			]]
		},
		graphics: {
			image: imgRoadCorner,
			rotation: 0,
			key: 'road-corner-bottom-right'
		}
	};

	static STRAIGHT_LEFT_RIGHT = {
		value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value,
		victoryPath: {
			[RoadDirection.RIGHT.value]: [[
				{ direction: dLeft, position: pRight },
				{ direction: dLeft, position: pMiddle },
				{ direction: dLeft, position: pLeft }
			]],
			[RoadDirection.LEFT.value]: [[
				{ direction: dRight, position: pLeft },
				{ direction: dRight, position: pMiddle },
				{ direction: dRight, position: pRight }
			]]
		},
		graphics: {
			image: imgRoadStraight,
			rotation: 90,
			key: 'road-straight-left-right'
		}
	};
	static STRAIGHT_TOP_BOTTOM = {
		value: RoadDirection.TOP.value + RoadDirection.BOTTOM.value,
		victoryPath: {
			[RoadDirection.BOTTOM.value]: [[
				{ direction: dTop, position: pBottom },
				{ direction: dTop, position: pMiddle },
				{ direction: dTop, position: pTop }
			]],
			[RoadDirection.TOP.value]: [[
				{ direction: dBottom, position: pTop },
				{ direction: dBottom, position: pMiddle },
				{ direction: dBottom, position: pBottom }
			]]
		},
		graphics: {
			image: imgRoadStraight,
			rotation: 0,
			key: 'road-straight-top-bottom'
		}
	};

	static T_TOP_BOTTOM_RIGHT = {
		value: RoadDirection.TOP.value + RoadDirection.RIGHT.value + RoadDirection.BOTTOM.value,
		victoryPath: {
			[RoadDirection.BOTTOM.value]: [
				[
					{ direction: dLeft, position: pRight },
					{ direction: dTop, position: pMiddle },
					{ direction: dTop, position: pTop }
				], [
					{ direction: dTop, position: pBottom },
					{ direction: dTop, position: pMiddle },
					{ direction: dTop, position: pTop }
				]
			],
			[RoadDirection.TOP.value]: [
				[
					{ direction: dLeft, position: pRight },
					{ direction: dBottom, position: pMiddle },
					{ direction: dBottom, position: bottom }
				],
				[
					{ direction: dBottom, position: pTop },
					{ direction: dBottom, position: pMiddle },
					{ direction: dBottom, position: pBottom }
				]
			],
			[RoadDirection.LEFT.value]: [
				[
					{ direction: dBottom, position: pTop },
					{ direction: dRight, position: pMiddle },
					{ direction: dRight, position: pRight }
				],
				[
					{ direction: dTop, position: pBottom },
					{ direction: dRight, position: pMiddle },
					{ direction: dRight, position: pRight }
				]
			]
		},
		graphics: {
			image: imgRoadT,
			rotation: 180,
			key: 'road-top-bottom-right'
		}
	};

	static T_TOP_BOTTOM_LEFT = {
		value: RoadDirection.TOP.value + RoadDirection.LEFT.value + RoadDirection.BOTTOM.value,
		victoryPath: {
			[RoadDirection.BOTTOM.value]: [
				[
					{ direction: dRight, position: pLeft },
					{ direction: dTop, position: pMiddle },
					{ direction: dTop, position: pTop }
				],
				[
					{ direction: dTop, position: pBottom },
					{ direction: dTop, position: pMiddle },
					{ direction: dTop, position: pTop }
				]
			],
			[RoadDirection.TOP.value]: [
				[
					{ direction: dRight, position: pLeft },
					{ direction: dBottom, position: pMiddle },
					{ direction: dBottom, position: pBottom }
				],
				[
					{ direction: dBottom, position: pTop },
					{ direction: dBottom, position: pMiddle },
					{ direction: dBottom, position: pBottom }
				]
			],
			[RoadDirection.RIGHT.value]: [
				[
					{ direction: dBottom, position: pTop },
					{ direction: dLeft, position: pMiddle },
					{ direction: dLeft, position: pLeft }
				],
				[
					{ direction: dTop, position: pBottom },
					{ direction: dLeft, position: pMiddle },
					{ direction: dLeft, position: pLeft }
				]
			]
		},
		graphics: {
			image: imgRoadT,
			rotation: 0,
			key: 'road-top-bottom-left'
		}
	};

	static T_LEFT_RIGHT_TOP = {
		value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value + RoadDirection.TOP.value,
		victoryPath: {
			[RoadDirection.RIGHT.value]: [
				[
					{ direction: dBottom, position: pTop },
					{ direction: dLeft, position: pMiddle },
					{ direction: dLeft, position: pLeft }
				],
				[
					{ direction: dLeft, position: pRight },
					{ direction: dLeft, position: pMiddle },
					{ direction: dLeft, position: pLeft }
				]
			],
			[RoadDirection.LEFT.value]: [
				[
					{ direction: dBottom, position: pTop },
					{ direction: dRight, position: pMiddle },
					{ direction: dRight, position: pRight }
				],
				[
					{ direction: dRight, position: pLeft },
					{ direction: dRight, position: pMiddle },
					{ direction: dRight, position: pRight }
				]
			],
			[RoadDirection.BOTTOM.value]: [
				[
					{ direction: dRight, position: pLeft },
					{ direction: dTop, position: pMiddle },
					{ direction: dTop, position: pTop }
				],
				[
					{ direction: dLeft, position: pRight },
					{ direction: dTop, position: pMiddle },
					{ direction: dTop, position: pTop }
				]
			]
		},
		graphics: {
			image: imgRoadT,
			rotation: 90,
			key: 'road-left-right-top'
		}
	};
	static T_LEFT_RIGHT_BOTTOM = {
		value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value + RoadDirection.BOTTOM.value,
		victoryPath: {
			[RoadDirection.RIGHT.value]: [
				[
					{ direction: dTop, position: pBottom },
					{ direction: dLeft, position: pMiddle },
					{ direction: dLeft, position: pLeft }
				],
				[
					{ direction: dLeft, position: pRight },
					{ direction: dLeft, position: pMiddle },
					{ direction: dLeft, position: pLeft }
				]
			],
			[RoadDirection.LEFT.value]: [
				[
					{ direction: dTop, position: pBottom },
					{ direction: dRight, position: pMiddle },
					{ direction: dRight, position: pRight }
				],
				[
					{ direction: dRight, position: pLeft },
					{ direction: dRight, position: pMiddle },
					{ direction: dRight, position: pRight }
				]
			],
			[RoadDirection.TOP.value]: [
				[
					{ direction: dRight, position: pLeft },
					{ direction: dBottom, position: pMiddle },
					{ direction: dBottom, position: pBottom }
				],
				[
					{ direction: dLeft, position: pRight },
					{ direction: dBottom, position: pMiddle },
					{ direction: dBottom, position: pBottom }
				]
			]
		},
		graphics: {
			image: imgRoadT,
			rotation: 270,
			key: 'road-left-right-bottom'
		}
	};

	static HALF_RIGHT = {
		value: RoadDirection.RIGHT.value,
		victoryPath: {
			[RoadDirection.LEFT.value]: [[ middle, right ]]
		},
		graphics: {
			image: imgRoadHalf,
			rotation: 0,
			key: 'road-half-right'
		}
	};
	static HALF_BOTTOM = {
		value: RoadDirection.BOTTOM.value,
		victoryPath: {
			[RoadDirection.TOP.value]: [[ middle, bottom ]]
		},
		graphics: {
			image: imgRoadHalf,
			rotation: 90,
			key: 'road-half-bottom'
		}
	};
	static HALF_LEFT = {
		value: RoadDirection.LEFT.value,
		victoryPath: {
			[RoadDirection.RIGHT.value]: [[ middle, left ]]
		},
		graphics: {
			image: imgRoadHalf,
			rotation: 180,
			key: 'road-half-left'
		}
	};
	static HALF_TOP = {
		value: RoadDirection.TOP.value,
		victoryPath: {
			[RoadDirection.BOTTOM.value]: [[ middle, top ]]
		},
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