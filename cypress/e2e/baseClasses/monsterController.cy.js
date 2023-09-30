import MonsterController from "../../../src/classes/controllers/MonsterController.js";
import Monster from "../../../src/classes/Monster.js";
import MonsterType from "../../../src/classes/types/MonsterType.js";
import RoadType from "../../../src/classes/types/RoadType.js";
import Road from "../../../src/classes/Road.js";
import ItemPosition from "../../../src/classes/ItemPosition.js";
import RoadStartLocation from "../../../src/classes/types/RoadStartLocation.js";
import MonsterSpeed from "../../../src/classes/MonsterSpeed.js";

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

	/**
	 * arguments: id, road, startingLocation, speed, health
	 */
	describe('placeMonster', () => {
		let monsterController;
		let monster;
		let road;
		let startingLocation;
		let speed;
		let health;
		let subPosition;
		let position;
		beforeEach(() => {
			monsterController = new MonsterController();
			monster = monsterController.createMonster({ type: MonsterType.ALIEN });
			position = new ItemPosition({ x: 0, y: 0 });
			road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT, position });
			startingLocation = RoadStartLocation.LEFT;
			speed = new MonsterSpeed({ x: startingLocation.speed.x * .01, y: startingLocation.speed.y * .01 });
			subPosition = new ItemPosition({ x: startingLocation.subPosition.x, y: startingLocation.subPosition.y });
			health = 10;
		});

		it('should throw error if monster is not a Monster', () => {
			expect(() => monsterController.placeMonster({ monster: 'bad', position, speed, subPosition, health }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_INVALID_MONSTER.message);
		});
		it('should throw error if position is not an ItemPosition', () => {
			expect(() => monsterController.placeMonster({ monster, position: 'bad', speed, subPosition, health }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_INVALID_POSITION.message);
		});
		it('should throw error if speed is not an MonsterSpeed object', () => {
			expect(() => monsterController.placeMonster({ monster, position, speed: 'bad', subPosition, health }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_INVALID_SPEED.message);
		});
		it('should throw error if subPosition is not an object', () => {
			expect(() => monsterController.placeMonster({ monster, position, speed, subPosition: 'bad', health }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_INVALID_SUBPOSITION.message);
		});
		it('should throw error if health is not an integer', () => {
			expect(() => monsterController.placeMonster({ monster, position, speed, subPosition, health: 'bad' }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_INVALID_HEALTH.message);
		});
		it('should throw error if health is 0 or less', () => {
			expect(() => monsterController.placeMonster({ monster, position, speed, subPosition, health: 0 }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_HEALTH_ZERO_OR_LESS.message);
		});
		it('should throw error if monster has not been added to the controller', () => {
			const badMonster = new Monster({ type: MonsterType.ALIEN });
			expect(() => monsterController.placeMonster({ monster: badMonster, position, speed, subPosition, health: 1 }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_MONSTER_NOT_IN_CONTROLLER.message);
		});
		it('should place the monster', () => {
			const returnedMonster = monsterController.placeMonster({ monster, position, speed, subPosition, health });
			expect(returnedMonster.position.x).to.equal(position.x);
			expect(returnedMonster.position.y).to.equal(position.y);
			expect(returnedMonster.speed.x).to.equal(speed.x);
			expect(returnedMonster.speed.y).to.equal(speed.y);
			expect(returnedMonster.health).to.equal(health);
			expect(returnedMonster.subPosition.x).to.equal(subPosition.x);
			expect(returnedMonster.subPosition.y).to.equal(subPosition.y);
		});
	});
	xdescribe('moveMonster', () => {});
});