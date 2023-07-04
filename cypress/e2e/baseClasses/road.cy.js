import Road from "../../../src/classes/Road.js";
import RoadType from "../../../src/classes/types/RoadType.js";

describe('road', () => {

	describe('creation', () => {
		it('should create the object', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			expect(road instanceof Road).to.be.true;
		});
		it('should throw error if type is invalid', () => {
			expect(() => new Road()).to.throw(Road.ERROR_ROAD_INVALID_ROAD_TYPE.message);
		});
		it('should set any defaults', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			expect(typeof(road.id)).to.equal('string');
		});
	});
});