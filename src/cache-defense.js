import cacheDefenseConfig from "./cache-defense-config.js";
import GameScene from "./classes/inGame/graphicEngines/phaser/GameScene.js";
import Tile from "./classes/Tile.js";
import RoadType from "./classes/types/RoadType.js";
import Pos from "./classes/Pos.js";
import Item from "./classes/Item.js";
import ItemType from "./classes/types/ItemType.js";
import RoadDirection from "./classes/types/RoadDirection.js";
import Tiles from "./classes/Tiles.js";

const phaserConfig = cacheDefenseConfig.graphics.engineSettings.phaser;
phaserConfig.scene = GameScene;


const startingPosition = new Pos({ x: 5, y: 5 });
const startingTile = new Tile({ id: 'start', roadType: RoadType.HALF_LEFT, position: startingPosition });

let alien;
let scene;
const speed = .5;

const tiles = new Tiles();

/*const tiles = new Map();
const tilesById = new Map();*/
let openTiles = [];

let openTilePosition = new Pos({ x: 5, y: 5 });
let openTileDirection = RoadDirection.LEFT;

document.getElementById('next-tile').addEventListener('click', () => {
	const addedTiles = [];
	while (openTiles.length) {
		const tile = openTiles.shift();
		const possibleTiles = tiles.getNextLegalTiles(tile);
		console.log(`---possible roads length = ${possibleTiles.length}`);
		possibleTiles.forEach((possibleTile) => {
			const { legalRoadTypes, position } = possibleTile;
			if (legalRoadTypes.length) {
				const whichRoad = Math.floor(Math.random() * legalRoadTypes.length);
				const newRoad = new Tile({ id: position.toString(), roadType: legalRoadTypes[whichRoad], position });
				addedTiles.push(addTile(newRoad));
			}
		});
		// console.log(possibleRoads);
		/*const openDirections = [];
		if (tile.roadType.value & RoadDirection.TOP.value) openDirections.push(RoadDirection.TOP);
		if (tile.roadType.value & RoadDirection.RIGHT.value) openDirections.push(RoadDirection.RIGHT);
		if (tile.roadType.value & RoadDirection.BOTTOM.value) openDirections.push(RoadDirection.BOTTOM);
		if (tile.roadType.value & RoadDirection.LEFT.value) openDirections.push(RoadDirection.LEFT);
		openDirections.forEach((direction) => {
			const nextPosition = tile.getNextPosition(direction);
			if (!tiles.get(nextPosition.toString())) {
				addedTiles.push(addNextTile(tile.position, direction));
			}
		});*/
	}
	openTiles = addedTiles;
});

/*const addNextTile = (tilePosition, tileDirection) => {
	const openTile = tiles.get(tilePosition.toString());
	const openDirection = tileDirection;

	const nextPosition = openTile.getNextPosition(openDirection);

	// determine which road types are legal. These road types must have the opposite of openDirection as one of their paths
	const oppositeDirection = RoadDirection.getOpposite(openDirection);
	const validRoadTypes =
			[...RoadType.ROAD_TYPES].filter((roadType) => roadType.value & oppositeDirection.value && roadType.value !== oppositeDirection.value);
	// console.log(validRoadTypes);
	const whichRoad = Math.floor(Math.random() * validRoadTypes.length);
	const newRoad = new Tile({ id: 'test', roadType: validRoadTypes[whichRoad], position: nextPosition });
	return addTile(newRoad);
}*/

const waitForGameReady = (game) => {
	let counter = 500;
	let waitForIt = null;
	const sceneManager = game.scene;
	return new Promise((resolve, reject) => {
		const readyCheck = () => {
			const scene = sceneManager.getScenes()[0];
			if (scene?.ready) {
				clearInterval(waitForIt);
				resolve(game);
			} else {
				counter--;
				if (counter === 0) {
					clearInterval(waitForIt);
					reject('Game not ready');
				}
			}
		};
		waitForIt = setInterval(readyCheck, 10);
	});
};

const updateCallback = () => {
	// processMonsterMovement(alien);
}

