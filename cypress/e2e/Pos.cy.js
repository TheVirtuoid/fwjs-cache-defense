import Pos from "../../src/classes/Pos.js";

describe('pos', () => {
	describe('create', () => {
		it('should throw error if x is not a property', () => {
			expect(() => new Pos({ y: 0 })).to.throw(`'x' must be a property.`);
		});
		it('should throw error if y is not a property', () => {
			expect(() => new Pos({ x: 0 })).to.throw(`'y' must be a property.`);
		});
		it('should create the pos object', () => {
			const pos = new Pos({ x: 0, y: 0 });
			expect(pos).to.be.instanceOf(Pos);
		});
	});

	describe('x operations', () => {
		it('should return x', () => {
			const pos = new Pos({ x: 0, y: 0 });
			expect(pos.x).to.equal(0);
		});
		it('should return error if x is not an integer', () => {
			expect(() => new Pos({ x: '0', y: 0 })).to.throw(`'x' must be an integer.`);
			expect(() => new Pos({ x: 0.1, y: 0 })).to.throw(`'x' must be an integer.`);
		});
		it('should return error if x is less than 0', () => {
			expect(() => new Pos({ x: -1, y: 0 })).to.throw(`'x' must be greater than or equal to 0.`);
		});
		it('should set x', () => {
			const pos = new Pos({ x: 0, y: 0 });
			pos.x = 1;
			expect(pos.x).to.equal(1);
		});
	});

	describe('y operations', () => {
		it('should return y', () => {
			const pos = new Pos({ x: 0, y: 0 });
			expect(pos.y).to.equal(0);
		});
		it('should return error if y is not an integer', () => {
			expect(() => new Pos({ x: 0, y: '0' })).to.throw(`'y' must be an integer.`);
			expect(() => new Pos({ x: 0, y: 0.1 })).to.throw(`'y' must be an integer.`);
		});
		it('should return error if y is less than 0', () => {
			expect(() => new Pos({ x: 0, y: -1 })).to.throw(`'y' must be greater than or equal to 0.`);
		});
		it('should set y', () => {
			const pos = new Pos({ x: 0, y: 0 });
			pos.y = 1;
			expect(pos.y).to.equal(1);
		});
	});

	describe('toString', () => {
		it('should return a string of "5-5"', () => {
			const pos = new Pos({ x: 5, y: 5 });
			expect(pos.toString()).to.equal('5-5');
		});
	});
});