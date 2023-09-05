import Field from "../../../src/classes/Field.js";
import Road from "../../../src/classes/Road.js";
import RoadType from "../../../src/classes/types/RoadType.js";
import ItemPosition from "../../../src/classes/ItemPosition.js";
import BaseGameItem from "../../../src/classes/BaseGameItem.js";
import RoadDirection from "../../../src/classes/types/RoadDirection.js";

describe('field', () => {
	describe('creation', () => {
		it('should create the object', () => {
			const field = new Field();
			expect(field instanceof Field).to.be.true;
		});
		xit('should set the defaults', () => {
			const field = new Field();
		});
	});

	describe('addRoad', () => {
		let field;
		beforeEach( () => {
			field = new Field();
		});
		it('should throw error if road is not a Road', () => {
			expect(() => field.addRoad({road: 'bad'})).to.throw(Field.ERROR_ADDROAD_INVALID_ROAD.message);
		})
		it('should throw error if position is not ItemPosition', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			expect(() => field.addRoad({ road, position: 'bad' })).to.throw(Field.ERROR_ADDROAD_INVALID_POSITION.message);
		});
		it('should throw error if no position, but road position is the default', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			expect(() => field.addRoad({ road })).to.throw(Field.ERROR_ADDROAD_POSITION_IS_DEFAULT_ON_ROAD.message);
		});
		it('should throw error if another road already occupies the position', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			const position = new ItemPosition({ x: 0, y: 0 });
			field.addRoad({ road, position })
			expect(() => field.addRoad({ road })).to.throw(Field.ERROR_ADDROAD_POSITION_OCCUPIED.message);
		});
		it('should add the road using the position in the road', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT, position: new ItemPosition({ x:0, y: 0 }) });
			const addedRoad = field.addRoad({ road });
			expect(addedRoad).to.equal(road);
			const returnedRoad = field.getRoadByPosition(new ItemPosition({ x: 0, y: 0 }));
			expect(returnedRoad).to.equal(road);
		});
		it('should add the road', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			const position = new ItemPosition({ x: 1, y: 2 });
			const addedRoad = field.addRoad({ road, position });
			expect(addedRoad).to.equal(road);
			const returnedRoad = field.getRoadByPosition(new ItemPosition({ x: 1, y: 2 }));
			expect(returnedRoad).to.equal(road);
		});
	});

	describe('getRoadByPosition', () => {
		let field;
		beforeEach( () => {
			field = new Field();
		});
		it('should throw error if position is not ItemPosition', () => {
			expect(() => field.getRoadByPosition('bad')).to.throw(Field.ERROR_GETROADBYPOSITION_INVALID_POSITION.message);
		});
		it('should retrieve the road', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			const position = new ItemPosition({ x: 1, y: 2 });
			field.addRoad({ road, position });
			const returnedRoad = field.getRoadByPosition(new ItemPosition({ x: 1, y: 2 }));
			expect(returnedRoad).to.equal(road);
		});
		it('should return null if no road is at that position', () => {
			const returnedRoad = field.getRoadByPosition(new ItemPosition({ x: 1, y: 2 }));
			expect(returnedRoad).to.be.null;
		});
	});

	describe('placeItem', () => {
		let field;
		beforeEach( () => {
			field = new Field();
		});
		it('should throw error if item is not a BaseGameItem', () => {
			expect(() => field.placeItem({ item: 'bad' })).to.throw(Field.ERROR_PLACEITEM_INVALID_ITEM.message);
		});
		it('should throw error if position is not ItemPosition', () => {
			const item = new BaseGameItem();
			expect(() => field.placeItem({ item, position: 'bad' })).to.throw(Field.ERROR_PLACEITEM_INVALID_POSITION.message);
		});
		it('should throw error if position is not specified, and default position is not valid', () => {
			const item = new BaseGameItem();
			expect(() => field.placeItem({ item })).to.throw(Field.ERROR_PLACEITEM_INVALID_POSITION.message);
		});
		it('should throw error item is a Road', () => {
			const item = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			const position = new ItemPosition({ x: 1, y: 2 });
			expect(() => field.placeItem({ item, position })).to.throw(Field.ERROR_PLACEITEM_CANNOT_PLACE_ROAD.message);
		});
		it('should place the item', () => {
			const item = new BaseGameItem();
			const position = new ItemPosition({ x: 1, y: 2 });
			field.placeItem({ item, position });
			const returnedItem = field.getItemByPosition(new ItemPosition({ x: 1, y: 2 }));
			expect(returnedItem).to.equal(item);
		});
	});

	describe('getItemByPosition', () => {
		let field;
		beforeEach( () => {
			field = new Field();
		});
		it('should throw error if position is not ItemPosition', () => {
			expect(() => field.getItemByPosition('bad')).to.throw(Field.ERROR_GETITEMBYPOSITION_INVALID_POSITION.message);
		});
		it('should retrieve the item', () => {
			const item = new BaseGameItem();
			const position = new ItemPosition({ x: 1, y: 2 });
			field.placeItem({ item, position });
			const returnedItem = field.getItemByPosition(new ItemPosition({ x: 1, y: 2 }));
			expect(returnedItem).to.equal(item);
		});
	});

	describe('removeItem', () => {
		let field;
		beforeEach( () => {
			field = new Field();
		});
		it('should throw error if item is not a BaseGameItem', () => {
			expect(() => field.removeItem({ item: 'bad' })).to.throw(Field.ERROR_REMOVEITEM_INVALID_ITEM.message);
		});
		it('should remove the item', () => {
			const item = new BaseGameItem();
			const position = new ItemPosition({ x: 1, y: 2 });
			field.placeItem({ item, position });
			field.removeItem(item);
			const returnedItem = field.getItemByPosition(new ItemPosition({ x: 1, y: 2 }));
			expect(returnedItem).to.be.null;
		});
	});

	const placementRoads = [
		{ msg: 'TOP', type: RoadType.HALF_TOP, direction: RoadDirection.TOP, tests: [
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP) }, testMsg: '...No Road', roads: [] },
				{ results: { legalRoads: [] }, testMsg: '...Any Road', roads: [{ x: 0, y: 1, type: RoadType.HALF_TOP }] },
					//
					// level 1, top left
					//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP).filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0) },
					testMsg: '...No Road, Road LEFT',
					roads: [{ x: -1, y: 1, type: RoadType.HALF_RIGHT }]
				},
					//
					// level 1, top top
					//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP).filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0) },
					testMsg: '...No Road, Road TOP',
					roads: [{ x: 0, y: 2, type: RoadType.HALF_BOTTOM }]
				},
					//
					// level 1, top right
					//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP).filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0) },
					testMsg: '...No Road, Road RIGHT',
					roads: [{ x: 1, y: 1, type: RoadType.HALF_LEFT }]
				},


					//
					// level 2, left (-1, 1), left-bottom
					//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP).filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0) },
					testMsg: '...No Road, No Road LEFT, Road LEFT BOTTOM, Connection',
					roads: [
							{ x: -1, y: 0, type: RoadType.HALF_TOP }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP) },
					testMsg: '...No Road, No Road LEFT, Road LEFT BOTTOM, No Connection',
					roads: [
						{ x: -1, y: 0, type: RoadType.HALF_LEFT }
					]
				},
					//
					// level 2, left (-01, 1), left-left
					//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP).filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0) },
					testMsg: '...No Road, No Road LEFT, Road LEFT LEFT, Connection',
					roads: [
						{ x: -2, y: 1, type: RoadType.HALF_RIGHT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP) },
					testMsg: '...No Road, No Road LEFT, Road LEFT BOTTOM, No Connection',
					roads: [
						{ x: -2, y: 1, type: RoadType.HALF_LEFT }
					]
				},
				//
				// level 2, left (-1, 1) , left-top
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP).filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0) },
					testMsg: '...No Road, No Road LEFT, Road LEFT TOP, Connection',
					roads: [
						{ x: -1, y: 2, type: RoadType.HALF_BOTTOM }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP) },
					testMsg: '...No Road, No Road LEFT, Road LEFT TOP, No Connection',
					roads: [
						{ x: -1, y: 2, type: RoadType.HALF_LEFT }
					]
				},



				//
				// level 2, top (0, 2) , top-top
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP).filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0) },
					testMsg: '...No Road, No Road TOP, Road TOP TOP, Connection',
					roads: [
						{ x: 0, y: 3, type: RoadType.HALF_BOTTOM }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP) },
					testMsg: '...No Road, No Road TOP, Road TOP TOP, No Connection',
					roads: [
						{ x: 0, y: 3, type: RoadType.HALF_LEFT }
					]
				},
				//
				// level 2, top (0, 2), top-right
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP).filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0) },
					testMsg: '...No Road, No Road TOP, Road TOP RIGHT, Connection',
					roads: [
						{ x: 1, y: 2, type: RoadType.HALF_LEFT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP) },
					testMsg: '...No Road, No Road TOP, Road TOP RIGHT, No Connection',
					roads: [
						{ x: 1, y: 2, type: RoadType.HALF_TOP }
					]
				},
				//
				// level 2, top (0, 2), top-left
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP).filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0) },
					testMsg: '...No Road, No Road TOP, Road TOP LEFT, Connection',
					roads: [
						{ x: -1, y: 2, type: RoadType.HALF_RIGHT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP) },
					testMsg: '...No Road, No Road TOP, Road TOP LEFT, No Connection',
					roads: [
						{ x: -1, y: 2, type: RoadType.HALF_TOP }
					]
				},



				//
				// level 2, right (1, 1) , right-top
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP).filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0) },
					testMsg: '...No Road, No Road RIGHT, Road RIGHT TOP, Connection',
					roads: [
						{ x: 1, y: 2, type: RoadType.HALF_BOTTOM }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP) },
					testMsg: '...No Road, No Road RIGHT, Road RIGHT TOP, No Connection',
					roads: [
						{ x: 1, y: 2, type: RoadType.HALF_TOP }
					]
				},
				//
				// level 2, right (1, 1), right-right
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP).filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0) },
					testMsg: '...No Road, No Road RIGHT, Road RIGHT RIGHT, Connection',
					roads: [
						{ x: 2, y: 1, type: RoadType.HALF_LEFT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP) },
					testMsg: '...No Road, No Road RIGHT, Road RIGHT RIGHT, No Connection',
					roads: [
						{ x: 2, y: 1, type: RoadType.HALF_TOP }
					]
				},
				//
				// level 2, right (1, 1), right-bottom
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP).filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0) },
					testMsg: '...No Road, No Road RIGHT, Road RIGHT BOTTOM, Connection',
					roads: [
						{ x: 1, y: 0, type: RoadType.HALF_TOP }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.TOP) },
					testMsg: '...No Road, No Road RIGHT, Road RIGHT BOTTOM, No Connection',
					roads: [
						{ x: 1, y: 0, type: RoadType.HALF_LEFT }
					]
				},


			] },
		{ msg: 'RIGHT', type: RoadType.HALF_RIGHT, direction: RoadDirection.RIGHT, tests: [
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT) }, testMsg: '...No Road', roads: [] },
				{ results: { legalRoads: [] }, testMsg: '...Any Road', roads: [{ x: 1, y: 0, type: RoadType.HALF_TOP }] },
				//
				// level 1, right top
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0) },
					testMsg: '...No Road, Road TOP',
					roads: [{ x: 1, y: 1, type: RoadType.HALF_RIGHT }]
				},
				//
				// level 1, right right
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0) },
					testMsg: '...No Road, Road RIGHT',
					roads: [{ x: 2, y: 0, type: RoadType.HALF_BOTTOM }]
				},
				//
				// level 1, right bottom
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0) },
					testMsg: '...No Road, Road BOTTOM',
					roads: [{ x: 1, y: -1, type: RoadType.HALF_LEFT }]
				},


				//
				// level 2, right (1, 1), top-top
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0) },
					testMsg: '...No Road, No Road TOP, Road TOP TOP, Connection',
					roads: [
						{ x: 1, y: 2, type: RoadType.HALF_BOTTOM }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT) },
					testMsg: '...No Road, No Road TOP, Road TOP TOP, No Connection',
					roads: [
						{ x: 1, y: 2, type: RoadType.HALF_TOP }
					]
				},
				//
				// level 2, right (1, 1), top-right
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0) },
					testMsg: '...No Road, No Road TOP, Road TOP RIGHT, Connection',
					roads: [
						{ x: 2, y: 1, type: RoadType.HALF_LEFT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT) },
					testMsg: '...No Road, No Road TOP, Road TOP RIGHT, No Connection',
					roads: [
						{ x: 2, y: 1, type: RoadType.HALF_TOP }
					]
				},
				//
				// level 2, right (1, 1) , top-left
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0) },
					testMsg: '...No Road, No Road TOP, Road TOP LEFT, Connection',
					roads: [
						{ x: 0, y: 1, type: RoadType.HALF_RIGHT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT) },
					testMsg: '...No Road, No Road TOP, Road TOP LEFT, No Connection',
					roads: [
						{ x: 0, y: 1, type: RoadType.HALF_TOP }
					]
				},



				//
				// level 2, right (2, 0), right-top
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0) },
					testMsg: '...No Road, No Road RIGHT, Road RIGHT TOP, Connection',
					roads: [
						{ x: 2, y: 1, type: RoadType.HALF_BOTTOM }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT) },
					testMsg: '...No Road, No Road RIGHT, Road RIGHT TOP, No Connection',
					roads: [
						{ x: 2, y: 1, type: RoadType.HALF_RIGHT }
					]
				},
				//
				// level 2, right (2, 0), right-right
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0) },
					testMsg: '...No Road, No Road RIGHT, Road RIGHT RIGHT, Connection',
					roads: [
						{ x: 3, y: 0, type: RoadType.HALF_LEFT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT) },
					testMsg: '...No Road, No Road RIGHT, Road RIGHT RIGHT, No Connection',
					roads: [
						{ x: 3, y: 0, type: RoadType.HALF_TOP }
					]
				},
				//
				// level 2, right (2, 0) , right-bottom
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0) },
					testMsg: '...No Road, No Road RIGHT, Road RIGHT BOTTOM, Connection',
					roads: [
						{ x: 2, y: -1, type: RoadType.HALF_TOP }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT) },
					testMsg: '...No Road, No Road RIGHT, Road RIGHT BOTTOM, No Connection',
					roads: [
						{ x: 2, y: -1, type: RoadType.HALF_RIGHT }
					]
				},


				//
				// level 2, right (1, -1), bottom-right
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0) },
					testMsg: '...No Road, No Road RIGHT, Road BOTTOM RIGHT, Connection',
					roads: [
						{ x: 2, y: -1, type: RoadType.HALF_LEFT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT) },
					testMsg: '...No Road, No Road RIGHT, Road BOTTOM RIGHT, No Connection',
					roads: [
						{ x: 2, y: -1, type: RoadType.HALF_RIGHT }
					]
				},
				//
				// level 2, right (1, -1), bottom-bottom
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0) },
					testMsg: '...No Road, No Road RIGHT, Road BOTTOM BOTTOM, Connection',
					roads: [
						{ x: 1, y: -2, type: RoadType.HALF_TOP }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT) },
					testMsg: '...No Road, No Road RIGHT, Road BOTTOM BOTTOM, No Connection',
					roads: [
						{ x: 1, y: -2, type: RoadType.HALF_BOTTOM }
					]
				},
				//
				// level 2, right (-1, -1) , bottom-left
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0) },
					testMsg: '...No Road, No Road RIGHT, Road BOTTOM LEFT, Connection',
					roads: [
						{ x: 0, y: -1, type: RoadType.HALF_RIGHT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.RIGHT) },
					testMsg: '...No Road, No Road RIGHT, Road BOTTOM RIGHT, No Connection',
					roads: [
						{ x: 0, y: -1, type: RoadType.HALF_LEFT }
					]
				},





			] },
		{ msg: 'BOTTOM', type: RoadType.HALF_BOTTOM, direction: RoadDirection.BOTTOM, tests: [
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM) }, testMsg: '...No Road', roads: [] },
				{ results: { legalRoads: [] }, testMsg: '...Any Road', roads: [{ x: 0, y: -1, type: RoadType.HALF_TOP }] },

				//
				// level 1, bottom right
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM).filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0) },
					testMsg: '...No Road, Road RIGHT',
					roads: [{ x: 1, y: -1, type: RoadType.HALF_LEFT }]
				},
				//
				// level 1, bottom bottom
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM).filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0) },
					testMsg: '...No Road, Road BOTTOM',
					roads: [{ x: 0, y: -2, type: RoadType.HALF_TOP }]
				},
				//
				// level 1, bottom left
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM).filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0) },
					testMsg: '...No Road, Road LEFT',
					roads: [{ x: -1, y: -1, type: RoadType.HALF_RIGHT }]
				},



				//
				// level 2, bottom (1, -1), right-top
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM).filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0) },
					testMsg: '...No Road, No Road BOTTOM, Road RIGHT TOP, Connection',
					roads: [
						{ x: 1, y: 0, type: RoadType.HALF_BOTTOM }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM) },
					testMsg: '...No Road, No Road BOTTOM, Road RIGHT TOP, No Connection',
					roads: [
						{ x: 1, y: 0, type: RoadType.HALF_TOP }
					]
				},
				//
				// level 2, bottom (1, -1), right-right
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM).filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0) },
					testMsg: '...No Road, No Road BOTTOM, Road RIGHT RIGHT, Connection',
					roads: [
						{ x: 2, y: -1, type: RoadType.HALF_LEFT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM) },
					testMsg: '...No Road, No Road BOTTOM, Road RIGHT RIGHT, No Connection',
					roads: [
						{ x: 2, y: -1, type: RoadType.HALF_TOP }
					]
				},
				//
				// level 2, bottom (1, -1) , right-bottom
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM).filter((legalRoadType) => (legalRoadType.value & RoadDirection.RIGHT.value) === 0) },
					testMsg: '...No Road, No Road BOTTOM, Road RIGHT BOTTOM, Connection',
					roads: [
						{ x: 1, y: -2, type: RoadType.HALF_TOP }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM) },
					testMsg: '...No Road, No Road BOTTOM, Road RIGHT BOTTOM, No Connection',
					roads: [
						{ x: 1, y: -2, type: RoadType.HALF_LEFT }
					]
				},




				//
				// level 2, bottom (0, -2), bottom-right
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM).filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0) },
					testMsg: '...No Road, No Road BOTTOM, Road BOTTOM RIGHT, Connection',
					roads: [
						{ x: 1, y: -2, type: RoadType.HALF_LEFT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM) },
					testMsg: '...No Road, No Road BOTTOM, Road BOTTOM RIGHT, No Connection',
					roads: [
						{ x: 1, y: -2, type: RoadType.HALF_RIGHT }
					]
				},
				//
				// level 2, bottom (0, -2), bottom-bottom
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM).filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0) },
					testMsg: '...No Road, No Road BOTTOM, Road BOTTOM BOTTOM, Connection',
					roads: [
						{ x: 0, y: -3, type: RoadType.HALF_TOP }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM) },
					testMsg: '...No Road, No Road BOTTOM, Road BOTTOM BOTTOM, No Connection',
					roads: [
						{ x: 0, y: -3, type: RoadType.HALF_LEFT }
					]
				},
				//
				// level 2, bottom (0, -2) , bottom-left
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM).filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0) },
					testMsg: '...No Road, No Road BOTTOM, Road BOTTOM LEFT, Connection',
					roads: [
						{ x: -1, y: -2, type: RoadType.HALF_RIGHT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM) },
					testMsg: '...No Road, No Road BOTTOM, Road BOTTOM LEFT, No Connection',
					roads: [
						{ x: -1, y: -2, type: RoadType.HALF_LEFT }
					]
				},


				//
				// level 2, bottom (-1, -1), left-top
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM).filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0) },
					testMsg: '...No Road, No Road BOTTOM, Road LEFT TOP, Connection',
					roads: [
						{ x: -1, y: 0, type: RoadType.HALF_BOTTOM }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM) },
					testMsg: '...No Road, No Road BOTTOM, Road LEFT TOP, No Connection',
					roads: [
						{ x: -1, y: 0, type: RoadType.HALF_RIGHT }
					]
				},
				//
				// level 2, bottom (-1, -1), left-bottom
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM).filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0) },
					testMsg: '...No Road, No Road BOTTOM, Road LEFT BOTTOM, Connection',
					roads: [
						{ x: -1, y: -2, type: RoadType.HALF_TOP }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM) },
					testMsg: '...No Road, No Road BOTTOM, Road LEFT BOTTOM, No Connection',
					roads: [
						{ x: -1, y: -2, type: RoadType.HALF_LEFT }
					]
				},
				//
				// level 2, bottom (-1, -1) , left-left
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM).filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0) },
					testMsg: '...No Road, No Road BOTTOM, Road LEFT LEFT, Connection',
					roads: [
						{ x: -2, y: -1, type: RoadType.HALF_RIGHT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.BOTTOM) },
					testMsg: '...No Road, No Road BOTTOM, Road LEFT LEFT, No Connection',
					roads: [
						{ x: -2, y: -1, type: RoadType.HALF_BOTTOM }
					]
				},
			] },
		{ msg: 'LEFT', type: RoadType.HALF_LEFT, direction: RoadDirection.LEFT, tests: [
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT) }, testMsg: '...No Road', roads: [] },
				{ results: { legalRoads: [] }, testMsg: '...Any Road', roads: [{ x: -1, y: 0, type: RoadType.HALF_TOP }] },

				//
				// level 1, left top
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0) },
					testMsg: '...No Road, Road TOP',
					roads: [{ x: -1, y: 1, type: RoadType.HALF_BOTTOM }]
				},
				//
				// level 1, left bottom
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0) },
					testMsg: '...No Road, Road BOTTOM',
					roads: [{ x: -1, y: -1, type: RoadType.HALF_TOP }]
				},
				//
				// level 1, left left
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0) },
					testMsg: '...No Road, Road LEFT',
					roads: [{ x: -2, y: 0, type: RoadType.HALF_RIGHT }]
				},


				//
				// level 2, left (-1, 1), top-top
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0) },
					testMsg: '...No Road, No Road LEFT, Road TOP TOP, Connection',
					roads: [
						{ x: -1, y: 2, type: RoadType.HALF_BOTTOM }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT) },
					testMsg: '...No Road, No Road LEFT, Road TOP TOP, No Connection',
					roads: [
						{ x: -1, y: 2, type: RoadType.HALF_RIGHT }
					]
				},
				//
				// level 2, left (-1, 1), top-right
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0) },
					testMsg: '...No Road, No Road LEFT, Road TOP RIGHT, Connection',
					roads: [
						{ x: 0, y: 1, type: RoadType.HALF_LEFT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT) },
					testMsg: '...No Road, No Road LEFT, Road LEFT BOTTOM, No Connection',
					roads: [
						{ x: 0, y: 1, type: RoadType.HALF_TOP }
					]
				},
				//
				// level 2, left (-1, 1) , top-left
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.TOP.value) === 0) },
					testMsg: '...No Road, No Road LEFT, Road TOP LEFT, Connection',
					roads: [
						{ x: -2, y: 1, type: RoadType.HALF_RIGHT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT) },
					testMsg: '...No Road, No Road LEFT, Road TOP LEFT, No Connection',
					roads: [
						{ x: -2, y: 1, type: RoadType.HALF_BOTTOM }
					]
				},



				//
				// level 2, left (-1, -1), bottom-right
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0) },
					testMsg: '...No Road, No Road LEFT, Road BOTTOM RIGHT, Connection',
					roads: [
						{ x: 0, y: -1, type: RoadType.HALF_LEFT}
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT) },
					testMsg: '...No Road, No Road LEFT, Road BOTTOM RIGHT, No Connection',
					roads: [
						{ x: 0, y: -1, type: RoadType.HALF_RIGHT }
					]
				},
				//
				// level 2, left (-1, -1), bottom-bottom
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0) },
					testMsg: '...No Road, No Road LEFT, Road BOTTOM BOTTOM, Connection',
					roads: [
						{ x: -1, y: -2, type: RoadType.HALF_TOP }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT) },
					testMsg: '...No Road, No Road LEFT, Road BOTTOM BOTTOM, No Connection',
					roads: [
						{ x: -1, y: -2, type: RoadType.HALF_BOTTOM }
					]
				},
				//
				// level 2, left (-1, -1) , bottom-left
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.BOTTOM.value) === 0) },
					testMsg: '...No Road, No Road LEFT, Road BOTTOM LEFT, Connection',
					roads: [
						{ x: -2, y: -1, type: RoadType.HALF_RIGHT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT) },
					testMsg: '...No Road, No Road LEFT, Road BOTTOM LEFT, No Connection',
					roads: [
						{ x: -2, y: -1, type: RoadType.HALF_BOTTOM }
					]
				},




				//
				// level 2, left (-2, 0), left-top
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0) },
					testMsg: '...No Road, No Road LEFT, Road LEFT TOP, Connection',
					roads: [
						{ x: -2, y: 1, type: RoadType.HALF_BOTTOM}
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT) },
					testMsg: '...No Road, No Road LEFT, Road LEFT TOP, No Connection',
					roads: [
						{ x: -2, y: 1, type: RoadType.HALF_TOP }
					]
				},
				//
				// level 2, left (-2, 0), left-bottom
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0) },
					testMsg: '...No Road, No Road LEFT, Road LEFT BOTTOM, Connection',
					roads: [
						{ x: -2, y: -1, type: RoadType.HALF_TOP }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT) },
					testMsg: '...No Road, No Road LEFT, Road LEFT BOTTOM, No Connection',
					roads: [
						{ x: -2, y: -1, type: RoadType.HALF_BOTTOM }
					]
				},
				//
				// level 2, left (-2, 0) , left-left
				//
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT).filter((legalRoadType) => (legalRoadType.value & RoadDirection.LEFT.value) === 0) },
					testMsg: '...No Road, No Road LEFT, Road LEFT LEFT, Connection',
					roads: [
						{ x: -3, y: 0, type: RoadType.HALF_RIGHT }
					]
				},
				{ results: { legalRoads: Field.ROAD_CONNECTIONS.get(RoadDirection.LEFT) },
					testMsg: '...No Road, No Road LEFT, Road LEFT LEFT, No Connection',
					roads: [
						{ x: -3, y: 0, type: RoadType.HALF_BOTTOM }
					]
				},


			] },
	];

	describe('legalRoadsToPlace - errors', () => {
		let field;
		beforeEach(() => {
			field = new Field();
		});
		it('should throw error if position is not ItemPosition', () => {
			expect(() => field.legalRoadsToPlace({ position: 'bad', direction: RoadDirection.TOP })).to.throw(Field.ERROR_PLACENEXTROAD_INVALID_POSITION.message);
		});
		it('should throw error if direction is not RoadDirection', () => {
			expect(() => field.legalRoadsToPlace({ position: new ItemPosition({ x: 0, y: 0 }), direction: 'bad' })).to.throw(Field.ERROR_PLACENEXTROAD_INVALID_DIRECTION.message);
		});
		it('should throw error if there is no road at ItemPosition', () => {
			expect(() => field.legalRoadsToPlace({ position: new ItemPosition({ x: 0, y: 0 }), direction: RoadDirection.TOP })).to.throw(Field.ERROR_PLACENEXTROAD_NO_ROAD_AT_POSITION.message);
		});
		it('should throw error if Direction is not possible at the ItemPosition', () => {
			field.addRoad({ road: new Road({ type: RoadType.HALF_TOP, position: new ItemPosition({ x: 0, y: 0 }) }) });
			expect(() => field.legalRoadsToPlace({ position: new ItemPosition({ x: 0, y: 0 }), direction: RoadDirection.RIGHT })).to.throw(Field.ERROR_PLACENEXTROAD_CANNOT_PLACE_IN_DIRECTION.message);
			expect(() => field.legalRoadsToPlace({ position: new ItemPosition({ x: 0, y: 0 }), direction: RoadDirection.BOTTOM })).to.throw(Field.ERROR_PLACENEXTROAD_CANNOT_PLACE_IN_DIRECTION.message);
			expect(() => field.legalRoadsToPlace({ position: new ItemPosition({ x: 0, y: 0 }), direction: RoadDirection.LEFT })).to.throw(Field.ERROR_PLACENEXTROAD_CANNOT_PLACE_IN_DIRECTION.message);
		});
	});

	describe('legalRoadsToPlace', () => {
		placementRoads.forEach((placementRoad) => {
			const { msg, type, direction, tests }	= placementRoad;
			tests.forEach((test) => {
				const { roads, results, testMsg, debug } = test;
				it(`should place the next road on the ${msg}: ${testMsg}`, () => {
					const field = new Field();
					field.addRoad({ road: new Road({ type, position: new ItemPosition({ x: 0, y: 0 }) }) });
					roads.forEach((road) => {
						const {x, y, type: roadType} = road;
						field.addRoad({road: new Road({type: roadType, position: new ItemPosition({x, y})})});
					});
					const legalRoadTypes = field.legalRoadsToPlace({ position: new ItemPosition({ x: 0, y: 0 }), direction });
					if (debug) {
						console.log(`---${msg}: ${testMsg}`);
						console.log('--------------returned from routine');
						console.log(legalRoadTypes);
						console.log('------------what i expect');
						console.log(results.legalRoads);
					}
					expect(legalRoadTypes.length).to.equal(results.legalRoads.length);
					const legalRoadsResult = results.legalRoads.every((resultLegalRoad) => {
						return legalRoadTypes.some((legalRoadType) => legalRoadType.value === resultLegalRoad.value);
					});
					expect(legalRoadsResult).to.be.true;
				});
			});
		});


	});
});