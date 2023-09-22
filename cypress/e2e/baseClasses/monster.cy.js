import MonsterType from "../../../src/classes/types/MonsterType.js";
import Monster from "../../../src/classes/Monster.js";

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
			expect(subPosition.x).to.equal(Number.POSITIVE_INFINITY);
			expect(subPosition.y).to.equal(Number.POSITIVE_INFINITY);
		});
		it('should set speed to default', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			const { x, y } = monster.getSpeed();
			expect(x).to.equal(Monster.DEFAULT_SPEED.x);
			expect(y).to.equal(Monster.DEFAULT_SPEED.y);
		});
	});

	describe('getSubPosition', () => {
		it('should return the sub-position', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			const subPosition = monster.getSubPosition();
			expect(subPosition.x).to.equal(Number.POSITIVE_INFINITY);
			expect(subPosition.y).to.equal(Number.POSITIVE_INFINITY);
		});
	});

	describe('setSubPosition', () => {
		it('should throw error if x is not a number', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			expect(() => monster.setSubPosition('bad', .2)).to.throw(Monster.ERROR_SUBPOSITION_X_NOT_NUMBER.message);
		});
		it('should throw error if y is not a number', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			expect(() => monster.setSubPosition(.1, 'bad')).to.throw(Monster.ERROR_SUBPOSITION_Y_NOT_NUMBER.message);
		});
		it('should throw error if x is less than 0', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			expect(() => monster.setSubPosition(-1, .2)).to.throw(Monster.ERROR_SUBPOSITION_X_OUT_OF_RANGE.message);
		});
		it('should throw error if y is less than 0', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			expect(() => monster.setSubPosition(.1, -1)).to.throw(Monster.ERROR_SUBPOSITION_Y_OUT_OF_RANGE.message);
		});
		it('should throw error if x is 1 or greater', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			expect(() => monster.setSubPosition(1, .1)).to.throw(Monster.ERROR_SUBPOSITION_X_OUT_OF_RANGE.message);
		});
		it('should throw error if y is 1 or greater', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			expect(() => monster.setSubPosition(.1, 1)).to.throw(Monster.ERROR_SUBPOSITION_Y_OUT_OF_RANGE.message);
		});
		it('should set the sub-position', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			monster.setSubPosition(.1, .2);
			const subPosition = monster.getSubPosition();
			expect(subPosition.x).to.equal(.1);
			expect(subPosition.y).to.equal(.2);
		});
	});

	describe('hasSubPositionBeenSet', () => {
		it('should return false is nothing has been set', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			expect(monster.hasSubPositionBeenSet()).to.be.false;
		});
		it('should return true if something has been set', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			monster.setSubPosition(.1, .2);
			expect(monster.hasSubPositionBeenSet()).to.be.true;
		});
	});

	describe('getSpeed', () => {
		it('should get the correct speed', () => {
			const monster = new Monster({ type: MonsterType.ALIEN });
			monster.setSpeed(.1, .2);
			const { x, y } = monster.getSpeed();
			expect(x).to.equal(.1);
			expect(y).to.equal(.2);
		});
	})

	describe('setSpeed', () => {
		let monster;
		beforeEach(() => {
			monster = new Monster({ type: MonsterType.ALIEN });
		});
		it(`should throw error if "x" argument is not a number`, () => {
			expect(() => monster.setSpeed('bad', .2)).to.throw(Monster.ERROR_SETSPEED_X_NOT_NUMBER.message);
		});
		it(`should throw error if "x" argument is -1 or less`, () => {
			expect(() => monster.setSpeed(-1, .2)).to.throw(Monster.ERROR_SETSPEED_X_OUT_OF_RANGE.message);
		});
		it(`should throw error if "x" argument is 1 or greater`, () => {
			expect(() => monster.setSpeed(1, .2)).to.throw(Monster.ERROR_SETSPEED_X_OUT_OF_RANGE.message);
		});
		it(`should throw error if "y" argument is not a number`, () => {
			expect(() => monster.setSpeed(.1, 'bad')).to.throw(Monster.ERROR_SETSPEED_Y_NOT_NUMBER.message);
		});
		it(`should throw error if "y" argument is -1 or less`, () => {
			expect(() => monster.setSpeed(.1, -1)).to.throw(Monster.ERROR_SETSPEED_Y_OUT_OF_RANGE.message);
		});
		it(`should throw error if "y" argument is 1 or greater`, () => {
			expect(() => monster.setSpeed(.1, 1)).to.throw(Monster.ERROR_SETSPEED_Y_OUT_OF_RANGE.message);
		});
		it('should set the speed', () => {
			monster.setSpeed(.1, .2);
			const { x, y } = monster.getSpeed();
			expect(x).to.equal(.1);
			expect(y).to.equal(.2);
		});
	});
});