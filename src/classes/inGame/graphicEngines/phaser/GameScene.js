import imgCache from '/src/img/cache.png';
import imgGround from '/src/img/ground.jpg';
import imgMonsterAlienSprite from '/src/img/monster-alien-sprite.png';
import imgRoadCorner from '/src/img/road-corner.jpg';
import imgRoadHalf from '/src/img/road-half.jpg';
import imgRoadStraight from '/src/img/road-straight.jpg';
import imgRoadT from '/src/img/road-t.jpg';
import imgWeaponShooter from '/src/img/weapon-shooter.png';


export default class GameScene extends Phaser.Scene {

	static IMAGES = new Map([
			['cache', imgCache],
			['ground', imgGround],
			['monster-alien-sprite', imgMonsterAlienSprite],
			['road-corner', imgRoadCorner],
			['road-half', imgRoadHalf],
			['road-straight', imgRoadStraight],
			['road-t', imgRoadT],
			['weapon-shooter', imgWeaponShooter]
	]);
	static SCALE = .4;

	constructor() {
		super();
	}

	preload() {
		GameScene.IMAGES.forEach((value, key) => {
			this.load.image(key, value);
		});
	}

	create() {
		const imgRoadHalf = this.add.image(400, 300, 'road-half');
		const imgCache = this.add.image(400, 300, 'cache');
		imgCache.setScale(GameScene.SCALE);
		imgRoadHalf.setScale(GameScene.SCALE);
	}

	update() {}

}