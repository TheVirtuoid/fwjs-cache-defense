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

	describe('getXY', () => {
		let field;
		const boardWidth = 800;
		const boardHeight = 600;
		const tileWidth = 16;
		const tileHeight = 16;
		const tileWidthHalf = tileWidth / 2;
		const tileHeightHalf = tileHeight / 2;

		beforeEach(() => {
			field = new Field({ boardSize: new Dim({ width: boardWidth, height: boardHeight }),
				tileSize: new Dim({ width: tileWidth, height: tileHeight })
			});
		});
		it('should throw error if x is not a property', () => {
			expect(() => field.getXY({ y: 0 })).to.throw(`'x' must be a property.`);
		});
		it('should throw error if y is not a property', () => {
			expect(() => field.getXY({ x: 0 })).to.throw(`'y' must be a property.`);
		});
		it('should throw error if x is not an integer', () => {
			expect(() => field.getXY({ x: '0', y: 0 })).to.throw(`'x' must be an integer.`);
			expect(() => field.getXY({ x: 0.5, y: 0 })).to.throw(`'x' must be an integer.`);
		});
		it('should throw error if y is not an integer', () => {
			expect(() => field.getXY({ x: 0, y: '0' })).to.throw(`'y' must be an integer.`);
			expect(() => field.getXY({ x: 0, y: 0.5 })).to.throw(`'y' must be an integer.`);
		});
		it(`should return ${tileWidthHalf},${tileHeightHalf}`, () => {
			expect(field.getXY({ x: 0, y: 0 })).to.deep.equal({ x: tileWidthHalf, y: tileHeightHalf });
		});
		it(`should return ${tileWidthHalf + tileWidth},${tileHeightHalf + tileHeight * 5}`, () => {
			expect(field.getXY({ x: 1, y: 5 })).to.deep.equal({ x: tileWidthHalf + tileWidth, y: tileHeightHalf + tileHeight * 5 });
		});
		it('should throw error as X is negative', () => {
			expect(() => field.getXY({ x: -1, y: 0 })).to.throw(`'x' is out of range.`);
		});
		it('should throw error as Y is negative', () => {
			expect(() => field.getXY({ x: 0, y: -1 })).to.throw(`'y' is out of range.`);
		});
		it('should throw error as X is too large', () => {
			expect(() => field.getXY({ x: 100, y: 0 })).to.throw(`'x' is out of range.`);
		});
		it('should throw error as Y is too large', () => {
			expect(() => field.getXY({ x: 0, y: 100 })).to.throw(`'y' is out of range.`);
		});
	});
});