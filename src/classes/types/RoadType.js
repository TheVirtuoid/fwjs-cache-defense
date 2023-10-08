import RoadDirection from "./RoadDirection.js";
import RoadStartLocation from "./RoadStartLocation.js";
import PathType from "./PathType.js";
import ItemPosition from "../ItemPosition.js";

export default class RoadType {

	static CORNER_TOP_LEFT = {
		value: RoadDirection.TOP.value + RoadDirection.LEFT.value,
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

	static STRAIGHT_LEFT_RIGHT = { value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value };
	static STRAIGHT_TOP_BOTTOM = { value: RoadDirection.TOP.value + RoadDirection.BOTTOM.value };

	static T_TOP_BOTTOM_RIGHT = { value: RoadDirection.TOP.value + RoadDirection.RIGHT.value + RoadDirection.BOTTOM.value };
	static T_TOP_BOTTOM_LEFT = { value: RoadDirection.TOP.value + RoadDirection.LEFT.value + RoadDirection.BOTTOM.value };
	static T_LEFT_RIGHT_TOP = { value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value + RoadDirection.TOP.value };
	static T_LEFT_RIGHT_BOTTOM = { value: RoadDirection.RIGHT.value + RoadDirection.LEFT.value + RoadDirection.BOTTOM.value };

	static HALF_RIGHT = {
		value: RoadDirection.RIGHT.value,
		path: new Map([
			[RoadStartLocation.RIGHT, [
				new PathType({ position: new ItemPosition({ x: 1, y: .5 }), direction: RoadDirection.LEFT }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: null })
			]],
		])
	};
	static HALF_BOTTOM = {
		value: RoadDirection.BOTTOM.value,
		path: new Map([
			[RoadStartLocation.BOTTOM, [
				new PathType({ position: new ItemPosition({ x: .5, y: 0 }), direction: RoadDirection.TOP }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: null })
			]],
		])
	};
	static HALF_LEFT = {
		value: RoadDirection.LEFT.value,
		path: new Map([
			[RoadStartLocation.LEFT, [
				new PathType({ position: new ItemPosition({ x: 0, y: .5 }), direction: RoadDirection.RIGHT }),
				new PathType({ position: new ItemPosition({ x: .5, y: .5 }), direction: null })
			]],
		])
	};
	static HALF_TOP = {
		value: RoadDirection.TOP.value,
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