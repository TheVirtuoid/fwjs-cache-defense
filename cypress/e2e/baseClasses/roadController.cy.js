import RoadController from "../../../src/classes/controllers/RoadController.js";
import RoadType from "../../../src/classes/types/RoadType.js";
import Road from "../../../src/classes/Road.js";
import RoadDirection from "../../../src/classes/types/RoadDirection.js";
import ItemPosition from "../../../src/classes/ItemPosition.js";

const roadPatterns = new Map([
	[RoadType.HALF_TOP, [
		{
			valid: [RoadType.CORNER_BOTTOM_LEFT, RoadType.STRAIGHT_TOP_BOTTOM, RoadType.CORNER_BOTTOM_RIGHT, RoadType.T_TOP_BOTTOM_LEFT, RoadType.T_TOP_BOTTOM_RIGHT, RoadType.T_LEFT_RIGHT_BOTTOM],
			message: 'HALF_TOP: All No Roads',
			roads: []
		},

			// no connections
		{
			valid: [],
			message: 'HALF_TOP: Left Road/No Connection',
			roads: [
				{ type: RoadType.STRAIGHT_TOP_BOTTOM, position: { x: -1, y: 1 } }
			]
		},
		{
			valid: [],
			message: 'HALF_TOP: Top Road/No Connection',
			roads: [
				{ type: RoadType.STRAIGHT_LEFT_RIGHT, position: { x: 0, y: 2 } }
			]
		},
		{
			valid: [],
			message: 'HALF_TOP: Right Road/No Connection',
			roads: [
				{ type: RoadType.STRAIGHT_TOP_BOTTOM, position: { x: 1, y: 1 } }
			]
		},

			// connections
		{
			valid: [],
			message: 'HALF_TOP: Left Road/Connection',
			roads: [
				{ type: RoadType.STRAIGHT_LEFT_RIGHT, position: { x: -1, y: 1 } }
			]
		},
		{
			valid: [],
			message: 'HALF_TOP: Top Road/Connection',
			roads: [
				{ type: RoadType.STRAIGHT_TOP_BOTTOM, position: { x: 0, y: 2 } }
			]
		},
		{
			valid: [],
			message: 'HALF_TOP: Right Road/Connection',
			roads: [
				{ type: RoadType.STRAIGHT_LEFT_RIGHT, position: { x: 1, y: 1 } }
			]
		},

			// left road 2nd level
		{
			valid: [],
			message: 'HALF_TOP: Left Road Empty / Bottom/No Connection',
			roads: [
				{ type: RoadType.STRAIGHT_TOP_BOTTOM, position: { x: -1, y: 1 } }
			]
		},

	]],
]);


