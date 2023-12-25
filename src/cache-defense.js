import cacheDefenseConfig from "./cache-defense-config.js";
import GameScene from "./classes/inGame/graphicEngines/phaser/GameScene.js";
import Tile from "./classes/Tile.js";
import RoadType from "./classes/types/RoadType.js";
import Pos from "./classes/Pos.js";
import Item from "./classes/Item.js";
import ItemType from "./classes/types/ItemType.js";

const phaserConfig = cacheDefenseConfig.graphics.engineSettings.phaser;
phaserConfig.scene = GameScene;

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

const continueGame = (game) => {
	console.log('continuing Game');
	const scene = game.scene.getScenes()[0];
	const centerTile = new Tile({ id: '3-2', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 3, y: 2 }) });
	scene.addTile(centerTile);
	const cache = new Item({ id: 'cache', type: ItemType.CACHE.BASE });
	scene.addItem(cache, centerTile, new Pos({ x: 1, y: 1 }));

	const tile2_2 = new Tile({ id: '2-2', roadType: RoadType.CORNER_TOP_RIGHT, position: new Pos({ x: 2, y: 2 }) });
	const tile2_1 = new Tile({ id: '2-1', roadType: RoadType.CORNER_BOTTOM_RIGHT, position: new Pos({ x: 2, y: 1 }) });
	const tile3_1 = new Tile({ id: '3-1', roadType: RoadType.STRAIGHT_LEFT_RIGHT, position: new Pos({ x: 3, y: 1 }) });
	const tile4_1 = new Tile({ id: '4-1', roadType: RoadType.STRAIGHT_LEFT_RIGHT, position: new Pos({ x: 4, y: 1 }) });


	scene.addTile(tile2_2);
	scene.addTile(tile2_1);
	scene.addTile(tile3_1);
	scene.addTile(tile4_1);

	// monster animation
	// scene.physics.add.sprite(100,100,'monster-alien-sprite', 0);

	return Promise.resolve();
};

const errorGame = (error) => {
	console.log('WHOOPS! Not ready');
	return Promise.reject();
}

const game = new Phaser.Game(phaserConfig);
waitForGameReady(game)
		.then(continueGame)
		.catch(errorGame);