const processMonsterMovement = (monster) => {
	if (monster.finished) {
		return;
	}
	let nextPoint = false;
	if (monster.movementStep === -1) {
		monster.movementStep = 0;
		monster.direction = monster.victoryPath[monster.movementStep].direction;
		monster.position = monster.victoryPath[monster.movementStep].position;
		monster.subPosition = monster.victoryPath[monster.movementStep].subPosition;
		scene.moveItem(monster);
		monster.movementStep = 1;
		const stopPosition = monster.victoryPath[monster.movementStep].position;
		const stopSubPosition = monster.victoryPath[monster.movementStep].subPosition;
		const stop = scene.getSubXY({ x: stopPosition.x, y: stopPosition.y, subX: stopSubPosition.x, subY: stopSubPosition.y });
		monster.breakPoint = {
			direction: monster.victoryPath[monster.movementStep].direction || monster.direction,
			stop
		}
	}
	switch(monster.direction) {
		case RoadDirection.TOP:
			if (monster.image.y > monster.breakPoint.stop.y) monster.image.y += monster.direction.speed.y * speed;
			else nextPoint = true;
			break;
		case RoadDirection.RIGHT:
			if (monster.image.x < monster.breakPoint.stop.x) monster.image.x += monster.direction.speed.x * speed;
			else nextPoint = true;
			break;
		case RoadDirection.BOTTOM:
			if (monster.image.y < monster.breakPoint.stop.y) monster.image.y += monster.direction.speed.y * speed;
			else nextPoint = true;
			break;
		case RoadDirection.LEFT:
			if (monster.image.x > monster.breakPoint.stop.x) monster.image.x += monster.direction.speed.x * speed;
			else nextPoint = true;
			break;
	}
	if (nextPoint) {
		monster.image.x = monster.breakPoint.stop.x;
		monster.image.y = monster.breakPoint.stop.y;
		monster.movementStep++;
		const path = monster.victoryPath[monster.movementStep];
		if (path.position === null) {
			monster.finished = true;
		} else {
			monster.direction = path.direction || monster.direction;
			const stopPosition = path.position;
			const stopSubPosition = monster.victoryPath[monster.movementStep].subPosition;
			const stop = scene.getSubXY({ x: stopPosition.x, y: stopPosition.y, subX: stopSubPosition.x, subY: stopSubPosition.y });
			monster.breakPoint = {
				direction: monster.victoryPath[monster.movementStep].direction || monster.direction,
				stop
			}
		}
	}
}

const addTile = (tile) => {
	const { roadType, position } = tile;
	tiles.addTile(tile);
	tile.image = scene.addImage(roadType.graphics, position.x, position.y);
	return tile;
}

const addItem = (item, tile, subPosition) => {
	tile.addItem({ item, subPosition });
	item.image = scene.addImage(item.type.graphics, tile.position.x, tile.position.y, subPosition.x, subPosition.y);
	return item;
}

const continueGame = (game) => {
	console.log('continuing Game');
	try {
		scene = game.scene.getScenes()[0];
		addTile(startingTile);
		openTiles.push(startingTile);
		const cache = new Item({ id: 'cache', type: ItemType.CACHE.BASE });
		addItem(cache, startingTile, new Pos({ x: 1, y: 1 }));




		/*scene = game.scene.getScenes()[0];
		scene.updateCallback = updateCallback;

		const centerTile = new Tile({ id: '5-5', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 5, y: 5 }) });
		scene.addTile(centerTile);
		const cache = new Item({ id: 'cache', type: ItemType.CACHE.BASE });
		scene.addItem(cache, centerTile, new Pos({ x: 1, y: 1 }));

		const tile4_5 = new Tile({ id: '4-5', roadType: RoadType.CORNER_TOP_RIGHT, position: new Pos({ x: 4, y: 5 }) });
		const tile4_4 = new Tile({ id: '4-4', roadType: RoadType.CORNER_BOTTOM_RIGHT, position: new Pos({ x: 4, y: 4 }) });
		const tile5_4 = new Tile({ id: '5-4', roadType: RoadType.STRAIGHT_LEFT_RIGHT, position: new Pos({ x: 5, y: 4 }) });
		const tile6_4 = new Tile({ id: '6-4', roadType: RoadType.STRAIGHT_LEFT_RIGHT, position: new Pos({ x: 6, y: 4 }) });


		scene.addTile(tile4_5);
		scene.addTile(tile4_4);
		scene.addTile(tile5_4);
		scene.addTile(tile6_4);

		scene.addItem(
				new Item({ id: 'ws1', type: ItemType.WEAPON.SHOOTER }),
				centerTile,
				new Pos({ x: 0, y: 0 })
		);
		scene.addItem(
				new Item({ id: 'ws2', type: ItemType.WEAPON.SHOOTER }),
				tile4_4,
				new Pos({ x: 2, y: 2 })
		);
		alien = scene.addItem(
				new Item({ id: 'alien', type: ItemType.MONSTER.ALIEN }),
				tile6_4,
				new Pos({ x: 2, y: 1 })
		);
		scene.anims.create({
			key: 'alien-walk',
			frames: scene.anims.generateFrameNumbers(alien.type.graphics.key, { frames: [0, 1, 2, 1] }),
			frameRate: 4,
			repeat: -1
		});
		alien.image.anims.play('alien-walk', true);
		alien.direction = RoadDirection.LEFT;
		alien.victoryPath = [
			{ direction: RoadDirection.LEFT, position: new Pos({ x: 6, y: 4 }), subPosition: new Pos({ x:2, y: 1 })},
			{ position: new Pos({ x: 4, y: 4 }), subPosition: new Pos({ x:1, y: 1 })},
			{ direction: RoadDirection.BOTTOM, position: new Pos({ x: 4, y: 5 }), subPosition: new Pos({ x:1, y: 1 })},
			{ direction: RoadDirection.RIGHT, position: new Pos({ x: 5, y: 4 }), subPosition: new Pos({ x:1, y: 1 })},
			{ position: null }
		];
		alien.movementStep = -1;*/
		return Promise.resolve();
	} catch (e) {
		console.log(e);
		return Promise.reject(e);
	}
};

const errorGame = (error) => {
	console.log('WHOOPS! Not ready');
	return Promise.reject();
}

const game = new Phaser.Game(phaserConfig);
waitForGameReady(game)
		.then(continueGame)
		.catch(errorGame);

