import Dim from "../../src/classes/Dim.js";

describe('dim (dimension)', () => {
	describe('creation', () => {
		it('should throw error if width is missing', () => {
			expect(() => new Dim({ height: 0 })).to.throw(`'width' must be a property.`);
		});
		it('should throw error if height is missing', () => {
			expect(() => new Dim({ width: 0 })).to.throw(`'height' must be a property.`);
		});
		it('should create the dim object', () => {
			const dim = new Dim({ width: 0, height: 0 });
			expect(dim).to.be.instanceOf(Dim);
		});
	});
	describe('width operations', () => {
		it('should throw error if width is not an integer', () => {
			expect(() => new Dim({ width: '0', height: 0 })).to.throw(`'width' must be an integer.`);
			expect(() => new Dim({ width: 0.5, height: 0 })).to.throw(`'width' must be an integer.`);
		});
		it('should throw error if width is less than 0', () => {
			expect(() => new Dim({ width: -1, height: 0 })).to.throw(`'width' must be greater than or equal to 0.`);
		});
		it('should set the width', () => {
			const dim = new Dim({ width: 0, height: 0 });
			dim.width = 1;
			expect(dim.width).to.equal(1);
		});
		it('should get the width', () => {
			const dim = new Dim({ width: 0, height: 0 });
			expect(dim.width).to.equal(0);
		});
	});
	describe('height operations', () => {
		it('should throw error if height is not an integer', () => {
			expect(() => new Dim({ width: 0, height: '0' })).to.throw(`'height' must be an integer.`);
			expect(() => new Dim({ width: 0, height: 0.5 })).to.throw(`'height' must be an integer.`);
		});
		it('should throw error if height is less than 0', () => {
			expect(() => new Dim({ width: 0, height: -1 })).to.throw(`'height' must be greater than or equal to 0.`);
		});
		it('should set the height', () => {
			const dim = new Dim({ width: 0, height: 0 });
			dim.height = 1;
			expect(dim.height).to.equal(1);
		});
		it('should get the height', () => {
			const dim = new Dim({ width: 0, height: 0 });
			expect(dim.height).to.equal(0);
		});
	});

	describe('clone', () => {
		it('should return a clone of the dim', () => {
			const dim = new Dim({ width: 0, height: 0 });
			const clone = dim.clone();
			expect(clone).to.be.instanceOf(Dim);
			expect(clone).to.deep.equal(dim);
		});
	});
});