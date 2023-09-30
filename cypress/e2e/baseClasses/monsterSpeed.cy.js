import MonsterSpeed from "../../../src/classes/MonsterSpeed.js";

describe('MonsterSpeed', () => {
	describe('constructor', () => {
		it('should throw error if x is not a number', () => {
			expect(() => new MonsterSpeed({ x: 'bad' })).to.throw(MonsterSpeed.ERROR_X_NOT_NUMBER.message);
		});
		it('should throw error if y is not a number', () => {
			expect(() => new MonsterSpeed({ y: 'bad' })).to.throw(MonsterSpeed.ERROR_Y_NOT_NUMBER.message);
		});
		it('should throw error if x is less than -1', () => {
			expect(() => new MonsterSpeed({ x: -1.1 })).to.throw(MonsterSpeed.ERROR_X_OUT_OF_RANGE.message);
		});
		it('should throw error if y is less than -1', () => {
			expect(() => new MonsterSpeed({ y: -1.1 })).to.throw(MonsterSpeed.ERROR_Y_OUT_OF_RANGE.message);
		});
		it('should throw error if x is greater than 1', () => {
			expect(() => new MonsterSpeed({ x: 1.1 })).to.throw(MonsterSpeed.ERROR_X_OUT_OF_RANGE.message);
		});
		it('should throw error if y is greater than 1', () => {
			expect(() => new MonsterSpeed({ y: 1.1 })).to.throw(MonsterSpeed.ERROR_Y_OUT_OF_RANGE.message);
		});
		it('should set x to 0 if not provided', () => {
			const monsterSpeed = new MonsterSpeed();
			expect(monsterSpeed.x).to.equal(0);
		});
		it('should set y to 0 if not provided', () => {
			const monsterSpeed = new MonsterSpeed();
			expect(monsterSpeed.y).to.equal(0);
		});
		it('should set x to provided value', () => {
			const monsterSpeed = new MonsterSpeed({x: .1});
			expect(monsterSpeed.x).to.equal(.1);
		});
		it('should set y to provided value', () => {
			const monsterSpeed = new MonsterSpeed({y: .1});
			expect(monsterSpeed.y).to.equal(.1);
		});
	});
});