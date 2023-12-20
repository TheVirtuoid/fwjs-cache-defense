import imgCache from '/src/img/cache.png';
import imgGround from '/src/img/ground.jpg';
import imgMonsterAlienSprite from '/src/img/monster-alien-sprite.png';
import imgWeaponShooter from '/src/img/weapon-shooter.png';

import RoadType from "../../../types/RoadType.js";
import Field from "../../../Field.js";
import Dim from "../../../Dim.js";

const degToRad = (degrees) => degrees * Math.PI / 180;

export default class GameScene extends Phaser.Scene {

	static IMAGES = new Map([
		['cache', { image: imgCache, rotation: 0 }],
		['ground', { image: imgGround, rotation: 0 }],
		['monster-alien-sprite', { image: imgMonsterAlienSprite, rotation: 0 }],
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
	static SCALE = .25;
	static FIELD_SIZE = 384;

	#config = null;
	#cacheDefenseDom = null;

	#field = null;
	#size = GameScene.FIELD_SIZE * GameScene.SCALE;

	constructor() {
		super();
		const boardSize = new Dim({ width: 800, height: 600 });
		const tileSize	= new Dim({ width: this.#size, height: this.#size });
		this.#field = new Field({ boardSize, tileSize });
	}

	preload() {
		GameScene.IMAGES.forEach((value, key) => {
			const image = this.load.image(key, value.image);
		});
	}

	create() {
		const road = this.addImage(RoadType.HALF_LEFT.graphics.key, 400, 300);
		const cache = this.addImage('cache', 400, 300);
		const weaponShooter = this.addImage('weapon-shooter', 100, 100);
		const monsterAlienSprite = this.addImage('monster-alien-sprite', 400, 250);
	}

	update() {}

	addImage(key, x, y) {
		let image = null;
		const targetImage = GameScene.IMAGES.get(key);
		if (targetImage) {
			const image = this.add.image(x, y, key);
			image.setScale(GameScene.SCALE);
			image.setAngle(targetImage.rotation || 0);
			return image;

		}
	}


}