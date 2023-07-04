import CacheController from "../../src/classes/controllers/CacheController.js";

describe('cache controller', () => {

	describe('creation', () => {
		it('should create the object', () => {
			const cacheController = new CacheController();
			expect(cacheController instanceof CacheController).to.be.true;
		});
		it('should set the defaults', () => {
			const cacheController = new CacheController();
			expect(cacheController.health).to.equal(0);
			expect(cacheController.gameOver).to.be.true;
		});
	});

	describe('newCache', () => {
		let cacheController;
		beforeEach( () => {
			cacheController = new CacheController();
		});
		it('should create a new cache', () => {
			cacheController.newCache();
			expect(cacheController.health).to.equal(CacheController.DEFAULT_HEALTH);
		});
		it('should throw exception if argument is not an integer', () => {
			expect(() => cacheController.newCache('bad')).to.throw(CacheController.ERROR_NEWCACHE_ARGUMENT_NOT_INTEGER.message);
		});
		it('should throw exception if argument is less than one', () => {
			expect(() => cacheController.newCache(0)).to.throw(CacheController.ERROR_NEWCACHE_ARGUMENT_LESS_THAN_ONE.message);
		});
		it('should set the health', () => {
			cacheController.newCache(3);
			expect(cacheController.health).to.equal(3);
		});
		it('should set the gameOver flag', () => {
			cacheController.newCache();
			expect(cacheController.gameOver).to.be.false;
		});
	});

	describe('adjustHealth', () => {
		let cacheController;
		const baseHealth = 5;
		beforeEach( () => {
			cacheController = new CacheController();
			cacheController.newCache(baseHealth);
		});
		it('should throw error is argument is not an integer', () => {
			expect(() => cacheController.adjustHealth('bad')).to.throw(CacheController.ERROR_ADJUSTHEALTH_ARGUMENT_NOT_INTEGER.message);
		});
		it('should add 3 to the health', () => {
			cacheController.adjustHealth(3);
			expect(cacheController.health).to.equal(baseHealth + 3);
		});
		it('should subtract 3 from the health', () => {
			cacheController.adjustHealth(-3);
			expect(cacheController.health).to.equal(baseHealth - 3);
		});
	});

	describe('know when game is over', () => {
		let cacheController;
		const baseHealth = 5;
		beforeEach( () => {
			cacheController = new CacheController();
			cacheController.newCache(baseHealth);
		});
		it('should set gameOver to false', () => {
			cacheController.adjustHealth(-3);
			expect(cacheController.gameOver).to.be.false;
		});
		it('should set gameOver to true', () => {
			cacheController.adjustHealth(-baseHealth);
			expect(cacheController.gameOver).to.be.true;
		});
		it('should set health to 0 even if it went below zero', () => {
			cacheController.adjustHealth(-baseHealth * 2);
			expect(cacheController.health).to.equal(0);
		});
	});
});