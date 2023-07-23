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

	describe('all combinations', () => {
		it('should create half road top', () => {
			const road = new Road({ type: RoadType.HALF_TOP });
			expect(road.top).to.be.true;
			expect(road.bottom).to.be.false;
			expect(road.left).to.be.false;
			expect(road.right).to.be.false;
		});
		it('should create half road right', () => {
			const road = new Road({ type: RoadType.HALF_RIGHT });
			expect(road.top).to.be.false;
			expect(road.bottom).to.be.false;
			expect(road.left).to.be.false;
			expect(road.right).to.be.true;
		});
		it('should create half road bottom', () => {
			const road = new Road({ type: RoadType.HALF_BOTTOM });
			expect(road.top).to.be.false;
			expect(road.bottom).to.be.true;
			expect(road.left).to.be.false;
			expect(road.right).to.be.false;
		});
		it('should create half road left', () => {
			const road = new Road({ type: RoadType.HALF_LEFT });
			expect(road.top).to.be.false;
			expect(road.bottom).to.be.false;
			expect(road.left).to.be.true;
			expect(road.right).to.be.false;
		});

		it('should create corner top right', () => {
			const road = new Road({ type: RoadType.CORNER_TOP_RIGHT });
			expect(road.top).to.be.true;
			expect(road.bottom).to.be.false;
			expect(road.left).to.be.false;
			expect(road.right).to.be.true;
		});
		it('should create corner top left', () => {
			const road = new Road({ type: RoadType.CORNER_TOP_LEFT });
			expect(road.top).to.be.true;
			expect(road.bottom).to.be.false;
			expect(road.left).to.be.true;
			expect(road.right).to.be.false;
		});
		it('should create corner bottom right', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_RIGHT });
			expect(road.top).to.be.false;
			expect(road.bottom).to.be.true;
			expect(road.left).to.be.false;
			expect(road.right).to.be.true;
		});
		it('should create corner bottom left', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			expect(road.top).to.be.false;
			expect(road.bottom).to.be.true;
			expect(road.left).to.be.true;
			expect(road.right).to.be.false;
		});

		it('should create t-road top bottom right', () => {
			const road = new Road({ type: RoadType.T_TOP_BOTTOM_RIGHT });
			expect(road.top).to.be.true;
			expect(road.bottom).to.be.true;
			expect(road.left).to.be.false;
			expect(road.right).to.be.true;
		});
		it('should create t-road top bottom left', () => {
			const road = new Road({ type: RoadType.T_TOP_BOTTOM_LEFT });
			expect(road.top).to.be.true;
			expect(road.bottom).to.be.true;
			expect(road.left).to.be.true;
			expect(road.right).to.be.false;
		});
		it('should create t-road right left top', () => {
			const road = new Road({ type: RoadType.T_LEFT_RIGHT_TOP });
			expect(road.top).to.be.true;
			expect(road.bottom).to.be.false;
			expect(road.left).to.be.true;
			expect(road.right).to.be.true;
		});
		it('should create t-road right left bottom', () => {
			const road = new Road({ type: RoadType.T_LEFT_RIGHT_BOTTOM });
			expect(road.top).to.be.false;
			expect(road.bottom).to.be.true;
			expect(road.left).to.be.true;
			expect(road.right).to.be.true;
		});

		it('should create straight top bottom', () => {
			const road = new Road({ type: RoadType.STRAIGHT_TOP_BOTTOM });
			expect(road.top).to.be.true;
			expect(road.bottom).to.be.true;
			expect(road.left).to.be.false;
			expect(road.right).to.be.false;
		});
		it('should create straight left right', () => {
			const road = new Road({ type: RoadType.STRAIGHT_LEFT_RIGHT });
			expect(road.top).to.be.false;
			expect(road.bottom).to.be.false;
			expect(road.left).to.be.true;
			expect(road.right).to.be.true;
		});

		// deprecated
		/*xit('should create a cross', () => {
			const road = new Road({ type: RoadType.CROSS });
			expect(road.top).to.be.true;
			expect(road.bottom).to.be.true;
			expect(road.left).to.be.true;
			expect(road.right).to.be.true;
		});*/

		it('should create a No Road', () => {
			const road = new Road({ type: RoadType.NO_ROAD });
			expect(road.type).to.equal(RoadType.NO_ROAD);
			expect(road.top).to.be.undefined;
			expect(road.right).to.be.undefined;
			expect(road.bottom).to.be.undefined;
			expect(road.left).to.be.undefined;
		});

		it('should create an Off Road', () => {
			const road = new Road({ type: RoadType.OFF_ROAD });
			expect(road.type).to.equal(RoadType.OFF_ROAD);
			expect(road.top).to.be.undefined;
			expect(road.right).to.be.undefined;
			expect(road.bottom).to.be.undefined;
			expect(road.left).to.be.undefined;
		});
	});
});