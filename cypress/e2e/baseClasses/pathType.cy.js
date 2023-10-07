import RoadDirection from "../../../src/classes/types/RoadDirection.js";
import PathType from "../../../src/classes/types/PathType.js";
import ItemPosition from "../../../src/classes/ItemPosition.js";

describe('PathType', () => {
	describe('constructor', () => {
		it('should throw error if position is not an ItemPosition', () => {
			expect(() => new PathType({ position: 'bad', direction: null })).to.throw(PathType.ERROR_POSITION_NOT_POSITION.message);
		});
		it('should throw error if direction is not RoadDirection or null', () => {
			expect(() => new PathType({ position: new ItemPosition({ x: 0, y: 0 }), direction: 'bad'})).to.throw(PathType.ERROR_DIRECTION_NOT_ROADDIRECTION_OR_NULL.message);
		});
		it('should set the ItemPosition, and null direction', () => {
			const pathType = new PathType({ position: new ItemPosition({ x: .1, y: 0 }), direction: null});
			expect(pathType.x).to.equal(.1);
			expect(pathType.y).to.equal(0);
			expect(pathType.direction).to.be.null;
		});
		it('should set the x, y, and RoadDirection direction', () => {
			const pathType = new PathType({ position: new ItemPosition( { x: .1, y: 0 }), direction: RoadDirection.TOP});
			expect(pathType.x).to.equal(.1);
			expect(pathType.y).to.equal(0);
			expect(pathType.direction).to.equal(RoadDirection.TOP);
		});
	});

	describe('getObject', () => {
		it('should return the object', () => {
			const pathType = new PathType({ position: new ItemPosition({ x: .1, y: 0 }), direction: RoadDirection.TOP});
			const path = pathType.getObject();
			expect(typeof path).to.equal('object');
			expect(path.x).to.equal(.1);
			expect(path.y).to.equal(0);
			expect(path.direction).to.equal(RoadDirection.TOP);
		});
	});
});