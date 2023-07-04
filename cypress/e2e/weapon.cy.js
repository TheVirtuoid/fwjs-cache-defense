import WeaponType from "../../src/classes/types/WeaponType.js";
import Weapon from "../../src/classes/Weapon.js";

describe('weapon', () => {

	describe('creation', () => {
		it('should create the object', () => {
			const weapon = new Weapon({ type: WeaponType.SHOOTER });
			expect(weapon instanceof Weapon).to.be.true;
		});
		it('should throw error if type is incorrect', () => {
			expect(() => new Weapon({ type: 'bad' })).to.throw(Weapon.ERROR_INVALID_WEAPON_TYPE.message);
		});
		it('should set the default id', () => {
			const weapon = new Weapon({ type: WeaponType.SHOOTER });
			expect(typeof(weapon.id)).to.equal('string');
		});
		it('should set the id', () => {
			const weapon = new Weapon({ type: WeaponType.SHOOTER, id: 'test' });
			expect(weapon.id).to.equal('test');
		});
	});
});