import Field from "../../../src/classes/Field.js";
import Road from "../../../src/classes/Road.js";
import RoadType from "../../../src/classes/types/RoadType.js";
import ItemPosition from "../../../src/classes/ItemPosition.js";
import BaseGameItem from "../../../src/classes/BaseGameItem.js";

describe('field', () => {
	describe('creation', () => {
		it('should create the object', () => {
			const field = new Field();
			expect(field instanceof Field).to.be.true;
		});
		xit('should set the defaults', () => {
			const field = new Field();
		});
	});

	describe('addRoad', () => {
		let field;
		beforeEach( () => {
			field = new Field();
		});
		it('should throw error if road is not a Road', () => {
			expect(() => field.addRoad({road: 'bad'})).to.throw(Field.ERROR_ADDROAD_INVALID_ROAD.message);
		})
		it('should throw error if position is not ItemPosition', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			expect(() => field.addRoad({ road, position: 'bad' })).to.throw(Field.ERROR_ADDROAD_INVALID_POSITION.message);
		});
		it('should throw error if no position, but road position is the default', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			expect(() => field.addRoad({ road })).to.throw(Field.ERROR_ADDROAD_POSITION_IS_DEFAULT_ON_ROAD.message);
		});
		it('should throw error if another road already occupies the position', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			const position = new ItemPosition({ x: 0, y: 0 });
			field.addRoad({ road, position })
			expect(() => field.addRoad({ road })).to.throw(Field.ERROR_ADDROAD_POSITION_OCCUPIED.message);
		});
		it('should add the road using the position in the road', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT, position: new ItemPosition({ x:0, y: 0 }) });
			field.addRoad({ road });
			const returnedRoad = field.getRoadByPosition(new ItemPosition({ x: 0, y: 0 }));
			expect(returnedRoad).to.equal(road);
		});
		it('should add the road', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			const position = new ItemPosition({ x: 1, y: 2 });
			field.addRoad({ road, position });
			const returnedRoad = field.getRoadByPosition(new ItemPosition({ x: 1, y: 2 }));
			expect(returnedRoad).to.equal(road);
		});
	});

	describe('getRoadByPosition', () => {
		let field;
		beforeEach( () => {
			field = new Field();
		});
		it('should throw error if position is not ItemPosition', () => {
			expect(() => field.getRoadByPosition('bad')).to.throw(Field.ERROR_GETROADBYPOSITION_INVALID_POSITION.message);
		});
		it('should retrieve the road', () => {
			const road = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			const position = new ItemPosition({ x: 1, y: 2 });
			field.addRoad({ road, position });
			const returnedRoad = field.getRoadByPosition(new ItemPosition({ x: 1, y: 2 }));
			expect(returnedRoad).to.equal(road);
		});
		it('should return null if no road is at that position', () => {
			const returnedRoad = field.getRoadByPosition(new ItemPosition({ x: 1, y: 2 }));
			expect(returnedRoad).to.be.null;
		});
	});

	describe('placeItem', () => {
		let field;
		beforeEach( () => {
			field = new Field();
		});
		it('should throw error if item is not a BaseGameItem', () => {
			expect(() => field.placeItem({ item: 'bad' })).to.throw(Field.ERROR_PLACEITEM_INVALID_ITEM.message);
		});
		it('should throw error if position is not ItemPosition', () => {
			const item = new BaseGameItem();
			expect(() => field.placeItem({ item, position: 'bad' })).to.throw(Field.ERROR_PLACEITEM_INVALID_POSITION.message);
		});
		it('should throw error if position is not specified, and default position is not valid', () => {
			const item = new BaseGameItem();
			expect(() => field.placeItem({ item })).to.throw(Field.ERROR_PLACEITEM_INVALID_POSITION.message);
		});
		it('should throw error item is a Road', () => {
			const item = new Road({ type: RoadType.CORNER_BOTTOM_LEFT });
			const position = new ItemPosition({ x: 1, y: 2 });
			expect(() => field.placeItem({ item, position })).to.throw(Field.ERROR_PLACEITEM_CANNOT_PLACE_ROAD.message);
		});
		it('should place the item', () => {
			const item = new BaseGameItem();
			const position = new ItemPosition({ x: 1, y: 2 });
			field.placeItem({ item, position });
			const returnedItem = field.getItemByPosition(new ItemPosition({ x: 1, y: 2 }));
			expect(returnedItem).to.equal(item);
		});
	});

	describe('getItemByPosition', () => {
		let field;
		beforeEach( () => {
			field = new Field();
		});
		it('should throw error if position is not ItemPosition', () => {
			expect(() => field.getItemByPosition('bad')).to.throw(Field.ERROR_GETITEMBYPOSITION_INVALID_POSITION.message);
		});
		it('should retrieve the item', () => {
			const item = new BaseGameItem();
			const position = new ItemPosition({ x: 1, y: 2 });
			field.placeItem({ item, position });
			const returnedItem = field.getItemByPosition(new ItemPosition({ x: 1, y: 2 }));
			expect(returnedItem).to.equal(item);
		});
	});

	describe('removeItem', () => {
		let field;
		beforeEach( () => {
			field = new Field();
		});
		it('should throw error if item is not a BaseGameItem', () => {
			expect(() => field.removeItem({ item: 'bad' })).to.throw(Field.ERROR_REMOVEITEM_INVALID_ITEM.message);
		});
		it('should remove the item', () => {
			const item = new BaseGameItem();
			const position = new ItemPosition({ x: 1, y: 2 });
			field.placeItem({ item, position });
			field.removeItem(item);
			const returnedItem = field.getItemByPosition(new ItemPosition({ x: 1, y: 2 }));
			expect(returnedItem).to.be.null;
		});
	});

	xdescribe('placeRoad', () => {

	});
});