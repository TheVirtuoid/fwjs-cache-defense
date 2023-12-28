import Item from "../../src/classes/Item.js";
import ItemType from "../../src/classes/types/ItemType.js";
import RoadDirection from "../../src/classes/types/RoadDirection.js";

const testItem = new Item({ id: 'test', type: ItemType.MONSTER.ALIEN });
describe('item', () => {
	describe('creation', () => {
		it('should throw error if id is not a property', () => {
			expect(() => new Item({ type: ItemType.MONSTER.ALIEN })).to.throw(`'id' must be a property.`);
		});
		it('should throw error if type is not a property', () => {
			expect(() => new Item({ id: 'test' })).to.throw(`'type' must be a property.`);
		});
		it('should throw error if type is not a valid type', () => {
			expect(() => new Item({ id: 'test', type: 'test' })).to.throw(`'type' must be a valid type.`);
		});
		it('should have an id', () => {
			const item = new Item(testItem)
			expect(item.id).to.equal('test');
		});
		it('should have a type', () => {
			const item = new Item(testItem)
			expect(item.type).to.equal(ItemType.MONSTER.ALIEN);
		});
	});

	describe('setting the image', () => {
		it('should throw error if image is not one of the legal types', () => {
			const item = new Item(testItem);
			expect(() => {item.image = '';}).to.throw(`'image' must be one of the legal image types`);
		});
	});

	describe('setting/getting the direction', () => {
		it('should throw error if direction is not a valid direction', () => {
			const item = new Item(testItem);
			expect(() => {item.direction = 'test';}).to.throw(`'direction' must be a valid direction.`);
		});
		it('should set/get the direction', () => {
			const item = new Item(testItem);
			item.direction = RoadDirection.TOP;
			expect(item.direction).to.equal(RoadDirection.TOP);
		});
	});
});