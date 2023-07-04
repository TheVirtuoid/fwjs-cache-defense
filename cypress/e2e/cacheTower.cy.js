import CacheTower from "../../src/classes/CacheTower.js";

describe('cacheTower', () => {
	describe('creation', () => {
		it('should create', () => {
			const cache = new CacheTower();
			expect(cache instanceof CacheTower).to.be.true;
		});
		it('should set the defaults', () => {
			const cache = new CacheTower();
			expect(cache.health).to.equal(CacheTower.DEFAULT_HEALTH);
		});
		it('should throw error if health is not an integer', () => {
			expect(() => new CacheTower({ health: 'bad' })).to.throw(CacheTower.ERROR_HEALTH_NOT_INTEGER.message);
		});
		it('should throw error if health is less than one', () => {
			expect( () => new CacheTower({ health: 0 })).to.throw(CacheTower.ERROR_HEALTH_LESS_THAN_ONE.message);
		});
		it('should set the health', () => {
			const cache = new CacheTower({ health: 3 });
			expect(cache.health).to.equal(3);
		});
	});

	describe('adjustHealth', () => {
		let cache;
		const baseHealth = 5;
		beforeEach( () => {
			cache = new CacheTower({ health: baseHealth });
		});
		it('should throw error is argument is not an integer', () => {
			expect(() => cache.adjustHealth('bad')).to.throw(CacheTower.ERROR_ADJUSTHEALTH_ARGUMENT_NOT_INTEGER.message);
		});
		it('should add 3 to the health', () => {
			cache.adjustHealth(3);
			expect(cache.health).to.equal(baseHealth + 3);
		});
		it('should subtract 3 from the health', () => {
			cache.adjustHealth(-3);
			expect(cache.health).to.equal(baseHealth - 3);
		});
		it('should set health to 0 even if it went below zero', () => {
			cache.adjustHealth(-baseHealth * 2);
			expect(cache.health).to.equal(0);
		});
	});
});