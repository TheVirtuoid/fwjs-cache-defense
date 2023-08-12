import ItemPosition from "../../../src/classes/ItemPosition.js";
import RoadDirection from "../../../src/classes/types/RoadDirection.js";

describe('ItemPosition', () => {
	describe('creation', () => {
		it('should create the object', () => {
			const itemPosition = new ItemPosition();
			expect(itemPosition instanceof ItemPosition).to.be.true;
		});
		it('should set the defaults', () => {
			const itemPosition = new ItemPosition();
			expect(itemPosition.x).to.equal(Number.POSITIVE_INFINITY);
			expect(itemPosition.y).to.equal(Number.POSITIVE_INFINITY);
		});
		it('should throw error if "x" is not a number', () => {
			expect(() => new ItemPosition({ x: 'bad' })).to.throw(ItemPosition.ERROR_X_NOT_NUMBER.message);
		});
		it('should throw error if "y" is not a number', () => {
			expect(() => new ItemPosition({ y: 'bad' })).to.throw(ItemPosition.ERROR_Y_NOT_NUMBER.message);
		});
		it('should set the x and y', () => {
			const itemPosition = new ItemPosition({ x: 1, y: 2 });
			expect(itemPosition.x).to.equal(1);
			expect(itemPosition.y).to.equal(2);
		});
	});

	describe('toObject', () => {
		it('should return the correct object', () => {
			const itemPosition = new ItemPosition({ x: 1, y: 2 });
			const itemPositionObject = itemPosition.toObject();
			expect(itemPositionObject.x).to.equal(1);
			expect(itemPositionObject.y).to.equal(2);
		});
	});

	describe('toString', () => {
		it('should return the correct string (default)', () => {
			const itemPosition = new ItemPosition();
			expect(itemPosition.toString()).to.equal(`{"x":Infinity,"y":Infinity}`);
		});
		it('should return the correct string', () => {
			const itemPosition = new ItemPosition({ x: 1, y: 2 });
			expect(itemPosition.toString()).to.equal(`{"x":1,"y":2}`);
		});
	});

	describe('getAdjacentPosition', () => {
		it('should throw error is direction is invalid', () => {
			const itemPosition = new ItemPosition({x: 0, y: 0 });
			expect(() => itemPosition.getAdjacentPosition('bad')).to.throw(ItemPosition.ERROR_INVALID_DIRECTION.message);
		});
		it('should return the correct position (TOP)', () => {
			const itemPosition = new ItemPosition({x: 0, y: 0 });
			const adjacentPosition = itemPosition.getAdjacentPosition(RoadDirection.TOP);
			expect(adjacentPosition.x).to.equal(0);
			expect(adjacentPosition.y).to.equal(-1);
		});
	});
});