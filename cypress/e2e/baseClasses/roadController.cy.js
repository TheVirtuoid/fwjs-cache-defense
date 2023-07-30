import RoadController from "../../../src/classes/controllers/RoadController.js";
import RoadType from "../../../src/classes/types/RoadType.js";
import Road from "../../../src/classes/Road.js";
import RoadDirection from "../../../src/classes/types/RoadDirection.js";
import ItemPosition from "../../../src/classes/ItemPosition.js";

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
			expect(() => roadController.canPlaceRoad({ road: 'bad' })).to.throw(RoadController.ERROR_CANPLACEROAD_ARGUMENT_ROAD_INVALID.message);
		});
		it('should throw error is direction is not one of the RoadDirection values', () => {
			expect(() => roadController.canPlaceRoad({ road: new Road({ type: RoadType.HALF_TOP }), direction: 'bad' })).to.throw(RoadController.ERROR_CANPLACEROAD_ARGUMENT_DIRECTION_INVALID.message);
		});

		describe('connection top - step 1', () => {
			let road;
			beforeEach(() => {
				roadController.createRoad({ type: RoadType.HALF_TOP, position: { x: 0, y: 0 }, id: 'test' });
				road = roadController.getRoad('test');
			});
			it('should not be able to place because there is a road', () => {
				roadController.createRoad({ type: RoadType.STRAIGHT_LEFT_RIGHT, position: { x: 0, y: 1 } });
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.TOP });
				expect(canPlace).to.be.false;
			});
			it('should not place road as the board limit has been reached', () => {
				roadController.createRoad({ type: RoadType.OFF_ROAD, position: { x: 0, y: 1 } });
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.TOP });
				expect(canPlace).to.be.false;
			});
			it('should be able to place because there is no existing road', () => {
				const canPlace = roadController.canPlaceRoad({ road, direction: RoadDirection.TOP });
				expect(canPlace).to.be.true;
			});
		});
		describe('connection right - step 1', () => {});
		describe('connection bottom - step 1', () => {});
		describe('connection left - step 1', () => {});
	});

});
