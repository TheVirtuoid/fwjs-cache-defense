import imgCache from '/src/img/cache.png';
import imgGround from '/src/img/ground.jpg';
import imgMonsterAlienSprite from '/src/img/monster-alien-sprite.png';
import imgWeaponShooter from '/src/img/weapon-shooter.png';

import RoadType from "../../../types/RoadType.js";
import Field from "../../../Field.js";
import Dim from "../../../Dim.js";
import Pos from "../../../Pos.js";
import Tile from "../../../Tile.js";
import ItemType from "../../../types/ItemType.js";
import Item from "../../../Item.js";

const degToRad = (degrees) => degrees * Math.PI / 180;

export default class GameScene extends Phaser.Scene {

	static IMAGES = new Map([
		['cache', { image: imgCache, rotation: 0 }],
		['ground', { image: imgGround, rotation: 0 }],
		[RoadType.CORNER_TOP_LEFT.graphics.key, { image: RoadType.CORNER_TOP_LEFT.graphics.image, rotation: RoadType.CORNER_TOP_LEFT.graphics.rotation }],
		[RoadType.CORNER_TOP_RIGHT.graphics.key, { image: RoadType.CORNER_TOP_RIGHT.graphics.image, rotation: RoadType.CORNER_TOP_RIGHT.graphics.rotation }],
		[RoadType.CORNER_BOTTOM_LEFT.graphics.key, { image: RoadType.CORNER_BOTTOM_LEFT.graphics.image, rotation: RoadType.CORNER_BOTTOM_LEFT.graphics.rotation }],
		[RoadType.CORNER_BOTTOM_RIGHT.graphics.key, { image: RoadType.CORNER_BOTTOM_RIGHT.graphics.image, rotation: RoadType.CORNER_BOTTOM_RIGHT.graphics.rotation }],

		[RoadType.HALF_TOP.graphics.key, { image: RoadType.HALF_TOP.graphics.image, rotation: RoadType.HALF_TOP.graphics.rotation }],
		[RoadType.HALF_RIGHT.graphics.key, { image: RoadType.HALF_RIGHT.graphics.image, rotation: RoadType.HALF_RIGHT.graphics.rotation }],
		[RoadType.HALF_BOTTOM.graphics.key, { image: RoadType.HALF_BOTTOM.graphics.image, rotation: RoadType.HALF_BOTTOM.graphics.rotation }],
		[RoadType.HALF_LEFT.graphics.key, { image: RoadType.HALF_LEFT.graphics.image, rotation: RoadType.HALF_LEFT.graphics.rotation }],

		[RoadType.STRAIGHT_TOP_BOTTOM.graphics.key, { image: RoadType.STRAIGHT_TOP_BOTTOM.graphics.image, rotation: RoadType.STRAIGHT_TOP_BOTTOM.graphics.rotation }],
		[RoadType.STRAIGHT_LEFT_RIGHT.graphics.key, { image: RoadType.STRAIGHT_LEFT_RIGHT.graphics.image, rotation: RoadType.STRAIGHT_LEFT_RIGHT.graphics.rotation }],

		[RoadType.T_TOP_BOTTOM_RIGHT.graphics.key, { image: RoadType.T_TOP_BOTTOM_RIGHT.graphics.image, rotation: RoadType.T_TOP_BOTTOM_RIGHT.graphics.rotation }],
		[RoadType.T_LEFT_RIGHT_TOP.graphics.key, { image: RoadType.T_LEFT_RIGHT_TOP.graphics.image, rotation: RoadType.T_LEFT_RIGHT_TOP.graphics.rotation }],
		[RoadType.T_LEFT_RIGHT_BOTTOM.graphics.key, { image: RoadType.T_LEFT_RIGHT_BOTTOM.graphics.image, rotation: RoadType.T_LEFT_RIGHT_BOTTOM.graphics.rotation }],
		[RoadType.T_TOP_BOTTOM_LEFT.graphics.key, { image: RoadType.T_TOP_BOTTOM_LEFT.graphics.image, rotation: RoadType.T_TOP_BOTTOM_LEFT.graphics.rotation }],

		['weapon-shooter', { image: imgWeaponShooter, rotation: 0 }]
	]);

