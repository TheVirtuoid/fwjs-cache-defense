import MonsterController from "../../../src/classes/controllers/MonsterController.js";
import Monster from "../../../src/classes/Monster.js";
import MonsterType from "../../../src/classes/types/MonsterType.js";
import RoadType from "../../../src/classes/types/RoadType.js";

import Road from "../../../src/classes/Road.js";
import ItemPosition from "../../../src/classes/ItemPosition.js";
import RoadStartLocation from "../../../src/classes/types/RoadStartLocation.js";
import MonsterSpeed from "../../../src/classes/MonsterSpeed.js";
import RoadDirection from "../../../src/classes/types/RoadDirection.js";
import Field from "../../../src/classes/Field.js";

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
		let path;
		beforeEach(() => {
			monsterController = new MonsterController();
			monster = monsterController.createMonster({ type: MonsterType.ALIEN });
			position = new ItemPosition({ x: 0, y: 0 });
			road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT, position });
			startingLocation = RoadStartLocation.LEFT;
			speed = new MonsterSpeed({ x: .1, y: .1 });
			path = RoadType.CORNER_BOTTOM_LEFT.path.get(startingLocation);
			subPosition = new ItemPosition({ x: path[0].x, y: path[0].y });
			health = 10;
		});

		it('should throw error if monster is not a Monster', () => {
			expect(() => monsterController.placeMonster({ monster: 'bad', position, speed, subPosition, health, path }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_INVALID_MONSTER.message);
		});
		it('should throw error if position is not an ItemPosition', () => {
			expect(() => monsterController.placeMonster({ monster, position: 'bad', speed, subPosition, health, path }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_INVALID_POSITION.message);
		});
		it('should throw error if speed is not an MonsterSpeed object', () => {
			expect(() => monsterController.placeMonster({ monster, position, speed: 'bad', subPosition, health, path }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_INVALID_SPEED.message);
		});
		it('should throw error if subPosition is not an object', () => {
			expect(() => monsterController.placeMonster({ monster, position, speed, subPosition: 'bad', health, path }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_INVALID_SUBPOSITION.message);
		});
		it('should throw error if health is not an integer', () => {
			expect(() => monsterController.placeMonster({ monster, position, speed, subPosition, health: 'bad', path }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_INVALID_HEALTH.message);
		});
		it('should throw error if health is 0 or less', () => {
			expect(() => monsterController.placeMonster({ monster, position, speed, subPosition, health: 0, path }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_HEALTH_ZERO_OR_LESS.message);
		});
		it('should throw error if monster has not been added to the controller', () => {
			const badMonster = new Monster({ type: MonsterType.ALIEN });
			expect(() => monsterController.placeMonster({ monster: badMonster, position, speed, subPosition, health: 1, path }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_MONSTER_NOT_IN_CONTROLLER.message);
		});
		it('should throw error is path is not an Array', () => {
			expect(() => monsterController.placeMonster({ monster, position, speed, subPosition, health, path: 'bad' }))
					.to.throw(MonsterController.ERROR_PLACEMONSTER_INVALID_PATH.message);
		});
		it('should place the monster', () => {
			const returnedMonster = monsterController.placeMonster({ monster, position, speed, subPosition, health, path });
			expect(returnedMonster.position.x).to.equal(position.x);
			expect(returnedMonster.position.y).to.equal(position.y);
			expect(returnedMonster.speed.x).to.equal(speed.x);
			expect(returnedMonster.speed.y).to.equal(speed.y);
			expect(returnedMonster.health).to.equal(health);
			expect(returnedMonster.subPosition.x).to.equal(subPosition.x);
			expect(returnedMonster.subPosition.y).to.equal(subPosition.y);
			expect(monster.path.length).to.equal(3);
		});
	});

	describe('moveMonster', () => {
		let monsterController;
		let monster;
		let road;
		let startingLocation;
		let speed;
		let health;
		let subPosition;
		let position;
		let path;
		beforeEach(() => {
			monsterController = new MonsterController();
			monster = monsterController.createMonster({type: MonsterType.ALIEN});
			position = new ItemPosition({x: 0, y: 0});
			road = new Road({type: RoadType.CORNER_BOTTOM_LEFT, position});
			path = RoadType.CORNER_BOTTOM_LEFT.path.get(RoadStartLocation.LEFT);
			startingLocation = RoadStartLocation.LEFT;
			speed = new MonsterSpeed({x: .1, y: .1});
			subPosition = new ItemPosition({x: path[0].x, y: path[0].y});
			health = 10;
			monsterController.placeMonster({ monster, position, speed, subPosition, health, path });
		});

		it('should throw error if monster is not a Monster', () => {
			expect(() => monsterController.moveMonster('bad'))
					.to.throw(MonsterController.ERROR_MOVEMONSTER_INVALID_MONSTER.message);
		});
		it('should throw error if monster has not been added to the controller', () => {
			const badMonster = new Monster({type: MonsterType.ALIEN});
			expect(() => monsterController.moveMonster(badMonster))
					.to.throw(MonsterController.ERROR_MOVEMONSTER_MONSTER_NOT_PART_OF_CONTROLLER.message);
		});
		it('should throw error if monster has not been placed.', () => {
			const newMonster = monsterController.createMonster({type: MonsterType.ALIEN});
			expect(() => monsterController.moveMonster(newMonster))
					.to.throw(MonsterController.ERROR_MOVEMONSTER_MONSTER_NOT_PLACED.message);
		});
		it('should move the monster', () => {
			const newMonster = monsterController.moveMonster(monster);
			expect(newMonster.subPosition.x).to.equal(subPosition.x + speed.x);
			expect(newMonster.subPosition.y).to.equal(subPosition.y);
		});
	});

	describe('changing directions', () => {
		let monsterController;
		let monster;
		let position;
		let health;
		let speed;
		beforeEach(() => {
			monsterController = new MonsterController();
			monster = monsterController.createMonster({type: MonsterType.ALIEN});
			position = new ItemPosition({ x: 0, y: 0 });
			speed = new MonsterSpeed({x: .1, y: .1});
			health = 10;
		});

		const moveTheMonster = (path) => {
			const subPosition = new ItemPosition({x: path[0].x, y: path[0].y});
			monsterController.placeMonster({ monster, position, speed, subPosition, health, path });
			monsterController.moveMonster(monster);	// .1
			monsterController.moveMonster(monster);	// .2
			monsterController.moveMonster(monster);	// .3
			monsterController.moveMonster(monster);	// .4
			monsterController.moveMonster(monster);	// .5
			monsterController.moveMonster(monster);	// .6
			return subPosition;
		};

		describe('corner_bottom_left', () => {
			it('should change direction to BOTTOM on a CORNER_BOTTOM_LEFT road', () => {
				const path = RoadType.CORNER_BOTTOM_LEFT.path.get(RoadStartLocation.LEFT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .5);
				expect(monster.subPosition.y).to.equal(subPosition.y - .1);
			});
			it('should change direction to LEFT on a CORNER_BOTTOM_LEFT road', () => {
				const path = RoadType.CORNER_BOTTOM_LEFT.path.get(RoadStartLocation.BOTTOM);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .1);
				expect(monster.subPosition.y).to.equal(subPosition.y + .5);
			});
		});
		describe('corner_bottom_right', () => {
			it('should change direction to BOTTOM on a CORNER_BOTTOM_RIGHT road', () => {
				const path = RoadType.CORNER_BOTTOM_RIGHT.path.get(RoadStartLocation.RIGHT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .5);
				expect(monster.subPosition.y).to.equal(subPosition.y - .1);
			});
			it('should change direction to RIGHT on a CORNER_BOTTOM_RIGHT road', () => {
				const path = RoadType.CORNER_BOTTOM_RIGHT.path.get(RoadStartLocation.BOTTOM);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .1);
				expect(monster.subPosition.y).to.equal(subPosition.y + .5);
			});
		});
		describe('corner_top_left', () => {
			it('should change direction to TOP on a CORNER_TOP_LEFT road', () => {
				const path = RoadType.CORNER_TOP_LEFT.path.get(RoadStartLocation.LEFT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .5);
				expect(monster.subPosition.y).to.equal(subPosition.y + .1);
			});
			it('should change direction to LEFT on a CORNER_TOP_LEFT road', () => {
				const path = RoadType.CORNER_TOP_LEFT.path.get(RoadStartLocation.TOP);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .1);
				expect(monster.subPosition.y).to.equal(subPosition.y - .5);
			});
		});
		describe('corner_top_right', () => {
			it('should change direction to TOP on a CORNER_TOP_RIGHT road', () => {
				const path = RoadType.CORNER_TOP_RIGHT.path.get(RoadStartLocation.RIGHT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .5);
				expect(monster.subPosition.y).to.equal(subPosition.y + .1);
			});
			it('should change direction to RIGHT on a CORNER_TOP_RIGHT road', () => {
				const path = RoadType.CORNER_TOP_RIGHT.path.get(RoadStartLocation.TOP);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .1);
				expect(monster.subPosition.y).to.equal(subPosition.y - .5);
			});
		});
		describe('half_bottom', () => {
			it('should stop on a HALF_BOTTOM road', () => {
				const path = RoadType.HALF_BOTTOM.path.get(RoadStartLocation.BOTTOM);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x);
				expect(monster.subPosition.y).to.equal(subPosition.y + .5);
			});
		});
		describe('half_left', () => {
			it('should stop on a HALF_LEFT road', () => {
				const path = RoadType.HALF_LEFT.path.get(RoadStartLocation.LEFT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .5);
				expect(monster.subPosition.y).to.equal(subPosition.y);
			});
		});
		describe('half_right', () => {
			it('should stop on a HALF_RIGHT road', () => {
				const path = RoadType.HALF_RIGHT.path.get(RoadStartLocation.RIGHT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .5);
				expect(monster.subPosition.y).to.equal(subPosition.y);
			});
		});
		describe('half_top', () => {
			it('should stop on a HALF_TOP road', () => {
				const path = RoadType.HALF_TOP.path.get(RoadStartLocation.TOP);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x);
				expect(monster.subPosition.y).to.equal(subPosition.y - .5);
			});
		});
		describe('straight_left_right', () => {
			it('should keep going LEFT on a STRAIGHT_LEFT_RIGHT road', () => {
				const path = RoadType.STRAIGHT_LEFT_RIGHT.path.get(RoadStartLocation.RIGHT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .6);
				expect(monster.subPosition.y).to.equal(subPosition.y);
			});
			it('should keep going RIGHT on a STRAIGHT_LEFT_RIGHT road', () => {
				const path = RoadType.STRAIGHT_LEFT_RIGHT.path.get(RoadStartLocation.LEFT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .6);
				expect(monster.subPosition.y).to.equal(subPosition.y);
			});
		});
		describe('straight_top_bottom', () => {
			it('should keep going BOTTOM on a STRAIGHT_TOP_BOTTOM road', () => {
				const path = RoadType.STRAIGHT_TOP_BOTTOM.path.get(RoadStartLocation.TOP);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x);
				expect(monster.subPosition.y).to.equal(subPosition.y - .6);
			});
			it('should keep going TOP on a STRAIGHT_TOP_BOTTOM road', () => {
				const path = RoadType.STRAIGHT_TOP_BOTTOM.path.get(RoadStartLocation.BOTTOM);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x);
				expect(monster.subPosition.y).to.equal(subPosition.y + .6);
			});
		});

		describe('t_left_right_bottom', () => {
			it('should change direction to BOTTOM from LEFT on a T_LEFT_RIGHT_BOTTOM road', () => {
				const masterPath = RoadType.T_LEFT_RIGHT_BOTTOM.path.get(RoadStartLocation.LEFT);
				const path = masterPath.get(RoadDirection.BOTTOM);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .5);
				expect(monster.subPosition.y).to.equal(subPosition.y - .1);
			});
			it('should keep going to RIGHT from LEFT on a T_LEFT_RIGHT_BOTTOM road', () => {
				const masterPath = RoadType.T_LEFT_RIGHT_BOTTOM.path.get(RoadStartLocation.LEFT);
				const path = masterPath.get(RoadDirection.RIGHT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .6);
				expect(monster.subPosition.y).to.equal(subPosition.y);
			});
			it('should change direction to BOTTOM from RIGHT on a T_LEFT_RIGHT_BOTTOM road', () => {
				const masterPath = RoadType.T_LEFT_RIGHT_BOTTOM.path.get(RoadStartLocation.RIGHT);
				const path = masterPath.get(RoadDirection.BOTTOM);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .5);
				expect(monster.subPosition.y).to.equal(subPosition.y - .1);
			});
			it('should keep going to LEFT from RIGHT on a T_LEFT_RIGHT_BOTTOM road', () => {
				const masterPath = RoadType.T_LEFT_RIGHT_BOTTOM.path.get(RoadStartLocation.RIGHT);
				const path = masterPath.get(RoadDirection.LEFT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .6);
				expect(monster.subPosition.y).to.equal(subPosition.y);
			});
			it('should change direction to LEFT from BOTTOM on a T_LEFT_RIGHT_BOTTOM road', () => {
				const masterPath = RoadType.T_LEFT_RIGHT_BOTTOM.path.get(RoadStartLocation.BOTTOM);
				const path = masterPath.get(RoadDirection.LEFT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .1);
				expect(monster.subPosition.y).to.equal(subPosition.y + .5);
			});
			it('should change direction to RIGHT from BOTTOM on a T_LEFT_RIGHT_BOTTOM road', () => {
				const masterPath = RoadType.T_LEFT_RIGHT_BOTTOM.path.get(RoadStartLocation.BOTTOM);
				const path = masterPath.get(RoadDirection.RIGHT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .1);
				expect(monster.subPosition.y).to.equal(subPosition.y + .5);
			});
		});

		describe('t_left_right_top', () => {
			it('should change direction to TOP from LEFT on a T_LEFT_RIGHT_TOP road', () => {
				const masterPath = RoadType.T_LEFT_RIGHT_TOP.path.get(RoadStartLocation.LEFT);
				const path = masterPath.get(RoadDirection.TOP);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .5);
				expect(monster.subPosition.y).to.equal(subPosition.y + .1);
			});
			it('should keep going to RIGHT from LEFT on a T_LEFT_RIGHT_TOP road', () => {
				const masterPath = RoadType.T_LEFT_RIGHT_TOP.path.get(RoadStartLocation.LEFT);
				const path = masterPath.get(RoadDirection.RIGHT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .6);
				expect(monster.subPosition.y).to.equal(subPosition.y);
			});
			it('should change direction to TOP from RIGHT on a T_LEFT_RIGHT_TOP road', () => {
				const masterPath = RoadType.T_LEFT_RIGHT_TOP.path.get(RoadStartLocation.RIGHT);
				const path = masterPath.get(RoadDirection.TOP);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .5);
				expect(monster.subPosition.y).to.equal(subPosition.y + .1);
			});
			it('should keep going to LEFT from RIGHT on a T_LEFT_RIGHT_TOP road', () => {
				const masterPath = RoadType.T_LEFT_RIGHT_TOP.path.get(RoadStartLocation.RIGHT);
				const path = masterPath.get(RoadDirection.LEFT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .6);
				expect(monster.subPosition.y).to.equal(subPosition.y);
			});
			it('should change direction to LEFT from TOP on a T_LEFT_RIGHT_TOP road', () => {
				const masterPath = RoadType.T_LEFT_RIGHT_TOP.path.get(RoadStartLocation.TOP);
				const path = masterPath.get(RoadDirection.LEFT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .1);
				expect(monster.subPosition.y).to.equal(subPosition.y - .5);
			});
			it('should change direction to RIGHT from TOP on a T_LEFT_RIGHT_TOP road', () => {
				const masterPath = RoadType.T_LEFT_RIGHT_TOP.path.get(RoadStartLocation.TOP);
				const path = masterPath.get(RoadDirection.RIGHT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .1);
				expect(monster.subPosition.y).to.equal(subPosition.y - .5);
			});
		});

		describe('t_top_bottom_left', () => {
			it('should change direction to LEFT from TOP on a T_TOP_BOTTOM_LEFT road', () => {
				const masterPath = RoadType.T_TOP_BOTTOM_LEFT.path.get(RoadStartLocation.TOP);
				const path = masterPath.get(RoadDirection.LEFT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .1);
				expect(monster.subPosition.y).to.equal(subPosition.y - .5);
			});
			it('should keep going to BOTTOM from TOP on a T_TOP_BOTTOM_LEFT road', () => {
				const masterPath = RoadType.T_TOP_BOTTOM_LEFT.path.get(RoadStartLocation.TOP);
				const path = masterPath.get(RoadDirection.BOTTOM);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x);
				expect(monster.subPosition.y).to.equal(subPosition.y - .6);
			});
			it('should change direction to LEFT from BOTTOM on a T_TOP_BOTTOM_LEFT road', () => {
				const masterPath = RoadType.T_TOP_BOTTOM_LEFT.path.get(RoadStartLocation.BOTTOM);
				const path = masterPath.get(RoadDirection.LEFT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .1);
				expect(monster.subPosition.y).to.equal(subPosition.y + .5);
			});
			it('should keep going to TOP from BOTTOM on a T_TOP_BOTTOM_LEFT road', () => {
				const masterPath = RoadType.T_TOP_BOTTOM_LEFT.path.get(RoadStartLocation.BOTTOM);
				const path = masterPath.get(RoadDirection.TOP);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x);
				expect(monster.subPosition.y).to.equal(subPosition.y + .6);
			});
			it('should change direction to TOP from LEFT on a T_TOP_BOTTOM_LEFT road', () => {
				const masterPath = RoadType.T_TOP_BOTTOM_LEFT.path.get(RoadStartLocation.LEFT);
				const path = masterPath.get(RoadDirection.TOP);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .5);
				expect(monster.subPosition.y).to.equal(subPosition.y + .1);
			});
			it('should change direction to BOTTOM from RIGHT on a T_TOP_BOTTOM_LEFT road', () => {
				const masterPath = RoadType.T_TOP_BOTTOM_LEFT.path.get(RoadStartLocation.LEFT);
				const path = masterPath.get(RoadDirection.BOTTOM);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .5);
				expect(monster.subPosition.y).to.equal(subPosition.y - .1);
			});
		});

		describe('t_top_bottom_right', () => {
			it('should change direction to RIGHT from TOP on a T_TOP_BOTTOM_RIGHT road', () => {
				const masterPath = RoadType.T_TOP_BOTTOM_RIGHT.path.get(RoadStartLocation.TOP);
				const path = masterPath.get(RoadDirection.RIGHT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .1);
				expect(monster.subPosition.y).to.equal(subPosition.y - .5);
			});
			it('should keep going to BOTTOM from TOP on a T_TOP_BOTTOM_RIGHT road', () => {
				const masterPath = RoadType.T_TOP_BOTTOM_RIGHT.path.get(RoadStartLocation.TOP);
				const path = masterPath.get(RoadDirection.BOTTOM);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x);
				expect(monster.subPosition.y).to.equal(subPosition.y - .6);
			});
			it('should change direction to RIGHT from BOTTOM on a T_TOP_BOTTOM_RIGHT road', () => {
				const masterPath = RoadType.T_TOP_BOTTOM_RIGHT.path.get(RoadStartLocation.BOTTOM);
				const path = masterPath.get(RoadDirection.RIGHT);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x + .1);
				expect(monster.subPosition.y).to.equal(subPosition.y + .5);
			});
			it('should keep going to TOP from BOTTOM on a T_TOP_BOTTOM_RIGHT road', () => {
				const masterPath = RoadType.T_TOP_BOTTOM_RIGHT.path.get(RoadStartLocation.BOTTOM);
				const path = masterPath.get(RoadDirection.TOP);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x);
				expect(monster.subPosition.y).to.equal(subPosition.y + .6);
			});
			it('should change direction to TOP from RIGHT on a T_TOP_BOTTOM_RIGHT road', () => {
				const masterPath = RoadType.T_TOP_BOTTOM_RIGHT.path.get(RoadStartLocation.RIGHT);
				const path = masterPath.get(RoadDirection.TOP);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .5);
				expect(monster.subPosition.y).to.equal(subPosition.y + .1);
			});
			it('should change direction to BOTTOM from RIGHT on a T_TOP_BOTTOM_RIGHT road', () => {
				const masterPath = RoadType.T_TOP_BOTTOM_RIGHT.path.get(RoadStartLocation.RIGHT);
				const path = masterPath.get(RoadDirection.BOTTOM);
				const subPosition = moveTheMonster(path);
				expect(monster.subPosition.x).to.equal(subPosition.x - .5);
				expect(monster.subPosition.y).to.equal(subPosition.y - .1);
			});
		});
	});

	xdescribe('going to another road', () => {
		let monsterController;
		let monster;
		let speed;
		let health;
		let position;
		beforeEach(() => {
			monsterController = new MonsterController();
			monster = monsterController.createMonster({type: MonsterType.ALIEN});
			position = new ItemPosition({x: 0, y: 0});
			speed = new MonsterSpeed({x: .1, y: .1});
			health = 10;
		});
		it('should move to the next road when going TOP', () => {
			const field = new Field();
			field.addRoad({
				road: new Road({ type: RoadType.STRAIGHT_TOP_BOTTOM, position: new ItemPosition({ x: 0, y: 0 }) })
			});
			field.addRoad({
				road: new Road({ type: RoadType.STRAIGHT_TOP_BOTTOM, position: new ItemPosition({ x: 0, y: 1 }) })
			});
			const path = RoadType.STRAIGHT_TOP_BOTTOM.path.get(RoadStartLocation.BOTTOM);
			const subPosition = new ItemPosition({x: path[0].x, y: path[0].y});
			monsterController.placeMonster({ monster, position, speed, subPosition, health, path });
			monsterController.moveMonster(monster); // .1
			monsterController.moveMonster(monster); // .2
			monsterController.moveMonster(monster); // .3
			monsterController.moveMonster(monster); // .4
			monsterController.moveMonster(monster); // .5
			monsterController.moveMonster(monster); // .6
			monsterController.moveMonster(monster); // .7
			monsterController.moveMonster(monster); // .8
			monsterController.moveMonster(monster); // .9
			monsterController.moveMonster(monster); // 1 - should switch to another road at this point
			expect(monster.subPosition.x).to.equal(.5);
			expect(monster.subPosition.y).to.equal(0);
			expect(monster.position.x).to.equal(0);
			expect(monster.position.y).to.equal(1);
		});
		it('should move to the next road when going RIGHT', () => {});
		it('should move to the next road when going BOTTOM', () => {});
		it('should move to the next road when going LEFT', () => {});
	});
});