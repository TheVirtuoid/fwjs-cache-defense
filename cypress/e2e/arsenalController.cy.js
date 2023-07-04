import ArsenalController from "../../src/classes/controllers/ArsenalController.js";
import Weapon from "../../src/classes/Weapon.js";
import WeaponType from "../../src/classes/types/WeaponType.js";

describe('arsenalController', () => {

	describe('creation', () => {
		it('should create the object', () => {
			const arsenalController = new ArsenalController();
			expect(arsenalController instanceof ArsenalController).to.be.true;
		});
		it('should set the defaults', () => {});
	});

	describe('createWeapon', () => {
		let arsenalController;
		beforeEach(() => {
			arsenalController = new ArsenalController();
		});

		it('should throw error is weapontype is invalid', () => {
			expect(() => arsenalController.createWeapon({ type: 'bad' })).to.throw(Weapon.ERROR_INVALID_WEAPON_TYPE.message);
		});
		it('should create the weapon', () => {
			const weapon = arsenalController.createWeapon({ type: WeaponType.SHOOTER });
			expect(weapon instanceof Weapon).to.be.true;
		});
		it('should create the weapon with a specified id', () => {
			const weapon = arsenalController.createWeapon({ type: WeaponType.SHOOTER, id: 'test' });
			expect(weapon.id).to.equal('test');
		});
	});

	describe('getWeapon', () => {
		let arsenalController;
		let weapon;
		beforeEach(() => {
			arsenalController = new ArsenalController();
			weapon = arsenalController.createWeapon({ type: WeaponType.SHOOTER, id: 'test' });
		});

		it('should return null if weapon cannot be found', () => {
			expect(arsenalController.getWeapon('missing')).to.be.null;
		});
		it('should return the weapon', () => {
			const newWeapon = arsenalController.getWeapon(weapon.id);
			expect(newWeapon).to.equal(weapon);
		});
	});

	describe('removeWeapon', () => {
		let arsenalController;
		let weapon;
		beforeEach(() => {
			arsenalController = new ArsenalController();
			weapon = arsenalController.createWeapon({ type: WeaponType.SHOOTER, id: 'test' });
		});

		it('should return false if weapon to remove cannot be found', () => {
			expect(arsenalController.removeWeapon('missing')).to.be.false;
		});

		it('should return true if weapon is removed', () => {
			expect(arsenalController.removeWeapon(weapon.id)).to.be.true;
			expect(arsenalController.getWeapon(weapon.id)).to.be.null;
		});

	});

	describe('initialize', () => {
		let arsenalController;
		let weapon1;
		let weapon2;
		beforeEach(() => {
			arsenalController = new ArsenalController();
			weapon1 = arsenalController.createWeapon({ type: WeaponType.SHOOTER });
			weapon2 = arsenalController.createWeapon({ type: WeaponType.SHOOTER });
		});

		it('should initialize', () => {
			arsenalController.initialize();
			expect(arsenalController.getWeapon(weapon1.id)).to.be.null;
			expect(arsenalController.getWeapon(weapon2.id)).to.be.null;
		});

	});
});