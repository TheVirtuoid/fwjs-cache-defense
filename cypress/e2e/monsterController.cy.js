import MonsterController from "../../src/classes/controllers/MonsterController.js";
import Monster from "../../src/classes/Monster.js";
import MonsterType from "../../src/classes/types/MonsterType.js";

describe('monsterController', () => {

	describe('creation', () => {
		it('should create the object', () => {
			const monsterController = new MonsterController();
			expect(monsterController instanceof MonsterController).to.be.true;
		});
		it('should set the defaults', () => {});
	});

	describe('createMonster', () => {
		let monsterController;
		beforeEach(() => {
			monsterController = new MonsterController();
		});

		it('should throw error is monstertype is invalid', () => {
			expect(() => monsterController.createMonster({ type: 'bad' })).to.throw(Monster.ERROR_INVALID_MONSTER_TYPE.message);
		});
		it('should create the monster', () => {
			const monster = monsterController.createMonster({ type: MonsterType.ALIEN });
			expect(monster instanceof Monster).to.be.true;
		});
		it('should create the monster with a specified id', () => {
			const monster = monsterController.createMonster({ type: MonsterType.ALIEN, id: 'test' });
			expect(monster.id).to.equal('test');
		});
	});

	describe('getMonster', () => {
		let monsterController;
		let monster;
		beforeEach(() => {
			monsterController = new MonsterController();
			monster = monsterController.createMonster({ type: MonsterType.ALIEN, id: 'test' });
		});

		it('should return null if monster cannot be found', () => {
			expect(monsterController.getMonster('missing')).to.be.null;
		});
		it('should return the monster', () => {
			const newMonster = monsterController.getMonster(monster.id);
			expect(newMonster).to.equal(monster);
		});
	});

	describe('removeMonster', () => {
		let monsterController;
		let monster;
		beforeEach(() => {
			monsterController = new MonsterController();
			monster = monsterController.createMonster({ type: MonsterType.ALIEN, id: 'test' });
		});

		it('should return false if monster to remove cannot be found', () => {
			expect(monsterController.removeMonster('missing')).to.be.false;
		});

		it('should return true if monster is removed', () => {
			expect(monsterController.removeMonster(monster.id)).to.be.true;
			expect(monsterController.getMonster(monster.id)).to.be.null;
		});

	});

	describe('initialize', () => {
		let monsterController;
		let monster1;
		let monster2;
		beforeEach(() => {
			monsterController = new MonsterController();
			monster1 = monsterController.createMonster({ type: MonsterType.ALIEN });
			monster2 = monsterController.createMonster({ type: MonsterType.ALIEN });
		});

		it('should initialize', () => {
			monsterController.initialize();
			expect(monsterController.getMonster(monster1.id)).to.be.null;
			expect(monsterController.getMonster(monster2.id)).to.be.null;
		});

	});
});