import BaseGameItem from "../../src/classes/BaseGameItem.js";
import ItemPosition from "../../src/classes/ItemPosition.js";

describe('base game item', () => {

	describe('creation', () => {
		it('should return an object', () => {
			const baseGameItem = new BaseGameItem();
			expect(baseGameItem instanceof BaseGameItem).to.be.true;
		});
		it('should set the defaults', () => {
			const baseGameItem = new BaseGameItem();
			expect(typeof(baseGameItem.id) === 'string').to.be.true;
			expect(baseGameItem.position instanceof ItemPosition).to.be.true;
		});
		it('should set the id', () => {
			const baseGameItem = new BaseGameItem({ id: 'goodone' });
			expect(baseGameItem.id).to.equal('goodone');
		});
		it('should throw exception if position is not ItemPosition', () => {
			expect(() => new BaseGameItem({ position: 'bad' })).to.throw(BaseGameItem.ERROR_ARG_NOT_ITEMPOSITION.message);
		});
	});

	describe('setPosition', () => {
		let baseGameItem;
		beforeEach(() => {
			baseGameItem = new BaseGameItem();
		});
		it('should throw error if argument is not ItemPosition', () => {
			expect(() => baseGameItem.setPosition()).to.throw(BaseGameItem.ERROR_ARG_NOT_ITEMPOSITION.message);
		});
	});


});