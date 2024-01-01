import Tiles from "../../src/classes/Tiles.js";
import RoadType from "../../src/classes/types/RoadType.js";
import Pos from "../../src/classes/Pos.js";
import Tile from "../../src/classes/Tile.js";
import RoadDirection from "../../src/classes/types/RoadDirection.js";

const getLegalValues = (legalRoadTypes) => {
	return legalRoadTypes.map((roadType) => roadType.value);
}

const arrayCompare = (array1, array2) => {
	if (array1.length !== array2.length) return false;
	for (let i = 0; i < array1.length; i++) {
		if (!array2.includes(array1[i])) return false;
	}
	return true;
};
describe('tiles', () => {
	describe('creation', () => {
		it('should create the class', () => {
			const tiles = new Tiles();
			expect(tiles).to.be.instanceOf(Tiles);
		});
		it('should have a size of zero', () => {
			const tiles = new Tiles();
			expect(tiles.size).to.equal(0);
		});
	});
	describe('add tile at position', () => {
		let tile;
		let tiles;
		beforeEach(() => {
			tiles = new Tiles();
			tile = new Tile({ id: 'test', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 5, y: 5 }) });
		});
		it('should throw error if tile not Tile class', () => {
			expect(() => tiles.addTile('')).to.throw(`'tile' must be a Tile class.`);
		});
		it('should throw error if position already occupied', () => {
			tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 5, y: 5 }) }));
			expect(() => tiles.addTile(tile)).to.throw(`'position' is already occupied.`)
		});
		it('should add tile and return a Tile', () => {
			const newTile = tiles.addTile(tile);
			expect(newTile).to.be.instanceOf(Tile);
			expect(tiles.size).to.equal(1);
		});
	});

	describe('getNextLegalTiles', () => {
		describe('processing HALF_TOP', () => {
			let tiles;
			let tile;
			beforeEach(() => {
				tiles = new Tiles();
				tile = new Tile({ id: 'test', roadType: RoadType.HALF_TOP, position: new Pos({ x: 5, y: 5 }) });
				tiles.addTile(tile);
			});
			it('NO TILES: returns 6 values', () => {
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 5, y: 4 }));
				expect(direction).to.equal(RoadDirection.TOP);
				expect(arrayCompare(legalValues, [5, 6, 7, 12, 13, 14])).to.be.true;
			});
			xit('TILE LEFT: returns 3 values', () => {
				tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 4, y: 4 }) }));
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 5, y: 4 }));
				expect(direction).to.equal(RoadDirection.TOP);
				expect(arrayCompare(legalValues, [5, 6, 7])).to.be.true;
			});
			xit('TILE TOP: returns 3 values', () => {
				tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 5, y: 3 }) }));
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 5, y: 4 }));
				expect(direction).to.equal(RoadDirection.TOP);
				expect(arrayCompare(legalValues, [6, 12, 14])).to.be.true;
			});
			xit('TILE RIGHT: returns 3 values', () => {
				tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 6, y: 4 }) }));
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 5, y: 4 }));
				expect(direction).to.equal(RoadDirection.TOP);
				expect(arrayCompare(legalValues, [5, 12, 13])).to.be.true;
			});
		});

		xdescribe('processing HALF_RIGHT', () => {
			let tiles;
			let tile;
			beforeEach(() => {
				tiles = new Tiles();
				tile = new Tile({ id: 'test', roadType: RoadType.HALF_RIGHT, position: new Pos({ x: 5, y: 5 }) });
			});
			it('NO TILES: returns 6 values', () => {
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 6, y: 5 }));
				expect(direction).to.equal(RoadDirection.RIGHT);
				expect(arrayCompare(legalValues, [9, 10, 11, 12, 13, 14])).to.be.true;
			});
			it('TILE TOP: returns 3 values', () => {
				tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 6, y: 4 }) }));
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 6, y: 5 }));
				expect(direction).to.equal(RoadDirection.RIGHT);
				expect(arrayCompare(legalValues, [10, 12, 14])).to.be.true;
			});
			it('TILE RIGHT: returns 3 values', () => {
				tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 7, y: 5 }) }));
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 6, y: 5 }));
				expect(direction).to.equal(RoadDirection.RIGHT);
				expect(arrayCompare(legalValues, [9, 12, 13])).to.be.true;
			});
			it('TILE BOTTOM: returns 3 values', () => {
				tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 6, y: 6 }) }));
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 6, y: 5 }));
				expect(direction).to.equal(RoadDirection.RIGHT);
				expect(arrayCompare(legalValues, [9, 10, 11])).to.be.true;
			});
		});

		xdescribe('processing HALF_BOTTOM', () => {
			let tiles;
			let tile;
			beforeEach(() => {
				tiles = new Tiles();
				tile = new Tile({ id: 'test', roadType: RoadType.HALF_BOTTOM, position: new Pos({ x: 5, y: 5 }) });
			});
			it('NO TILES: returns 6 values', () => {
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 5, y: 6 }));
				expect(direction).to.equal(RoadDirection.BOTTOM);
				expect(arrayCompare(legalValues, [3, 5, 7, 9, 11, 13])).to.be.true;
			});
			it('TILE RIGHT: returns 3 values', () => {
				tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 6, y: 6 }) }));
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 5, y: 6 }));
				expect(direction).to.equal(RoadDirection.BOTTOM);
				expect(arrayCompare(legalValues, [5, 9, 13])).to.be.true;
			});
			it('TILE BOTTOM: returns 3 values', () => {
				tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 5, y: 7 }) }));
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 5, y: 6 }));
				expect(direction).to.equal(RoadDirection.BOTTOM);
				expect(arrayCompare(legalValues, [3, 9, 11])).to.be.true;
			});
			it('TILE LEFT: returns 3 values', () => {
				tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 4, y: 6 }) }));
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 5, y: 6 }));
				expect(direction).to.equal(RoadDirection.BOTTOM);
				expect(arrayCompare(legalValues, [3, 5, 7])).to.be.true;
			});
		});

		xdescribe('processing HALF_LEFT', () => {
			let tiles;
			let tile;
			beforeEach(() => {
				tiles = new Tiles();
				tile = new Tile({ id: 'test', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 5, y: 5 }) });
			});
			it('NO TILES: returns 6 values', () => {
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 4, y: 5 }));
				expect(direction).to.equal(RoadDirection.LEFT);
				expect(arrayCompare(legalValues, [3, 6, 7, 10, 11, 14])).to.be.true;
			});
			it('TILE TOP: returns 3 values', () => {
				tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 4, y: 4 }) }));
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 4, y: 5 }));
				expect(direction).to.equal(RoadDirection.LEFT);
				expect(arrayCompare(legalValues, [6, 10, 14])).to.be.true;
			});
			it('TILE BOTTOM: returns 3 values', () => {
				tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 4, y: 6 }) }));
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 4, y: 5 }));
				expect(direction).to.equal(RoadDirection.LEFT);
				expect(arrayCompare(legalValues, [3, 10, 11])).to.be.true;
			});
			it('TILE LEFT: returns 3 values', () => {
				tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 3, y: 5 }) }));
				const legalTiles = tiles.getNextLegalTiles(tile);
				expect(legalTiles.length).to.equal(1);
				const { position, direction, legalRoadTypes } = legalTiles[0];
				const legalValues = getLegalValues(legalRoadTypes);
				expect(position).to.deep.equal(new Pos({ x: 4, y: 5 }));
				expect(direction).to.equal(RoadDirection.LEFT);
				expect(arrayCompare(legalValues, [3, 6, 7])).to.be.true;
			});
		});
	});

	xdescribe('processing T-LEFT-RIGHT-BOTTOM', () => {
		let tiles;
		let tile;
		beforeEach(() => {
			tiles = new Tiles();
			tile = new Tile({ id: 'test', roadType: RoadType.T_LEFT_RIGHT_BOTTOM, position: new Pos({ x: 5, y: 5 }) });
		});
		it('NO TILES: returns 6 values', () => {
			const legalTiles = tiles.getNextLegalTiles(tile);
			expect(legalTiles.length).to.equal(1);
			const { position, direction, legalRoadTypes } = legalTiles[0];
			const legalValues = getLegalValues(legalRoadTypes);
			expect(position).to.deep.equal(new Pos({ x: 4, y: 5 }));
			expect(direction).to.equal(RoadDirection.LEFT);
			expect(arrayCompare(legalValues, [3, 6, 7, 10, 11, 14])).to.be.true;
		});
		it('TILE TOP: returns 3 values', () => {
			tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 4, y: 4 }) }));
			const legalTiles = tiles.getNextLegalTiles(tile);
			expect(legalTiles.length).to.equal(1);
			const { position, direction, legalRoadTypes } = legalTiles[0];
			const legalValues = getLegalValues(legalRoadTypes);
			expect(position).to.deep.equal(new Pos({ x: 4, y: 5 }));
			expect(direction).to.equal(RoadDirection.LEFT);
			expect(arrayCompare(legalValues, [6, 10, 14])).to.be.true;
		});
		it('TILE BOTTOM: returns 3 values', () => {
			tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 4, y: 6 }) }));
			const legalTiles = tiles.getNextLegalTiles(tile);
			expect(legalTiles.length).to.equal(1);
			const { position, direction, legalRoadTypes } = legalTiles[0];
			const legalValues = getLegalValues(legalRoadTypes);
			expect(position).to.deep.equal(new Pos({ x: 4, y: 5 }));
			expect(direction).to.equal(RoadDirection.LEFT);
			expect(arrayCompare(legalValues, [3, 10, 11])).to.be.true;
		});
		it('TILE LEFT: returns 3 values', () => {
			tiles.addTile(new Tile({ id: 'test1', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 3, y: 5 }) }));
			const legalTiles = tiles.getNextLegalTiles(tile);
			expect(legalTiles.length).to.equal(1);
			const { position, direction, legalRoadTypes } = legalTiles[0];
			const legalValues = getLegalValues(legalRoadTypes);
			expect(position).to.deep.equal(new Pos({ x: 4, y: 5 }));
			expect(direction).to.equal(RoadDirection.LEFT);
			expect(arrayCompare(legalValues, [3, 6, 7])).to.be.true;
		});
	});

	/*describe('addNextTile', () => {
		describe('return value', () => {
			let tiles;
			let tile;
			beforeEach(() => {
				tiles = new Tiles();
				tile = new Tile({ id: 'test', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 5, y: 5 }) });
			});
			it('should return a Tile', () => {
				const newTile = tiles.addNextTile();
				expect(newTile).to.be.instanceOf(Tile);
			});
		});


	});*/
});