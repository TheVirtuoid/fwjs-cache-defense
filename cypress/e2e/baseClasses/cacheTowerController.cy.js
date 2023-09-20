import CacheTowerController from "../../src/classes/controllers/CacheTowerController.js";
import CacheTower from "../../src/classes/CacheTower.js";

describe('cache controller', () => {

	describe('creation', () => {
		it('should create the object', () => {
			const cacheTowerController = new CacheTowerController();
			expect(cacheTowerController instanceof CacheTowerController).to.be.true;
		});
		it('should set the defaults', () => {
			const cacheTowerController = new CacheTowerController();
			expect(cacheTowerController.gameOver).to.be.true;
		});
	});

	describe('newCacheTower', () => {
		let cacheTowerController;
		beforeEach( () => {
			cacheTowerController = new CacheTowerController();
		});
		it('should create a new cache', () => {
			cacheTowerController.newCacheTower();
			expect(cacheTowerController.health).to.equal(CacheTowerController.DEFAULT_HEALTH);
		});
		it('should throw exception if argument is not an integer', () => {
			expect(() => cacheTowerController.newCacheTower('bad')).to.throw(CacheTower.ERROR_HEALTH_NOT_INTEGER.message);
		});
		it('should throw exception if argument is less than one', () => {
			expect(() => cacheTowerController.newCacheTower(0)).to.throw(CacheTower.ERROR_HEALTH_LESS_THAN_ONE.message);
		});
		it('should set the health', () => {
			cacheTowerController.newCacheTower(3);
			expect(cacheTowerController.health).to.equal(3);
		});
		it('should set the gameOver flag', () => {
			cacheTowerController.newCacheTower();
			expect(cacheTowerController.gameOver).to.be.false;
		});
	});

	describe('adjustCacheTowerHealth', () => {
		it('should throw error if called when no cacheTower is present', () => {
			const cacheTowerController = new CacheTowerController();
			expect(() => cacheTowerController.adjustCacheTowerHealth(1)).to.throw(CacheTowerController.ERROR_ADJUSTCACHETOWERHEALTH_NO_CACHETOWER.message);
		});
		describe('when cacheTower is present', () => {
			let cacheTowerController;
			beforeEach(() => {
				cacheTowerController = new CacheTowerController();
				cacheTowerController.newCacheTower();
			});
			it('should throw exception if argument is not an integer', () => {
				expect(() => cacheTowerController.adjustCacheTowerHealth('bad')).to.throw(CacheTower.ERROR_ADJUSTHEALTH_ARGUMENT_NOT_INTEGER.message);
			});
			it('should add to the health', () => {
				cacheTowerController.adjustCacheTowerHealth(1);
				expect(cacheTowerController.health).to.equal(CacheTowerController.DEFAULT_HEALTH + 1);
			});
			it('should subtract from the health', () => {
				cacheTowerController.adjustCacheTowerHealth(-1);
				expect(cacheTowerController.health).to.equal(CacheTowerController.DEFAULT_HEALTH - 1);
			});
			it('should set to 0 if adjustment went below 0', () => {
				cacheTowerController.adjustCacheTowerHealth(-CacheTowerController.DEFAULT_HEALTH * 2);
				expect(cacheTowerController.health).to.equal(0);
			});
		});
	});

	describe('know when game is over', () => {
		let cacheTowerController;
		const baseHealth = 5;
		beforeEach( () => {
			cacheTowerController = new CacheTowerController();
			cacheTowerController.newCacheTower(baseHealth);
		});
		it('should set gameOver to false', () => {
			cacheTowerController.adjustCacheTowerHealth(-3);
			expect(cacheTowerController.gameOver).to.be.false;
		});
		it('should set gameOver to true', () => {
			cacheTowerController.adjustCacheTowerHealth(-baseHealth);
			expect(cacheTowerController.gameOver).to.be.true;
		});
	});
});