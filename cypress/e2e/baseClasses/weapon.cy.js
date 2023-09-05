import WeaponType from "../../../src/classes/types/WeaponType.js";
import Weapon from "../../../src/classes/Weapon.js";

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
		it('should get the type', () => {
			const weapon = new Weapon({ type: WeaponType.SHOOTER });
			expect(weapon.type).to.equal(WeaponType.SHOOTER);
		});
		it('should get the name', () => {
			const weapon = new Weapon({ type: WeaponType.SHOOTER });
			expect(weapon.name).not.to.be.undefined;
			expect(weapon.name).to.equal(WeaponType.SHOOTER.name);
		});
	});

	describe('toObject', () => {
		it('should create a good object', () => {
			const weapon = new Weapon({ type: WeaponType.SHOOTER });
			const weaponObject = weapon.toObject();
			expect(weaponObject.type).to.equal(WeaponType.SHOOTER);
			expect(weaponObject.id).not.to.be.undefined;
			expect(weaponObject.position).not.to.be.undefined;
			expect(weaponObject.name).not.to.be.undefined;
		});
	});
});