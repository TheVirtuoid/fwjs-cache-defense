import MonsterType from "../../src/classes/types/MonsterType.js";
import Monster from "../../src/classes/Monster.js";

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
	});
});