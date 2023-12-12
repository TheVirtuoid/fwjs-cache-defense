import RoadDirection from "./RoadDirection.js";
import RoadStartLocation from "./RoadStartLocation.js";
import PathType from "./PathType.js";
import ItemPosition from "../ItemPosition.js";
import imgRoadCorner from '/src/img/road-corner.jpg';
import imgRoadHalf from '/src/img/road-half.jpg';
import imgRoadStraight from '/src/img/road-straight.jpg';
import imgRoadT from '/src/img/road-t.jpg';

export default class RoadType {

	static CORNER_TOP_LEFT = {
		value: RoadDirection.TOP.value + RoadDirection.LEFT.value,
		graphics: {
			image: imgRoadCorner,
			rotation: 270,
			key: 'road-corner-top-left'
		},
		path: new Map([
			[RoadStartLocation.LEFT, [
				new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: RoadDirection.RIGHT }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.TOP }),
				new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: null })
			]],
			[RoadStartLocation.TOP, [
				new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: RoadDirection.BOTTOM }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.LEFT }),
				new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: null })
			]],
		])
	};
	static CORNER_BOTTOM_LEFT = {
		value: RoadDirection.BOTTOM.value + RoadDirection.LEFT.value,
		graphics: {
			image: imgRoadCorner,
			rotation: 180,
			key: 'road-corner-bottom-left'
		},
		path: new Map([
			[RoadStartLocation.LEFT, [
				new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: RoadDirection.RIGHT }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.BOTTOM }),
				new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: null })
			]],
			[RoadStartLocation.BOTTOM, [
				new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: RoadDirection.TOP }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.LEFT }),
				new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: null })
			]],
		])
	};
	static CORNER_TOP_RIGHT = {
		value: RoadDirection.TOP.value + RoadDirection.RIGHT.value,
		graphics: {
			image: imgRoadCorner,
			rotation: 0,
			key: 'road-corner-top-right'
		},
		path: new Map([
			[RoadStartLocation.RIGHT, [
				new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: RoadDirection.LEFT }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.TOP }),
				new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: null })
			]],
			[RoadStartLocation.TOP, [
				new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: RoadDirection.BOTTOM }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.RIGHT }),
				new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: null })
			]],
		])
	};
	static CORNER_BOTTOM_RIGHT = {
		value: RoadDirection.BOTTOM.value + RoadDirection.RIGHT.value,
		graphics: {
			image: imgRoadCorner,
			rotation: 90,
			key: 'road-corner-bottom-right'
		},
		path: new Map([
			[RoadStartLocation.RIGHT, [
				new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: RoadDirection.LEFT }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.BOTTOM }),
				new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: null })
			]],
			[RoadStartLocation.BOTTOM, [
				new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: RoadDirection.TOP }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.RIGHT }),
				new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: null })
			]],
		])
	};

	static STRAIGHT_LEFT_RIGHT = {
		value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value,
		graphics: {
			image: imgRoadStraight,
			rotation: 0,
			key: 'road-straight-left-right'
		},
		path: new Map([
			[RoadStartLocation.RIGHT, [
				new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: RoadDirection.LEFT }),
				new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: null })
			]],
			[RoadStartLocation.LEFT, [
				new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: RoadDirection.RIGHT }),
				new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: null })
			]],
		])
	};
	static STRAIGHT_TOP_BOTTOM = {
		value: RoadDirection.TOP.value + RoadDirection.BOTTOM.value,
		graphics: {
			image: imgRoadStraight,
			rotation: 180,
			key: 'road-straight-top-bottom'
		},
		path: new Map([
			[RoadStartLocation.TOP, [
				new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: RoadDirection.BOTTOM }),
				new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: null })
			]],
			[RoadStartLocation.BOTTOM, [
				new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: RoadDirection.TOP }),
				new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: null })
			]],
		])
	};

	static T_TOP_BOTTOM_RIGHT = {
		value: RoadDirection.TOP.value + RoadDirection.RIGHT.value + RoadDirection.BOTTOM.value,
		graphics: {
			image: imgRoadT,
			rotation: 0,
			key: 'road-top-bottom-right'
		},
		path: new Map([
			[RoadStartLocation.TOP, new Map([
					[RoadDirection.BOTTOM, [
						new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: RoadDirection.BOTTOM }),
						new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: null })
					]],
					[RoadDirection.RIGHT, [
						new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: RoadDirection.BOTTOM }),
						new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.RIGHT }),
						new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: null })
					]]
			])],
			[RoadStartLocation.BOTTOM, new Map([
					[RoadDirection.TOP, [
						new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: RoadDirection.TOP }),
						new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: null })
					]],
					[RoadDirection.RIGHT, [
						new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: RoadDirection.TOP }),
						new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.RIGHT }),
						new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: null })
					]]
			])],
			[RoadStartLocation.RIGHT, new Map([
					[RoadDirection.TOP, [
						new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: RoadDirection.LEFT }),
						new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.TOP }),
						new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: null })
					]],
					[RoadDirection.BOTTOM, [
						new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: RoadDirection.LEFT }),
						new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.BOTTOM }),
						new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: null })
					]]
			])],
		])
	};

	static T_TOP_BOTTOM_LEFT = {
		value: RoadDirection.TOP.value + RoadDirection.LEFT.value + RoadDirection.BOTTOM.value,
		graphics: {
			image: imgRoadT,
			rotation: 180,
			key: 'road-top-bottom-left'
		},
		path: new Map([
			[RoadStartLocation.LEFT, new Map([
				[RoadDirection.TOP, [
					new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: RoadDirection.RIGHT }),
					new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.TOP }),
					new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: null })
				]],
				[RoadDirection.BOTTOM, [
					new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: RoadDirection.RIGHT }),
					new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.BOTTOM }),
					new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: null })
				]],
			])],
			[RoadStartLocation.TOP, new Map([
				[RoadDirection.LEFT, [
					new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: RoadDirection.BOTTOM }),
					new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.LEFT }),
					new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: null })
				]],
				[RoadDirection.BOTTOM, [
					new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: RoadDirection.BOTTOM }),
					new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: null })
				]],
			])],
			[RoadStartLocation.BOTTOM, new Map([
				[RoadDirection.TOP, [
					new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: RoadDirection.TOP }),
					new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: null })
				]],
				[RoadDirection.LEFT, [
					new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: RoadDirection.TOP }),
					new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.LEFT }),
					new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: null })
				]],
			])]
		])
	};

	static T_LEFT_RIGHT_TOP = {
		value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value + RoadDirection.TOP.value,
		graphics: {
			image: imgRoadT,
			rotation: 270,
			key: 'road-left-right-top'
		},
		path: new Map([
			[RoadStartLocation.RIGHT, new Map([
				[RoadDirection.TOP, [
					new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: RoadDirection.LEFT }),
					new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.TOP }),
					new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: null })
				]],
				[RoadDirection.LEFT, [
					new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: RoadDirection.LEFT }),
					new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: null })
				]],
			])],
			[RoadStartLocation.LEFT, new Map([
				[RoadDirection.TOP, [
					new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: RoadDirection.RIGHT }),
					new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.TOP }),
					new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: null })
				]],
				[RoadDirection.RIGHT, [
					new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: RoadDirection.RIGHT }),
					new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: null })
				]],
			])],
			[RoadStartLocation.TOP, new Map([
				[RoadDirection.LEFT, [
					new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: RoadDirection.BOTTOM }),
					new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.LEFT }),
					new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: null })
				]],
				[RoadDirection.RIGHT, [
					new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: RoadDirection.BOTTOM }),
					new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.RIGHT }),
					new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: null })
				]],
			])]
		])
	};
	static T_LEFT_RIGHT_BOTTOM = {
		value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value + RoadDirection.BOTTOM.value,
		graphics: {
			image: imgRoadT,
			rotation: 90,
			key: 'road-left-right-bottom'
		},
		path: new Map([
			[RoadStartLocation.RIGHT,
					new Map([
							[RoadDirection.BOTTOM, [
									new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: RoadDirection.LEFT }),
									new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.BOTTOM }),
									new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: null })
							]],
							[RoadDirection.LEFT, [
									new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: RoadDirection.LEFT }),
									new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: null })
							]],
					])
			],
			[RoadStartLocation.LEFT,
				new Map([
					[RoadDirection.BOTTOM, [
						new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: RoadDirection.RIGHT }),
						new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.BOTTOM }),
						new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: null })
					]],
					[RoadDirection.RIGHT, [
						new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: RoadDirection.RIGHT }),
						new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: null })
					]],
				])
			],
			[RoadStartLocation.BOTTOM, new Map([
				[RoadDirection.LEFT, [
					new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: RoadDirection.TOP }),
					new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.LEFT }),
					new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: null })
				]],
				[RoadDirection.RIGHT, [
					new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: RoadDirection.TOP }),
					new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: RoadDirection.RIGHT }),
					new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: null })
				]],
			])]
		])
	};

	static HALF_RIGHT = {
		value: RoadDirection.RIGHT.value,
		graphics: {
			image: imgRoadHalf,
			rotation: 0,
			key: 'road-half-right'
		},
		path: new Map([
			[RoadStartLocation.RIGHT, [
				new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: RoadDirection.LEFT }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: null })
			]],
		])
	};
	static HALF_BOTTOM = {
		value: RoadDirection.BOTTOM.value,
		graphics: {
			image: imgRoadHalf,
			rotation: 90,
			key: 'road-half-bottom'
		},
		path: new Map([
			[RoadStartLocation.BOTTOM, [
				new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: RoadDirection.TOP }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: null })
			]],
		])
	};
	static HALF_LEFT = {
		value: RoadDirection.LEFT.value,
		graphics: {
			image: imgRoadHalf,
			rotation: 180,
			key: 'road-half-left'
		},
		path: new Map([
			[RoadStartLocation.LEFT, [
				new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: RoadDirection.RIGHT }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: null })
			]],
		])
	};
	static HALF_TOP = {
		value: RoadDirection.TOP.value,
		graphics: {
			image: imgRoadHalf,
			rotation: 270,
			key: 'road-half-top'
		},
		path: new Map([
			[RoadStartLocation.TOP, [
				new PathType({ position: new ItemPosition({ x: .5, y: 1 }), direction: RoadDirection.BOTTOM }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: null })
			]],
		])
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