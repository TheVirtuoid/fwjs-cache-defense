import BoardController from "../../../src/classes/controllers/BoardController.js";
import BaseGameItem from "../../../src/classes/BaseGameItem.js";
import ItemPosition from "../../../src/classes/ItemPosition.js";
import Field from "../../../src/classes/Field.js";

/*

		The board controller will receive messages from the Game object
		that something needs to be updated.

 */

describe('BoardController object', () => {

	describe('creation', () => {
		it('should create the object', () => {
			const boardController = new BoardController();
			expect(boardController instanceof BoardController).to.be.true;
		});
		it('should initialize the variables', () => {
			const boardController = new BoardController({ graphicsEngine: 'test'});
			expect(boardController.field).to.be.null;
			expect(boardController.graphicsEngine).to.not.be.null;
		});
	});

	describe ('new board', () => {
		let boardController;
		beforeEach( () => {
			boardController = new BoardController();
			boardController.newBoard();
		});

		it('should create a field', () => {
			expect(boardController.field).to.be.instanceof(Field);
		});
	});

	describe('insert an item', () => {
		let boardController;
		beforeEach( () => {
			boardController = new BoardController();
			boardController.newBoard();
		});

		it('should throw error is item is not a BaseGameItem', () => {
			expect( () => boardController.insertItem()).to.throw(BoardController.ERROR_INSERTITEM_WRONGITEM.message);
		});

		it('should throw error if position is not ItemPosition', () => {
			const item = new BaseGameItem();
			expect( () => boardController.insertItem(item)).to.throw(BoardController.ERROR_INSERTITEM_WRONGPOSITION.message);
		});

		it('should throw error if duplicate id', () => {
			const item = new BaseGameItem({ id: 'test' });
			const position = new ItemPosition({ x: 0, y: 0 });
			boardController.insertItem(item, position);
			const badItem = new BaseGameItem({ id: 'test' });
			expect(() => boardController.insertItem(badItem, position)).to.throw(BoardController.ERROR_INSERTITEM_DUPLICATEID.message);
		});

		it('should insert an item on the field', () => {
			const item = new BaseGameItem();
			const itemPosition = new ItemPosition({ x: 0, y: 0 });
			boardController.insertItem(item, itemPosition);
			const returnedItem = boardController.getItem(item.id);
			expect(returnedItem.position.x).to.equal(itemPosition.x);
			expect(returnedItem.position.y).to.equal(itemPosition.y);
		});
	});

	describe('getItem', () => {
		let boardController;
		let item;
		beforeEach( () => {
			boardController = new BoardController();
			boardController.newBoard();
			item = new BaseGameItem();
			boardController.insertItem(item, new ItemPosition({ x: 0, y: 0 }));
		});

		it('should throw error if argument is not defined', () => {
			expect( () => boardController.getItem()).to.throw(BoardController.ERROR_GETITEM_UNDEFINED_ID.message);
		});

		it('should return null if the item cannot be found', () => {
			const foundItem = boardController.getItem('bad');
			expect(foundItem).to.be.null;
		});

		it('should find the item', () => {
			const foundItem = boardController.getItem(item.id);
			expect(foundItem).to.equal(item);
		});
	});

	describe('remove an item', () => {
		let boardController;
		let item;
		let position;
		beforeEach(() => {
			boardController = new BoardController();
			boardController.newBoard();
			item = new BaseGameItem();
			position = new ItemPosition({ x: 0, y: 0 });
			boardController.insertItem(item, position);
		});

		it('should throw error if item is not a BaseGameItem', () => {
			expect( () => boardController.removeItem()).to.throw(BoardController.ERROR_REMOVEITEM_INVALID_ARG.message);
		});

		it('should return false if item cannot be found', () => {
			const missingItem = new BaseGameItem();
			expect(boardController.removeItem(missingItem)).to.be.false;
		});

		it('should remove an item from the field', () => {
			console.log(item);
			expect(boardController.removeItem(item)).to.be.true;
		});
	});

	describe('getItemsByPosition', () => {
		let boardController;
		beforeEach(() => {
			boardController = new BoardController();
			boardController.newBoard();
		});
		it('should throw error if position is not ItemPosition', () => {
			expect( () => boardController.getItemsByPosition()).to.throw(BoardController.ERROR_GETITEMSBYPOSITION_ARGUMENT_NOT_POSITION.message);
		});
		it('should return an empty array if no items are found', () => {
			const position = new ItemPosition();
			expect(boardController.getItemsByPosition(position)).to.be.an('array').that.is.empty;
		});
		it('should return an array of items', () => {
			boardController.insertItem(new BaseGameItem(), new ItemPosition({ x: 0, y: 0 }));
			boardController.insertItem(new BaseGameItem(), new ItemPosition({ x: 0, y: 0 }));
			boardController.insertItem(new BaseGameItem(), new ItemPosition({ x: 0, y: 1 }));
			expect(boardController.getItemsByPosition(new ItemPosition({ x: 0, y: 0 }))).to.be.an('array').that.has.lengthOf(2);
			expect(boardController.getItemsByPosition(new ItemPosition({ x: 0, y: 1 }))).to.be.an('array').that.has.lengthOf(1);
		});
		it('should return an updated array after removal', () => {
			const item = new BaseGameItem()
			boardController.insertItem(item, new ItemPosition({ x: 0, y: 0 }));
			boardController.removeItem(item)
			expect(boardController.getItemsByPosition(new ItemPosition({ x: 0, y: 0 }))).to.be.an('array').that.has.lengthOf(0);
		});
	});

});