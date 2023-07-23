import RoadController from "../../../src/classes/controllers/RoadController.js";
import RoadType from "../../../src/classes/types/RoadType.js";
import Road from "../../../src/classes/Road.js";
import RoadDirection from "../../../src/classes/types/RoadDirection.js";

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

	describe('initialize', () => {
		it('should initialize the roadController', () => {
			const roadController = new RoadController();
			roadController.createRoad({ type: RoadType.CORNER_BOTTOM_LEFT, id: 'test' });
			roadController.initialize();
			expect(roadController.getRoad('test')).to.be.null;
		});
	});
	/*
	 		all of these are the 'opposite' of what you think!
			With direction of 'TOP', we want to get all pieces that have a BOTTOM connection, because
				a BOTTOM connection will connect with another piece that has a TOP connection
	*/
	describe('get road to match direction', () => {
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
	});

	describe('filterRoadDirections', () => {
		let roadController;
		beforeEach(() => {
			roadController = new RoadController();
		});
		it('should throw error if roadDirectionArray is not an array', () => {
			expect(() => roadController.filterRoadDirections({ roadDirectionArray: 'bad', entryDirection: RoadDirection.TOP }))
					.to.throw(RoadController.ERROR_FILTERROADDIRECTIONS_ROADDIRECTIONARRAY_INVALID.message);
		});
		it('should throw error if roadDirectionArray does not have 9 elements', () => {
			expect(() => roadController.filterRoadDirections({
				roadDirectionArray: [1, 2, 3, 4, 5, 6, 7, 8],
				entryDirection: RoadDirection.TOP }))
				.to.throw(RoadController.ERROR_FILTERROADDIRECTIONS_ROADDIRECTIONARRAY_TOO_FEW_ENTRIES.message);
		});
		it('should throw error if roadDirectionArray does not contain all RoadTypes', () => {
			expect(() => roadController.filterRoadDirections({ roadDirectionArray: [
					RoadType.NO_ROAD, RoadType.NO_ROAD, RoadType.NO_ROAD, RoadType.NO_ROAD,
					RoadType.NO_ROAD, RoadType.NO_ROAD, RoadType.NO_ROAD, RoadType.NO_ROAD, 9],
					entryDirection: RoadDirection.TOP }))
					.to.throw(RoadController.ERROR_FILTERROADDIRECTIONS_ROADDIRECTIONARRAY_INVALID_TYPES.message);
		});
		it('should throw error if entryDirection is not a valid RoadDirection', () => {
			expect(() => roadController.filterRoadDirections({ roadDirectionArray: [
					RoadType.NO_ROAD, RoadType.NO_ROAD, RoadType.NO_ROAD, RoadType.NO_ROAD,
					RoadType.NO_ROAD, RoadType.NO_ROAD, RoadType.NO_ROAD, RoadType.NO_ROAD, RoadType.NO_ROAD],
				entryDirection: 'bad' }))
					.to.throw(RoadController.ERROR_FILTERROADDIRECTIONS_ENTRYDIRECTION_INVALID_DIRECTION.message);
		});
		/*
			Operations for the filterRoadDirections function:
			1
		 */
		describe('matching roads TOP', () => {
			let roadDirections;
			beforeEach(() => {
				roadDirections = roadController.getRoadsByDirection(RoadDirection.TOP);
			});
			it('should select something', () => {
				const roads = buildRoads([
					{ type: RoadType.NO_ROAD, position: { x: 0, y: 0 } },
					{ type: RoadType.NO_ROAD, position: { x: 1, y: 0 } },
					{ type: RoadType.BRANCH_ROAD, position: { x: 2, y: 0 } },

				]);
			});
		});
		describe('matching roads RIGHT', () => {
			let roadDirections;
			beforeEach(() => {
				roadDirections = roadController.getRoadsByDirection(RoadDirection.RIGHT);
			});
		});
		describe('matching roads BOTTOM', () => {
			let roadDirections;
			beforeEach(() => {
				roadDirections = roadController.getRoadsByDirection(RoadDirection.BOTTOM);
			});
		});
		describe('matching roads LEFT', () => {
			let roadDirections;
			beforeEach(() => {
				roadDirections = roadController.getRoadsByDirection(RoadDirection.LEFT);
			});
		});
	});
});
