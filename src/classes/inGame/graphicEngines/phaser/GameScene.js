import imgCache from '/src/img/cache.png';
import imgGround from '/src/img/ground.jpg';
import imgMonsterAlienSprite from '/src/img/monster-alien-sprite.png';
import imgRoadCorner from '/src/img/road-corner.jpg';
import imgRoadHalf from '/src/img/road-half.jpg';
import imgRoadStraight from '/src/img/road-straight.jpg';
import imgRoadT from '/src/img/road-t.jpg';
import imgWeaponShooter from '/src/img/weapon-shooter.png';

import RoadType from "../../../types/RoadType.js";

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
	static SCALE = .4;

	static EVENT_PRELOAD = 'preload';
	static EVENT_CREATE = 'create';
	static EVENT_UPDATE	= 'update';

	#preloadEvent = new CustomEvent(GameScene.EVENT_PRELOAD, { detail: { scene: this } });
	#createEvent = new CustomEvent(GameScene.EVENT_CREATE, { detail: { scene: this } });
	#updateEvent = new CustomEvent(GameScene.EVENT_UPDATE, { detail: { scene: this } });

	#config = null;
	#cacheDefenseDom = null;

	constructor(config) {
		super();
		this.#config = config;
		this.#cacheDefenseDom = document.getElementById(this.#config.board.cacheDefenseDom);
	}

	preload() {
		GameScene.IMAGES.forEach((value, key) => {
			const image = this.load.image(key, value.image);
		});
		this.#cacheDefenseDom.dispatchEvent(this.#preloadEvent);
	}

	create() {
		this.#cacheDefenseDom.dispatchEvent(this.#createEvent);
		/*console.log('erwrew');
		console.log(this.add);
		const imgRoadHalf = this.add.image(400, 300, 'road-half');
		const imgCache = this.add.image(400, 300, 'cache');
		imgCache.setScale(GameScene.SCALE);
		imgRoadHalf.setScale(GameScene.SCALE);*/
	}

	update() {}

	addImage(args) {
		const { imageKey, x, y } = args;
		const { rotation = 0 } = GameScene.IMAGES.get(imageKey);
		const img = this.add.image(x, y, imageKey);
		if (rotation !== 0) {
			img.setRotation(degToRad(rotation));
		}
		img.setScale(GameScene.SCALE);
		return img;
	}

}