import RoadType from "../../src/classes/types/RoadType.js";
import Pos from "../../src/classes/Pos.js";
import Tile from "../../src/classes/Tile.js";
import Item from "../../src/classes/Item.js";
import ItemType from "../../src/classes/types/ItemType.js";
import RoadDirection from "../../src/classes/types/RoadDirection.js";

const id = 'test';
const position = new Pos({ x: 5, y: 5 });
const roadType = RoadType.HALF_RIGHT;

const item1 = new Item({ id: 'test1', type: ItemType.MONSTER.ALIEN });
const item2 = new Item({ id: 'test2', type: ItemType.MONSTER.ALIEN });
const item3 = new Item({ id: 'test3', type: ItemType.MONSTER.ALIEN });
const subPos00 = new Pos({ x: 0, y: 0 });
const subPos11 = new Pos({ x: 1, y: 1 });
const subPos22 = new Pos({ x: 2, y: 2 });


describe('Tile', () => {
	describe('creation', () => {
		it('should throw error if id is not a property', () => {
			expect(() => new Tile({ roadType, position })).to.throw(`'id' must be a property.`);
		});
		it('should throw error if roadType is not a property', () => {
			expect(() => new Tile({ id, position })).to.throw(`'roadType' must be a property.`);
		});
		it('should throw error if roadType is not a valid type', () => {
			expect(() => new Tile({ id, roadType: 'test', position })).to.throw(`'roadType' must be a valid type.`);
		});
		it('should throw error if position is not a property', () => {
			expect(() => new Tile({ id, roadType })).to.throw(`'position' must be a property.`);
		});
		it('should throw error if position is not a Pos class', () => {
			expect(() => new Tile({ id, roadType, position: 0 })).to.throw(`'position' must be a Pos class.`);
		});
		it('should create the instance', () => {
			const tile = new Tile({ id, roadType, position });
			expect(tile).to.be.instanceOf(Tile);
		});
		it('should have an id', () => {
			const tile = new Tile({ id, roadType, position });
			expect(tile.id).to.equal('test');
		});
		it('should have the correct roadType', () => {
			const tile = new Tile({ id, roadType, position });
			expect(tile.roadType).to.equal(RoadType.HALF_RIGHT);
		});
		it('should have the correct position', () => {
			const tile = new Tile({ id, roadType, position });
			expect(tile.position.x).to.equal(5);
			expect(tile.position.y).to.equal(5);
		});
	});
	describe('addItem', () => {
		it('should throw error if item is not a property', () => {
			const tile = new Tile({ id, roadType, position });
			expect(() => tile.addItem({ subPosition: subPos00 })).to.throw(`'item' must be a property.`);
		});
		it('should throw error if item is not an Item class', () => {
			const tile = new Tile({ id, roadType, position });
			expect(() => tile.addItem({ item: 0, subPosition: subPos00 })).to.throw(`'item' must be an Item class.`);
		});
		it('should throw error if subPosition is not a property', () => {
			const tile = new Tile({ id, roadType, position });
			expect(() => tile.addItem({ item: item1 })).to.throw(`'subPosition' must be a property.`);
		});
		it('should throw error if subPosition is not a Pos class', () => {
			const tile = new Tile({ id, roadType, position });
			expect(() => tile.addItem({ item: item1, subPosition: 0 })).to.throw(`'subPosition' must be a Pos class.`);
		});
		it('should throw error if subPosition is already occupied', () => {
			const tile = new Tile({ id, roadType, position });
			tile.addItem({ item: item1, subPosition: subPos00 });
			expect(() => tile.addItem({ item: item2, subPosition: subPos00 })).to.throw(`'subPosition' is already occupied.`);
		});
		it('should add the item', () => {
			const tile = new Tile({ id, roadType, position });
			tile.addItem({ item: item1, subPosition: subPos00 });
			expect(tile.getItem(subPos00)).to.equal(item1);
		});
	});
	describe('removeItem', () => {
		it('should throw error if subPosition is not a property', () => {
			const tile = new Tile({ id, roadType, position });
			expect(() => tile.removeItem()).to.throw(`'subPosition' must be a property.`);
		});
		it('should throw error if subPosition is not a Pos class', () => {
			const tile = new Tile({ id, roadType, position });
			expect(() => tile.removeItem(0)).to.throw(`'subPosition' must be a Pos class.`);
		});
		it('should throw error if subPosition is not occupied', () => {
			const tile = new Tile({ id, roadType, position });
			expect(() => tile.removeItem(subPos00)).to.throw(`'subPosition' is not occupied.`);
		});
		it('should remove the item', () => {
			const tile = new Tile({ id, roadType, position });
			tile.addItem({ item: item1, subPosition: subPos00 });
			tile.removeItem(subPos00);
			expect(tile.getItem(subPos00)).to.be.undefined;
		});
	});
	describe('getItem', () => {
		it('should throw error if subPosition is not a property', () => {
			const tile = new Tile({ id, roadType, position });
			expect(() => tile.getItem()).to.throw(`'subPosition' must be a property.`);
		});
		it('should throw error if subPosition is not a Pos class', () => {
			const tile = new Tile({ id, roadType, position });
			expect(() => tile.getItem(0)).to.throw(`'subPosition' must be a Pos class.`);
		});
		it('should return undefined if subPosition is not occupied', () => {
			const tile = new Tile({ id, roadType, position });
			expect(tile.getItem(subPos00)).to.be.undefined;
		});
		it('should return the item', () => {
			const tile = new Tile({ id, roadType, position });
			tile.addItem({ item: item1, subPosition: subPos00 });
			expect(tile.getItem(subPos00)).to.equal(item1);
		});
	});
	describe('getItems', () => {
		it('should return an empty array if there are no items', () => {
			const tile = new Tile({ id, roadType, position });
			expect(tile.getItems()).to.be.an('array').that.is.empty;
		});
		it('should return an array of items', () => {
			const tile = new Tile({ id, roadType, position });
			tile.addItem({ item: item1, subPosition: subPos00 });
			tile.addItem({ item: item2, subPosition: subPos11 });
			tile.addItem({ item: item3, subPosition: subPos22 });
			expect(tile.getItems()).to.be.an('array').with.lengthOf(3);
			expect(tile.getItems()).to.include(item1);
			expect(tile.getItems()).to.include(item2);
			expect(tile.getItems()).to.include(item3);
		});
	});

	describe('image processing', () => {
		it('should throw error if image is not an object', () => {
			const tile = new Tile({ id, roadType, position });
			expect(() => tile.image = '').to.throw(`'image' must be one of the legal objects.`);
		});
	});

	describe('getNextPosition', () => {
		it('should throw error if direction is not a RoadDirection', () => {
			const tile = new Tile({ id, roadType, position });
			expect(() => tile.getNextPosition('')).to.throw(`'direction' must be a valid RoadDirection.`);
		});
		it('should return x=4, y=5 if direction is RoadDirection.LEFT', () => {
			const tile = new Tile({ id, roadType, position });
			const nextPosition = tile.getNextPosition(RoadDirection.LEFT);
			expect(nextPosition.x).to.equal(4);
			expect(nextPosition.y).to.equal(5);
		});
		it('should return x=6, y=5 if direction is RoadDirection.RIGHT', () => {
			const tile = new Tile({ id, roadType, position });
			const nextPosition = tile.getNextPosition(RoadDirection.RIGHT);
			expect(nextPosition.x).to.equal(6);
			expect(nextPosition.y).to.equal(5);
		});
		it('should return x=5, y=4 if direction is RoadDirection.TOP', () => {
			const tile = new Tile({ id, roadType, position });
			const nextPosition = tile.getNextPosition(RoadDirection.TOP);
			expect(nextPosition.x).to.equal(5);
			expect(nextPosition.y).to.equal(4);
		});
		it('should return x=5, y=6 if direction is RoadDirection.BOTTOM', () => {
			const tile = new Tile({ id, roadType, position });
			const nextPosition = tile.getNextPosition(RoadDirection.BOTTOM);
			expect(nextPosition.x).to.equal(5);
			expect(nextPosition.y).to.equal(6);
		});
	});
});