describe('roadController', () => {
	describe('creation', () => {
		it('should create the object', () => {
			const roadController = new RoadController();
			expect(roadController instanceof RoadController).to.be.true;
		});
		it('should set the defaults', () => {

		});
	});

	describe('createRoad', () => {
		let roadController;
		beforeEach( () => {
			roadController = new RoadController();
		});

		describe('type argument', () => {
			it('should throw error if argument is not a valid type', () => {
				expect(() => roadController.createRoad({ type: 'bad' })).to.throw(Road.ERROR_ROAD_INVALID_ROAD_TYPE.message);
			});
			it('should return a new road', () => {
				const road = roadController.createRoad({ type: RoadType.CORNER_BOTTOM_LEFT });
				expect(road instanceof Road).to.be.true;
			});
		});

		describe('id argument', () => {
			it('should have set the default id', () => {
				const road = roadController.createRoad({ type: RoadType.CORNER_BOTTOM_LEFT });
				expect(typeof(road.id)).to.equal('string');
			});
			it('should set the correct id', () => {
				const road = roadController.createRoad({ type: RoadType.CORNER_BOTTOM_LEFT, id: 'test' });
				expect(road.id).to.equal('test');
			});
		});

		describe('position argument', () => {
			it('should set the default position', () => {
				const road = roadController.createRoad({ type: RoadType.CORNER_BOTTOM_LEFT });
				expect(road.position.x).to.equal(ItemPosition.DEFAULT_X);
				expect(road.position.y).to.equal(ItemPosition.DEFAULT_Y);
			});
			it('should set the correct position', () => {
				const road = roadController.createRoad({ type: RoadType.CORNER_BOTTOM_LEFT, position: new ItemPosition({ x: 1, y: 2 }) });
				expect(road.position.x).to.equal(1);
				expect(road.position.y).to.equal(2);
			});
		});
	});

	describe('getRoad', () => {
		let roadController;
		let road;
		beforeEach(() => {
			roadController = new RoadController();
			road = roadController.createRoad({ type: RoadType.CORNER_BOTTOM_LEFT, id: 'test' });
		});
		it('should return null if there is no road to get', () => {
			expect(roadController.getRoad('missing')).to.be.null;
		});
		it('should return the road if found', () => {
			expect(roadController.getRoad('test')).to.equal(road);
		});
	});

	describe('getRoadByPosition', () => {
		let roadController;
		beforeEach(() => {
			roadController = new RoadController();
		});
		it('should throw error if argument is not a valid position', () => {
			expect(() => roadController.getRoadByPosition('bad')).to.throw(RoadController.ERROR_GETROADBYPOSITION_POSITION_INVALID.message);
		});
		it('should return null if no road at position', () => {
			expect(roadController.getRoadByPosition(new ItemPosition({ x: 0, y: 0 }))).to.be.null;
		});
		it('should return the road', () => {
			const road = roadController.createRoad({ type: RoadType.CORNER_BOTTOM_LEFT, id: 'test', position: new ItemPosition({ x: 0, y: 0 }) });
			expect(roadController.getRoadByPosition(new ItemPosition({ x: 0, y: 0 }))).to.equal(road);
		});
	});

	describe('initialize', () => {
		it('should initialize the roadController', () => {
			const roadController = new RoadController();
			roadController.createRoad({ type: RoadType.CORNER_BOTTOM_LEFT, id: 'test', position: new ItemPosition({ x: 0, y: 0 }) });
			roadController.initialize();
			expect(roadController.getRoad('test')).to.be.null;
			expect(roadController.getRoadByPosition(new ItemPosition({ x:0, y: 0 }))).to.be.null;
		});
	});
	/*
	 		all of these are the 'opposite' of what you think!
			With direction of 'TOP', we want to get all pieces that have a BOTTOM connection, because
				a BOTTOM connection will connect with another piece that has a TOP connection
	*/
	/*describe('get road to match direction', () => {
		let roadController;
		beforeEach(() => {
			roadController = new RoadController();
		});
		it('should throw error is direction is not one of the RoadDirection values', () => {
			expect(() => roadController.getRoadsByDirection('bad')).to.throw(RoadController.ERROR_GETROADSBYDIRECTION_ARGUMENT_INVALID.message);
		});
		it('should get matching roads TOP (all roads that connect', () => {
			const roadDirections = roadController.getRoadsByDirection(RoadDirection.TOP);
			expect(roadDirections.length).to.equal(7);
			expect(roadDirections.indexOf(RoadType.HALF_BOTTOM)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.CORNER_BOTTOM_LEFT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.CORNER_BOTTOM_RIGHT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.T_LEFT_RIGHT_BOTTOM)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.T_TOP_BOTTOM_LEFT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.T_TOP_BOTTOM_RIGHT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.STRAIGHT_TOP_BOTTOM)).not.to.equal(-1);
		});
		it('should get matching roads RIGHT', () => {
			const roadDirections = roadController.getRoadsByDirection(RoadDirection.RIGHT);
			expect(roadDirections.length).to.equal(7);
			expect(roadDirections.indexOf(RoadType.HALF_LEFT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.CORNER_BOTTOM_LEFT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.CORNER_TOP_LEFT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.T_LEFT_RIGHT_BOTTOM)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.T_LEFT_RIGHT_TOP)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.T_TOP_BOTTOM_LEFT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.STRAIGHT_LEFT_RIGHT)).not.to.equal(-1);
		});
		it('should get matching roads BOTTOM', () => {
			const roadDirections = roadController.getRoadsByDirection(RoadDirection.BOTTOM);
			expect(roadDirections.length).to.equal(7);
			expect(roadDirections.indexOf(RoadType.HALF_TOP)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.CORNER_TOP_LEFT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.CORNER_TOP_RIGHT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.T_LEFT_RIGHT_TOP)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.T_TOP_BOTTOM_LEFT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.T_TOP_BOTTOM_RIGHT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.STRAIGHT_TOP_BOTTOM)).not.to.equal(-1);
		});
		it('should get matching roads LEFT', () => {
			const roadDirections = roadController.getRoadsByDirection(RoadDirection.LEFT);
			expect(roadDirections.length).to.equal(7);
			expect(roadDirections.indexOf(RoadType.HALF_RIGHT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.CORNER_BOTTOM_RIGHT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.CORNER_TOP_RIGHT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.T_LEFT_RIGHT_BOTTOM)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.T_LEFT_RIGHT_TOP)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.T_TOP_BOTTOM_RIGHT)).not.to.equal(-1);
			expect(roadDirections.indexOf(RoadType.STRAIGHT_LEFT_RIGHT)).not.to.equal(-1);
		});
	});*/

	describe('canPlace', () => {
		let roadController;
		beforeEach(() => {
			roadController = new RoadController();
		});
		it('should throw error is road property is not instance of Road', () => {
			const roadController = new RoadController();
			expect(() => roadController.canPlaceRoad({ road: 'bad' })).to.throw(RoadController.ERROR_CANPLACEROAD_ARGUMENT_ROAD_INVALID.message);
		});
		it('should throw error is direction is not one of the RoadDirection values', () => {
			const roadController = new RoadController();
			expect(() => roadController.canPlaceRoad({ road: new Road({ type: RoadType.HALF_TOP }), direction: 'bad' })).to.throw(RoadController.ERROR_CANPLACEROAD_ARGUMENT_DIRECTION_INVALID.message);
		});

		describe('connection top', () => {
			const roadController = new RoadController();
			const testDatabase = roadPatterns.get(RoadType.HALF_TOP);
			testDatabase.forEach((roadPattern) => {
				const { valid, message, roads } = roadPattern;
				roads.forEach((pattern) => {
					const { type, position, msg } = pattern;
					roadController.createRoad({ type, position: new ItemPosition(position), id: msg });
				});
				it(`should return valid roads for: ${message}`, () => {
					const road = roadController.createRoad({ type: RoadType.HALF_TOP, position: new ItemPosition({ x: 0, y: 0 }), id: 'test' });
					const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.TOP });
					expect(canPlace.length).to.equal(valid.length);
				});
			});
		});

		/*describe('connection top - step 1 & 2', () => {
			const patterns = [

			];
			let road;
			beforeEach(() => {
				roadController.createRoad({ type: RoadType.HALF_TOP, position: new ItemPosition({ x: 0, y: 0 }), id: 'test' });
				road = roadController.getRoad('test');
			});
			it('should not be able to place because there is a road', () => {
				const destinationRoad = roadController.createRoad({ type: RoadType.STRAIGHT_LEFT_RIGHT, position: new ItemPosition({ x: 0, y: 1 }) });
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.TOP });
				expect(canPlace.length).to.equal(0);
			});
			it('should not place road as the board limit has been reached', () => {
				roadController.createRoad({ type: RoadType.OFF_ROAD, position: new ItemPosition({ x: 0, y: 1 }) });
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.TOP });
				expect(canPlace.length).to.equal(0);
			});
			describe('return CORNER_BOTTOM_LEFT as the only possible road', () => {
				it('checking TOP/OR, RIGHT/OR', () => {
					roadController.createRoad({ type: RoadType.OFF_ROAD, position: new ItemPosition({ x: 0, y: 2 }) });
					roadController.createRoad({ type: RoadType.OFF_ROAD, position: new ItemPosition({ x: 1, y: 1 }) });
					const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.TOP });
					expect(canPlace.length).to.equal(1);
					expect(canPlace.some((testedRoad) => testedRoad.type === RoadType.CORNER_BOTTOM_LEFT)).to.equal(true);
				});
				it('checking TOP/SLR, RIGHT/OR', () => {});
				it('checking TOP/STB, RIGHT/OR', () => {});
				it('checking TOP/OR, RIGHT/SLR', () => {});
				it('checking TOP/SLR, RIGHT/SLR', () => {});
				it('checking TOP/STB, RIGHT/SLR', () => {});
				it('checking TOP/OR, RIGHT/STB', () => {});
				it('checking TOP/SLR, RIGHT/STB', () => {});
				it('checking TOP/STB, RIGHT/STB', () => {});
			});
			describe('return STRAIGHT_TOP_BOTTOM as the only possible road', () => {

			});
			describe('return CORNER_BOTTOM_RIGHT as the only possible road', () => {});
			describe('return CBL, TTBL as the only possible roads', () => {});
			describe('return CBL, TLRB, CBR as the only possible roads', () => {});
			describe('return CBR, TTBR as the only possible roads', () => {});
			describe('return CBL, TTBL, TTBR, TLRB, CBR as the only possible roads', () => {});


			it('should be able to place because there is no existing road', () => {
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.TOP });
				expect(canPlace[RoadDirection.TOP]).to.be.true;
			});
		});*/
		/*describe('connection right - step 1', () => {
			let road;
			beforeEach(() => {
				roadController.createRoad({ type: RoadType.HALF_RIGHT, position: new ItemPosition({ x: 0, y: 0 }), id: 'test' });
				road = roadController.getRoad('test');
			});
			it('should not be able to place because there is a road', () => {
				const destinationRoad = roadController.createRoad({ type: RoadType.STRAIGHT_TOP_BOTTOM, position: new ItemPosition({ x: 1, y: 0 }) });
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.RIGHT });
				expect(canPlace).to.be.false;
			});
			it('should not place road as the board limit has been reached', () => {
				roadController.createRoad({ type: RoadType.OFF_ROAD, position: new ItemPosition({ x: 1, y: 0 }) });
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.RIGHT });
				expect(canPlace).to.be.false;
			});
			it('should be able to place because there is no existing road', () => {
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.RIGHT });
				expect(canPlace).to.be.true;
			});
		});
		describe('connection bottom - step 1', () => {
			let road;
			beforeEach(() => {
				roadController.createRoad({ type: RoadType.HALF_BOTTOM, position: new ItemPosition({ x: 0, y: 0 }), id: 'test' });
				road = roadController.getRoad('test');
			});
			it('should not be able to place because there is a road', () => {
				const destinationRoad = roadController.createRoad({ type: RoadType.STRAIGHT_LEFT_RIGHT, position: new ItemPosition({ x: 0, y: -1 }) });
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.BOTTOM });
				expect(canPlace).to.be.false;
			});
			it('should not place road as the board limit has been reached', () => {
				roadController.createRoad({ type: RoadType.OFF_ROAD, position: new ItemPosition({ x: 0, y: -1 }) });
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.BOTTOM });
				expect(canPlace).to.be.false;
			});
			it('should be able to place because there is no existing road', () => {
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.BOTTOM });
				expect(canPlace).to.be.true;
			});
		});
		describe('connection left - step 1', () => {
			let road;
			beforeEach(() => {
				roadController.createRoad({ type: RoadType.HALF_LEFT, position: new ItemPosition({ x: 0, y: 0 }), id: 'test' });
				road = roadController.getRoad('test');
			});
			it('should not be able to place because there is a road', () => {
				const destinationRoad = roadController.createRoad({ type: RoadType.STRAIGHT_TOP_BOTTOM, position: new ItemPosition({ x: -1, y: 0 }) });
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.LEFT });
				expect(canPlace).to.be.false;
			});
			it('should not place road as the board limit has been reached', () => {
				roadController.createRoad({ type: RoadType.OFF_ROAD, position: new ItemPosition({ x: -1, y: 0 }) });
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.LEFT });
				expect(canPlace).to.be.false;
			});
			it('should be able to place because there is no existing road', () => {
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.LEFT });
				expect(canPlace).to.be.true;
			});
		});*/
	});

});
