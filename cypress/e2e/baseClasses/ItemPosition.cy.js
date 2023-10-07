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

	describe('isDefault', () => {
		it('should return true if x and y are not specified', () => {
			const itemPosition = new ItemPosition();
			expect(itemPosition.isDefault()).to.be.true;
		});
		it('should return false if x and y are specified', () => {
			const itemPosition = new ItemPosition({ x: 1, y: 1 });
			expect(itemPosition.isDefault()).to.be.false;
		});
	});

	describe('clone', () => {
		it('should return a new ItemPosition', () => {
			const itemPosition = new ItemPosition();
			const clone = itemPosition.clone();
			expect(clone instanceof ItemPosition).to.be.true;
		});
		it('should return a new ItemPosition with the same x and y', () => {
			const itemPosition = new ItemPosition({ x: 1, y: 2 });
			const clone = itemPosition.clone();
			expect(clone.x).to.equal(itemPosition.x);
			expect(clone.y).to.equal(itemPosition.y);
		});
	});

	describe('toKey', () => {
		it('should return the correct key', () => {
			const itemPosition = new ItemPosition({ x: 1, y: 2 });
			expect(itemPosition.toKey()).to.equal('1,2');
		});
	});

	describe('compareTo', () => {
		let itemPosition;
		beforeEach(() => {
			itemPosition = new ItemPosition({ x: 1, y: 2 });
		});
		it('should throw error if position argument is not an ItemPosition', () => {
			expect(() => itemPosition.compareTo({ position: 'bad', direction: RoadDirection.TOP })).to.throw(ItemPosition.ERROR_COMPARETO_POSITION_NOT_ITEMPOSITION.message);
		});
		it('should throw error if direction argument is not a RoadDirection', () => {
			expect(() => itemPosition.compareTo({ position: new ItemPosition(), direction: 'bad' })).to.throw(ItemPosition.ERROR_COMPARETO_DIRECTION_NOT_ROADDIRECTION.message);
		});
		describe('roadDirection = TOP', () => {
			it('should return -1 if if comparison object < position', () => {
				const position = new ItemPosition({ x: 1, y: 3 });
				expect(itemPosition.compareTo({ position, direction: RoadDirection.TOP })).to.equal(-1);
			});
			it('should return 0 if positions are the same', () => {
				const position = new ItemPosition({ x: 1, y: 2 });
				expect(itemPosition.compareTo({ position, direction: RoadDirection.TOP })).to.equal(0);
			});
			it('should return 1 if comparison object > position', () => {
				const position = new ItemPosition({ x: 1, y: 1 });
				expect(itemPosition.compareTo({ position, direction: RoadDirection.TOP })).to.equal(1);
			});
		});
		describe('roadDirection = RIGHT', () => {
			it('should return -1 if if comparison object < position', () => {
				const position = new ItemPosition({ x: 2, y: 2 });
				expect(itemPosition.compareTo({ position, direction: RoadDirection.RIGHT })).to.equal(-1);
			});
			it('should return 0 if positions are the same', () => {
				const position = new ItemPosition({ x: 1, y: 2 });
				expect(itemPosition.compareTo({ position, direction: RoadDirection.RIGHT })).to.equal(0);
			});
			it('should return 1 if comparison object > position', () => {
				const position = new ItemPosition({ x: 0, y: 2 });
				expect(itemPosition.compareTo({ position, direction: RoadDirection.RIGHT })).to.equal(1);
			});
		});
		describe('roadDirection = BOTTOM', () => {
			it('should return -1 if if comparison object < position', () => {
				const position = new ItemPosition({ x: 1, y: 1 });
				expect(itemPosition.compareTo({ position, direction: RoadDirection.BOTTOM })).to.equal(-1);
			});
			it('should return 0 if positions are the same', () => {
				const position = new ItemPosition({ x: 1, y: 2 });
				expect(itemPosition.compareTo({ position, direction: RoadDirection.BOTTOM })).to.equal(0);
			});
			it('should return 1 if comparison object > position', () => {
				const position = new ItemPosition({ x: 1, y: 3 });
				expect(itemPosition.compareTo({ position, direction: RoadDirection.BOTTOM })).to.equal(1);
			});
		});
		describe('roadDirection = LEFT', () => {
			it('should return -1 if if comparison object < position', () => {
				const position = new ItemPosition({ x: 0, y: 2 });
				expect(itemPosition.compareTo({ position, direction: RoadDirection.LEFT })).to.equal(-1);
			});
			it('should return 0 if positions are the same', () => {
				const position = new ItemPosition({ x: 1, y: 2 });
				expect(itemPosition.compareTo({ position, direction: RoadDirection.LEFT })).to.equal(0);
			});
			it('should return 1 if comparison object > position', () => {
				const position = new ItemPosition({ x: 2, y: 2 });
				expect(itemPosition.compareTo({ position, direction: RoadDirection.LEFT })).to.equal(1);
			});
		});
	});
});