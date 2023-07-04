import RoadController from "../../src/classes/controllers/RoadController.js";
import RoadType from "../../src/classes/types/RoadType.js";
import Road from "../../src/classes/Road.js";

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
	})
});