	static SPRITES = new Map([
		['monster-alien', { image: imgMonsterAlienSprite, frameWidth: 20, height: 20 }]
	]);
	static SCALE = .25;
	static FIELD_SIZE = 384;

	#config = null;
	#cacheDefenseDom = null;

	#field = null;
	#size = GameScene.FIELD_SIZE * GameScene.SCALE;
	#tiles = new Map();

	#readyFlags = {
		constructor: false,
		preLoad: false,
		create: false
	}

	constructor() {
		super();
		const boardSize = new Dim({ width: 800, height: 600 });
		const tileSize	= new Dim({ width: this.#size, height: this.#size });
		this.#field = new Field({ boardSize, tileSize });
		this.#readyFlags.constructor = true;
	}

	preload() {
		GameScene.IMAGES.forEach((value, key) => {
			const image = this.load.image(key, value.image);
		});
		GameScene.SPRITES.forEach((value, key) => {
			const sprite = this.load.spritesheet(key, value.image, { frameWidth: value.frameWidth, frameHeight: value.frameHeight });
		});
		this.#readyFlags.preLoad = true;
	}

	create() {
		this.alien001 = this.physics.add.sprite(100, 100, "monster-alien-sprite", 0);
		this.alien001.setScale(GameScene.SCALE);
		/*const centerTile = new Tile({ id: '3-2', roadType: RoadType.HALF_LEFT, position: new Pos({ x: 3, y: 2 }) });
		this.addTile(centerTile);
		const cache = new Item({ id: 'cache', type: ItemType.CACHE.BASE });
		this.addItem(cache, centerTile, new Pos({ x: 1, y: 1 }));*/

		/*const road = this.addImage(RoadType.HALF_LEFT.graphics.key, 3, 2);
		const cache = this.addImage('cache', 3, 2);
		// const weaponShooter = this.addImage('weapon-shooter', 0, 0);
		const weaponShooter = this.addImage('weapon-shooter', 3, 2, 0, 0);
		const monsterAlienSprite = this.addImage('monster-alien-sprite', 1, 1);

		this.addImage(RoadType.CORNER_TOP_RIGHT.graphics.key, 2, 2);
		this.addImage(RoadType.STRAIGHT_TOP_BOTTOM.graphics.key, 2, 1);
		this.addImage('weapon-shooter', 3, 2, 1, 0);
		this.addImage('weapon-shooter', 3, 2, 2, 0);
		this.addImage('weapon-shooter', 3, 2, 0, 1);
		this.addImage('weapon-shooter', 3, 2, 1, 1);
		this.addImage('weapon-shooter', 3, 2, 2, 1);
		this.addImage('weapon-shooter', 3, 2, 0, 2);
		this.addImage('weapon-shooter', 3, 2, 1, 2);
		this.addImage('weapon-shooter', 3, 2, 2, 2);*/
		this.#readyFlags.create = true;
	}

	update() {}

	get ready () {
		return this.#readyFlags.constructor && this.#readyFlags.preLoad && this.#readyFlags.create;
	}

	addTile(tile) {
		const { roadType, position } = tile;
		this.#tiles.set(position, tile);
		const road = this.addImage(roadType.graphics.key, position.x, position.y);
	}

	addItem(item, tile, subPosition) {
		tile.addItem({ item, subPosition });
		this.addImage(item.type.graphics.key, tile.position.x, tile.position.y, subPosition.x, subPosition.y);
	}

	addImage(key, x, y, subX, subY) {
		let image = null;
		let graphicX;
		let graphicY;
		const targetImage = GameScene.IMAGES.get(key);
		if (!(subX === undefined || subY === undefined)) {
			({ x: graphicX, y: graphicY } = this.#field.getSubXY({ x, y, subX, subY }));
		} else {
			({ x: graphicX, y: graphicY } = this.#field.getXY({ x, y }));
		}
		if (targetImage) {
			const image = this.add.image(graphicX, graphicY, key);
			image.setScale(GameScene.SCALE);
			image.setAngle(targetImage.rotation || 0);
			return image;
		}
	}


}