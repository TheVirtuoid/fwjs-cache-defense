import BaseGameItem from "../../../src/classes/BaseGameItem.js";
import ItemPosition from "../../../src/classes/ItemPosition.js";

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
			expect(baseGameItem.imageKey).to.equal('');
		});
		it('should set the id', () => {
			const baseGameItem = new BaseGameItem({ id: 'goodone' });
			expect(baseGameItem.id).to.equal('goodone');
		});
		it('should throw exception if position is not ItemPosition', () => {
			expect(() => new BaseGameItem({ position: 'bad' })).to.throw(BaseGameItem.ERROR_ARG_NOT_ITEMPOSITION.message);
		});
		it('should set the imageKey', () => {
			const baseGameItem = new BaseGameItem({ imageKey: 'goodone' });
			expect(baseGameItem.imageKey).to.equal('goodone');
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

	describe('toObject', () => {
		it('should return the correct object', () => {
			const baseGameItem = new BaseGameItem({ id: 'test', position: new ItemPosition({ x:1, y:2 })});
			const baseGameItemObject = baseGameItem.toObject();
			expect(baseGameItemObject.id).to.equal('test');
			expect(baseGameItemObject.position).not.to.be.undefined;
		});
	});



});