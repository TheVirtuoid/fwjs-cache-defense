import Field from "../../src/classes/Field.js";
import Dim from "../../src/classes/Dim.js";

describe('field', () => {
	describe('create', () => {
		it('should throw error if boardSize is not a property', () => {
			expect(() => new Field({ tileSize: new Dim({ width: 0, height: 0 }) })).to.throw(`'boardSize' must be a property.`);
		});
		it('should throw error if tileSize is not a property', () => {
			expect(() => new Field({ boardSize: new Dim({ width: 0, height: 0 }) })).to.throw(`'tileSize' must be a property.`);
		});
		it('should throw error if boardSize is not a Dim class', () => {
			expect(() => new Field({ boardSize: 0, tileSize: new Dim({ width: 0, height: 0 }) })).to.throw(`'boardSize' must be a Dim class.`);
		});
		it('should throw error if tileSize is not a Dim class', () => {
			expect(() => new Field({ boardSize: new Dim({ width: 0, height: 0 }), tileSize: 0 })).to.throw(`'tileSize' must be a Dim class.`);
		});
		it('should create the field object', () => {
			const field = new Field({ boardSize: new Dim({ width: 0, height: 0 }), tileSize: new Dim({ width: 0, height: 0 }) });
			expect(field).to.be.instanceOf(Field);
		});
	});

	describe('getXYfromTile', () => {
		it('should throw error if x is not a property', () => {});
		it('should throw error if y is not a property', () => {});
		it('should throw error if x is not an integer', () => {});
		it('should throw error if y is not an integer', () => {});
		it('should return 0,0', () => {});
	});
});