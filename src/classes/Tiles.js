import Tile from "./Tile.js";
import RoadDirection from "./types/RoadDirection.js";
import Pos from "./Pos.js";
import RoadType from "./types/RoadType.js";

export default class Tiles {
	#tilesByPosition = new Map();
	#tilesById = new Map();
	#openTiles = [];

	get size() {
		return this.#tilesByPosition.size;
	}

	addTile(tile) {
		if (!(tile instanceof Tile)) throw new Error(`'tile' must be a Tile class.`);
		const { position, id } = tile;
		if (this.#tilesByPosition.has(position.toString())) throw new Error(`'position' is already occupied.`);
		this.#tilesByPosition.set(position.toString(), tile);
		this.#tilesById.set(id, tile);
		this.#openTiles.push(tile);
		return tile;
	}

	getNextLegalTiles(tile) {
		const { position, roadType } = tile;
		const legalTiles = [];
		[...RoadDirection.ROAD_DIRECTIONS].forEach((direction) => {
			if ((roadType.value & direction.value) !== 0) {
				const newPosition = new Pos({ x: position.x + direction.x, y: position.y + direction.y });
				console.log(`---------getting legal ${roadType.value} (${position.toString()}), ${direction.value} at ${newPosition.toString()}-------------------`);
				const legalRoadTypes = this.#processNextLegalTiles(position, newPosition, roadType, direction);
				if (legalRoadTypes.length) {
					console.log(`    length = ${legalRoadTypes.length}`);
					legalTiles.push({ position: newPosition, direction, legalRoadTypes });
				}
			}
		});
		return legalTiles;
	}

	#processNextLegalTiles(currentPosition, newPosition, roadType, direction) {
		if (this.#tilesByPosition.has(newPosition.toString())) {
			return [];
		}
		// console.log('here');
		const oppositeDirection = RoadDirection.getOpposite(direction);
		let roadsFiltered = [...RoadType.ROAD_TYPES].filter((roadType) => roadType.value & oppositeDirection.value && roadType.value !== oppositeDirection.value);
		// console.log('start');
		// console.log([...roadsFiltered]);
		// check the four possible positions for a tile
		[...RoadDirection.ROAD_DIRECTIONS].forEach((checkDirection) => {
			const checkPosition = new Pos({ x: newPosition.x + checkDirection.x, y: newPosition.y + checkDirection.y });
			// console.log('checking = ', checkDirection.value, checkPosition.toString(), this.#tilesByPosition.has(checkPosition.toString()));
			if (!checkPosition.is(currentPosition)) {
				if (this.#tilesByPosition.has(checkPosition.toString())) {
					// console.log('before');
					roadsFiltered = roadsFiltered.filter((roadType) => {
						// console.log(`=======${roadType.value}, ${checkDirection.value}, ${(roadType.value & checkDirection.value)}`)
						return (roadType.value & checkDirection.value) === 0;
					});
					// console.log([...roadsFiltered]);
					// console.log('after');
				}
			}
		});
		// console.log([...roadsFiltered]);
		return roadsFiltered;
	}
}