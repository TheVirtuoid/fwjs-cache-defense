import ControlPanel from "../../../src/classes/inGame/ControlPanel.js";
import WeaponType from "../../../src/classes/types/WeaponType.js";
import Weapon from "../../../src/classes/Weapon.js";

describe('control-panel', () => {

	describe('creation', () => {
		it('should create the object', () => {
			const controlPanel = new ControlPanel();
			expect(controlPanel instanceof ControlPanel).to.be.true;
		});
		it('should be a singleton instance', () => {
			const controlPanel = new ControlPanel();
			const newControlPanel = new ControlPanel();
			expect(controlPanel === newControlPanel).to.be.true;
		});
		it('should NOT have set a DOM object', () => {
			const controlPanel = new ControlPanel()
			expect(controlPanel.coinsDom).to.be.undefined;
			expect(controlPanel.weaponsSelectionDom).to.be.undefined;
			expect(controlPanel.roundNumberDom).to.be.undefined;
			expect(controlPanel.healthDom).to.be.undefined;
		});
		it('should have SET the DOM object', () => {
			const dom = { coinsDom: 1, weaponsSelectionDom: 1, roundNumberDom: 1, healthDom: 1 };
			const controlPanel = new ControlPanel();
			controlPanel.setDom(dom);
			expect(controlPanel.coinsDom).not.to.be.undefined;
			expect(controlPanel.weaponsSelectionDom).not.to.be.undefined;
			expect(controlPanel.roundNumberDom).not.to.be.undefined;
			expect(controlPanel.healthDom).not.to.be.undefined;
		});
	});

	describe('setting the dom', () => {
		it('should set the dom', () => {
			const dom = { coinsDom: 2, weaponsSelectionDom: 2, roundNumberDom: 2, healthDom: 2 };
			const controlPanel = new ControlPanel();
			controlPanel.setDom(dom);
			expect(controlPanel.coinsDom).to.equal(2);
			expect(controlPanel.weaponsSelectionDom).to.equal(2);
			expect(controlPanel.roundNumberDom).to.equal(2);
			expect(controlPanel.healthDom).to.equal(2);
		});
	});

	describe('setCoins (non-DOM)', () => {
		let controlPanel;
		beforeEach(() => {
			const dom = { coinsDom: 2, weaponsSelectionDom: 2, roundNumberDom: 2, healthDom: 2 };
			controlPanel = new ControlPanel();
			controlPanel.setDom(dom);
		});
		it('should throw error if argument is not integer', () => {
			expect(() => controlPanel.setCoins('bad')).to.throw(ControlPanel.ERROR_SETCOINS_ARGUMENT_NOT_INTEGER.message);
		});
		it('should throw error if argument < 0', () => {
			expect( () => controlPanel.setCoins(-1)).to.throw(ControlPanel.ERROR_SETCOUNT_ARGUMENT_NOT_POSITIVE.message);
		});
	});

	describe('setRoundNumber (non-DOM)', () => {
		let controlPanel;
		beforeEach(() => {
			const dom = { coinsDom: 2, weaponsSelectionDom: 2, roundNumberDom: 2, healthDom: 2 };
			controlPanel = new ControlPanel();
			controlPanel.setDom(dom);
		});
		it('should throw error if argument is not integer', () => {
			expect(() => controlPanel.setRoundNumber('bad')).to.throw(ControlPanel.ERROR_SETROUNDNUMBER_ARGUMENT_NOT_INTEGER.message);
		});
		it('should throw error if argument < 1', () => {
			expect( () => controlPanel.setRoundNumber(0)).to.throw(ControlPanel.ERROR_SETROUNDNUMBER_ARGUMENT_NOT_GREATERTHAN_ZERO.message);
		});
	});

	describe('setHealth (non-DOM)', () => {
		let controlPanel;
		beforeEach(() => {
			const dom = { coinsDom: 2, weaponsSelectionDom: 2, roundNumberDom: 2, healthDom: 2 };
			controlPanel = new ControlPanel();
			controlPanel.setDom(dom);
		});
		it('should throw error if argument is not integer', () => {
			expect(() => controlPanel.setHealth('bad')).to.throw(ControlPanel.ERROR_SETHEALTH_ARGUMENT_NOT_INTEGER.message);
		});
		it('should throw error if argument < 0', () => {
			expect( () => controlPanel.setHealth(-1)).to.throw(ControlPanel.ERROR_SETHEALTH_ARGUMENT_NOT_POSITIVE.message);
		});
	});

	describe('setWeapons (non-DOM)', () => {
		let controlPanel;
		beforeEach(() => {
			const dom = { coinsDom: 2, weaponsSelectionDom: 2, roundNumberDom: 2, healthDom: 2 };
			controlPanel = new ControlPanel();
			controlPanel.setDom(dom);
		});
		it('should throw error is argument is not an array', () => {
			expect( () => controlPanel.setWeapons('bad')).to.throw(ControlPanel.ERROR_SETWEAPONS_ARGUMENT_NOT_ARRAY.message);
		});
		it('should throw error is argument is an empty array', () => {
			expect( () => controlPanel.setWeapons([])).to.throw(ControlPanel.ERROR_SETWEAPONS_ARGUMENT_EMPTY_ARRAY.message);
		});
		it('should throw error if argument not an array of Weapon', () => {
			expect( () => controlPanel.setWeapons(['bad'])).to.throw(ControlPanel.ERROR_SETWEAPONS_ARGUMENT_NOT_ARRAY_WEAPONS.message);
		});
	});

});