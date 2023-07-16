import ItemPosition from "../../../src/classes/ItemPosition.js";

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
});