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

	describe('getSubXY', () => {
		let field;
		const boardWidth = 800;
		const boardHeight = 600;
		const tileWidth = 16;
		const tileHeight = 16;
		const subDivisions = 3;
		const tileWidthHalf = tileWidth / 2;
		const tileHeightHalf = tileHeight / 2;
		const subXWidth = tileWidth / subDivisions;
		const subYHeight = tileHeight / subDivisions;

		beforeEach(() => {
			field = new Field({ boardSize: new Dim({ width: boardWidth, height: boardHeight }),
				tileSize: new Dim({ width: tileWidth, height: tileHeight })
			});
		});
		it('should throw error if x is not a property', () => {
			expect(() => field.getSubXY({ y: 0, subX: 0, subY: 0 })).to.throw(`'x' must be a property.`);
		});
		it('should throw error if y is not a property', () => {
			expect(() => field.getSubXY({ x: 0, subX: 0, subY: 0 })).to.throw(`'y' must be a property.`);
		});
		it('should throw error if x is not an integer', () => {
			expect(() => field.getSubXY({ x: '0', y: 0, subX: 0, subY: 0 })).to.throw(`'x' must be an integer.`);
			expect(() => field.getSubXY({ x: 0.5, y: 0, subX: 0, subY: 0 })).to.throw(`'x' must be an integer.`);
		});
		it('should throw error if y is not an integer', () => {
			expect(() => field.getSubXY({ x: 0, y: '0', subX: 0, subY: 0 })).to.throw(`'y' must be an integer.`);
			expect(() => field.getSubXY({ x: 0, y: 0.5, subX: 0, subY: 0 })).to.throw(`'y' must be an integer.`);
		});

		it('should throw error if subX is not a property', () => {
			expect(() => field.getSubXY({ x: 0, y: 0, subY: 0 })).to.throw(`'subX' must be a property.`);
		});
		it('should throw error if subY is not a property', () => {
			expect(() => field.getSubXY({ x: 0, y: 0, subX: 0 })).to.throw(`'subY' must be a property.`);
		});
		it('should throw error if subX is not an integer', () => {
			expect(() => field.getSubXY({ x: 0, y: 0, subX: '0', subY: 0 })).to.throw(`'subX' must be an integer.`);
			expect(() => field.getSubXY({ x: 0, y: 0, subX: 0.5, subY: 0 })).to.throw(`'subX' must be an integer.`);
		});
		it('should throw error if subY is not an integer', () => {
			expect(() => field.getSubXY({ x: 0, y: 0, subX: 0, subY: '0' })).to.throw(`'subY' must be an integer.`);
			expect(() => field.getSubXY({ x: 0, y: 0, subX: 0, subY: 0.5 })).to.throw(`'subY' must be an integer.`);
		});


		it(`should return ${Math.floor(tileWidthHalf - subXWidth)},${Math.floor(tileHeightHalf - subYHeight)}`, () => {
			expect(field.getSubXY({ x: 0, y: 0, subX: 0, subY: 0 })).to.deep.equal({ x: Math.floor(tileWidthHalf - subXWidth), y: Math.floor(tileHeightHalf - subYHeight) });
		});
		it(`should return ${Math.floor(tileWidthHalf)},${Math.floor(tileHeightHalf + subYHeight)}`, () => {
			expect(field.getSubXY({ x: 0, y: 0, subX: 1, subY: 2 })).to.deep.equal({ x: Math.floor(tileWidthHalf), y: Math.floor(tileHeightHalf + subYHeight) });
		});

		it('should throw error as X is negative', () => {
			expect(() => field.getSubXY({ x: -1, y: 0, subX: 0, subY: 0 })).to.throw(`'x or subX' is out of range.`);
			expect(() => field.getSubXY({ x: 0, y: 0, subX: -1, subY: 0 })).to.throw(`'x or subX' is out of range.`);
		});
		it('should throw error as Y is negative', () => {
			expect(() => field.getSubXY({ x: 0, y: -1, subX: 0, subY: 0 })).to.throw(`'y or subY' is out of range.`);
			expect(() => field.getSubXY({ x: 0, y: 0, subX: 0, subY: -1 })).to.throw(`'y or subY' is out of range.`);
		});
		it('should throw error as X is too large', () => {
			expect(() => field.getSubXY({ x: 100, y: 0, subX: 0, subY: 0 })).to.throw(`'x or subX' is out of range.`);
			expect(() => field.getSubXY({ x: 0, y: 0, subX: 100, subY: 0 })).to.throw(`'x or subX' is out of range.`);
		});
		it('should throw error as Y is too large', () => {
			expect(() => field.getSubXY({ x: 0, y: 100, subX: 0, subY: 0 })).to.throw(`'y or subY' is out of range.`);
			expect(() => field.getSubXY({ x: 0, y: 0, subX: 0, subY: 100 })).to.throw(`'y or subY' is out of range.`);
		});
	});
});