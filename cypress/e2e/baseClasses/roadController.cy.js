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


});
