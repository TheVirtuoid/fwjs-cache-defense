import MonsterType from "../../../src/classes/types/MonsterType.js";
import Monster from "../../../src/classes/Monster.js";
import ItemPosition from "../../../src/classes/ItemPosition.js";
import MonsterSpeed from "../../../src/classes/MonsterSpeed.js";
import RoadStartLocation from "../../../src/classes/types/RoadStartLocation.js";
import PathType from "../../../src/classes/types/PathType.js";

describe('monster', () => {

	describe('creation', () => {
		it('should create the object', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			expect(monster instanceof Monster).to.be.true;
		});
		it('should throw error if type is incorrect', () => {
			expect(() => new Monster({ type: 'bad' })).to.throw(Monster.ERROR_INVALID_MONSTER_TYPE.message);
		});
		it('should set the default id', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			expect(typeof(monster.id)).to.equal('string');
		});
		it('should set the id', () => {
			const monster = new Monster({ type: MonsterType.ALIEN, id: 'test' });
			expect(monster.id).to.equal('test');
		});
		it('should set a sub-position to default', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });

			const subPosition = monster.getSubPosition();
			expect(subPosition.x).to.equal(Monster.DEFAULT_SUBPOSITION.x);
			expect(subPosition.y).to.equal(Monster.DEFAULT_SUBPOSITION.y);
		});
		it('should set speed to default', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			const { x, y } = monster.getSpeed();
			expect(x).to.equal(Monster.DEFAULT_SPEED.x);
			expect(y).to.equal(Monster.DEFAULT_SPEED.y);
		});
		it('should set health to default', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			expect(monster.health).to.equal(Monster.DEFAULT_HEALTH);
		});
		it('should set the path to default', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			expect(monster.path.length).to.equal(0);
		});
	});

	describe('getSubPosition', () => {
		let monster;
		beforeEach(() => {
			monster = new Monster({ type: MonsterType.ALIEN });
		});
		it('should return the subPosition as an ItemPosition', () => {
			const subPosition = monster.getSubPosition();
			expect(subPosition instanceof ItemPosition).to.be.true;
		});

	});

	describe('setSubPosition', () => {
		let monster;
		beforeEach(() => {
			monster = new Monster({ type: MonsterType.ALIEN });
		});
		it('should throw error if argument is not an ItemPosition', () => {
			expect(() => monster.setSubPosition('bad')).to.throw(Monster.ERROR_SUBPOSITION_NOT_ITEMPOSITION.message);
		});
		it('should throw error if x is less than 0', () => {
			const subPosition = new ItemPosition({ x: -1, y: .2 });
			expect(() => monster.setSubPosition(subPosition)).to.throw(Monster.ERROR_SUBPOSITION_X_OUT_OF_RANGE.message);
		});
		it('should throw error if y is less than 0', () => {
			const subPosition = new ItemPosition({ x: .1, y: -2 });
			expect(() => monster.setSubPosition(subPosition)).to.throw(Monster.ERROR_SUBPOSITION_Y_OUT_OF_RANGE.message);
		});
		it('should throw error if x is greater than 1', () => {
			const subPosition = new ItemPosition({ x: 2, y: .1 });
			expect(() => monster.setSubPosition(subPosition)).to.throw(Monster.ERROR_SUBPOSITION_X_OUT_OF_RANGE.message);
		});
		it('should throw error if y is greater than 1', () => {
			const subPosition = new ItemPosition({ x: .1, y: 2 });
			expect(() => monster.setSubPosition(subPosition)).to.throw(Monster.ERROR_SUBPOSITION_Y_OUT_OF_RANGE.message);
		});
		it('should set the sub-position', () => {
			const subPosition = new ItemPosition({ x: .1, y: .2 });
			monster.setSubPosition(subPosition);
			const returnedSubPosition = monster.getSubPosition();
			expect(returnedSubPosition.x).to.equal(.1);
			expect(returnedSubPosition.y).to.equal(.2);
		});
	});

	describe('hasSubPositionBeenSet', () => {
		it('should return false is nothing has been set', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			expect(monster.hasSubPositionBeenSet()).to.be.false;
		});
		it('should return true if something has been set', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			monster.setSubPosition(new ItemPosition({ x: .1, y: .2 }));
			expect(monster.hasSubPositionBeenSet()).to.be.true;
		});
	});

	describe('setSpeed', () => {
		let monster;
		beforeEach(() => {
			monster = new Monster({ type: MonsterType.ALIEN });
		});
		it('should set the speed', () => {
			monster.setSpeed(new MonsterSpeed({ x: .1, y: .2 }));
			const { x, y } = monster.getSpeed();
			expect(x).to.equal(.1);
			expect(y).to.equal(.2);
		});
	});

	describe('setHealth', () => {
		let monster;
		beforeEach(() => {
			monster = new Monster({ type: MonsterType.ALIEN });
		});
		it('should throw error if argument is not a number', () => {
			expect(() => monster.setHealth('bad')).to.throw(Monster.ERROR_SETHEALTH_NOT_NUMBER.message);
		});
		it('should throw error is argument is 0 or less', () => {
			expect(() => monster.setHealth(0)).to.throw(Monster.ERROR_SETHEALTH_GREATER_THAN_0.message);
		});
		it('should set the health', () => {
			monster.setHealth(2);
			expect(monster.health).to.equal(2);
		});
	});

	describe('setPath', () => {
		let monster;
		beforeEach(() => {
			monster = new Monster({ type: MonsterType.ALIEN });
		});
		it('should throw error if argument is not am Array', () => {
			expect(() => monster.setPath('bad')).to.throw(Monster.ERROR_SETPATH_NOT_ARRAY.message);
		});
		it('should throw error if at least one pathType is not a PathType', () => {
			const path = [
					new PathType({ position: new ItemPosition({ x: 0, y: 0 }), direction: null }),
					'bad'
			]
			expect(() => monster.setPath(path)).to.throw(Monster.ERROR_SETPATH_NOT_PATHTYPE.message);
		});
		it('should return a correct path', () => {
			const path = [
					new PathType({ position: new ItemPosition( { x: 0, y: 0 }), direction: null }),
			];
			monster.setPath(path);
			expect(monster.path.length).to.equal(1);
			expect(monster.path[0].x).to.equal(0);
			expect(monster.path[0].y).to.equal(0);
			expect(monster.path[0].direction).to.be.null;
		});
	});

	describe('getCurrentSubPath', () => {
		let monster;
		beforeEach(() => {
			monster = new Monster({ type: MonsterType.ALIEN });
		});
		it('should return null if no path has been set', () => {
			expect(monster.getCurrentSubPath()).to.be.null;
		});
		it('should return the current path', () => {
			const path = [
					new PathType({ position: new ItemPosition( { x: 0, y: 0 }), direction: null }),
			];
			monster.setPath(path);
			expect(monster.getCurrentSubPath()).to.equal(path[0]);
		});
	});
});