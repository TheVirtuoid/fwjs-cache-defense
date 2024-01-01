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
		[ItemType.CACHE.BASE.graphics.key, { image: ItemType.CACHE.BASE.graphics.image, rotation: ItemType.CACHE.BASE.graphics.rotation }],
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

		[ItemType.WEAPON.SHOOTER.graphics.key, { image: ItemType.WEAPON.SHOOTER.graphics.image, rotation: ItemType.WEAPON.SHOOTER.graphics.rotation }]
	]);

	static SPRITES = new Map([
		[ItemType.MONSTER.ALIEN.graphics.key, {
			image: ItemType.MONSTER.ALIEN.graphics.image,
			frameWidth: ItemType.MONSTER.ALIEN.graphics.frameWidth,
			frameHeight: ItemType.MONSTER.ALIEN.graphics.frameHeight }]
	]);
	static SCALE = 1;

	#config = null;
	#cacheDefenseDom = null;

	#field = null;
	#size = 60 * GameScene.SCALE;

	#readyFlags = {
		constructor: false,
		preLoad: false,
		create: false
	}

	#updateCallback = () => {};

	constructor(args = {}) {
		super();
		const boardSize = new Dim({ width: 600, height: 600 });
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
		this.#readyFlags.create = true;
	}

	update(time, delta) {
		this.#updateCallback();
	}

	get ready () {
		return this.#readyFlags.constructor && this.#readyFlags.preLoad && this.#readyFlags.create;
	}

	set updateCallback(value) {
		this.#updateCallback = value;
	}
	moveItem(item) {
		const { position, subPosition } = item;
		const { x, y } = position;
		const { x: subX, y: subY } = subPosition;
		item.image.x = this.#field.getSubXY({ x, y, subX, subY }).x;
		item.image.y = this.#field.getSubXY({ x, y, subX, subY }).y;
	}

	getSubXY(args = {}) {
		return this.#field.getSubXY({ x: args.x, y: args.y, subX: args.subX, subY: args.subY });
	}

	addImage(graphics, x, y, subX, subY) {
		const key = graphics.key;
		const graphicsType = graphics.type;
		let image = 1;
		let graphicX;
		let graphicY;
		const targetImage = graphicsType === 'sprite' ? GameScene.SPRITES.get(key) : GameScene.IMAGES.get(key);
		if (!(subX === undefined || subY === undefined)) {
			({ x: graphicX, y: graphicY } = this.#field.getSubXY({ x, y, subX, subY }));
		} else {
			({ x: graphicX, y: graphicY } = this.#field.getXY({ x, y }));
		}
		if (targetImage) {
			if (graphicsType === 'sprite') {
				image = this.physics.add.sprite(graphicX, graphicY, key, 0);
			} else {
				image = this.add.image(graphicX, graphicY, key);
			}
			image.setScale(GameScene.SCALE);
			image.setAngle(targetImage.rotation || 0);
		}
		return image;
	}


}