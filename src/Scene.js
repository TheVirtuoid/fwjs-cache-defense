import Phaser from "phaser";
import {LaserGroup} from "./LaserGroup.js";
export default class Scene extends Phaser.Scene {
	constructor() {
		super();
		this.laserGroup = null;
	}

	preload() {
		this.load.spritesheet("alien001", "./src/assets/alien-001.png", {
			frameWidth: 32,
			height: 32
		});
		this.load.spritesheet("gun001", "./src/assets/gun-002.png", {
			frameWidth: 64,
			height: 64
		});
		this.load.image('slug001', './src/assets/slug-001.png');
	}

	create() {
		this.alien001 = this.physics.add.sprite(100, 100, "alien001", 0);
		this.gun001 = this.add.sprite(200, 200, 'gun001', 0);
		this.cursors = this.input.keyboard.createCursorKeys();
		this.anims.create({
			key: 'alien-walk',
			frames: this.anims.generateFrameNumbers('alien001', { frames: [0, 1, 2, 1] }),
			frameRate: 4,
			repeat: -1
		});
		this.cameras.main.setBackgroundColor('#aaffaa');
		this.angle = 0;
		this.laserGroup = new LaserGroup(this);
		this.input.on('pointerdown', pointer => {
			this.shootLaser();
		});
		this.alien001.anims.play("alien-walk", true);
	}

	shootLaser() {
		// const { x, y } =  this.physics.velocityFromAngle(this.angle, LaserGroup.SHOTSPEED);
		const { x, y } =  this.physics.velocityFromAngle(this.gun001.angle, LaserGroup.SHOTSPEED);
		this.laserGroup.fireLaser(this.gun001.x, this.gun001.y, { x, y });
	}

	update() {
		this.angle++;
		if (this.angle >= 360) {
			this.angle = 0;
		}
		// this.gun001.setAngle(this.angle);
		console.log(this.alien001.active);
		this.alien001.x += 1;
		this.physics.collide(this.alien001, this.laserGroup, this.gotHit);
		const degrees = Phaser.Math.Angle.Between(this.gun001.x, this.gun001.y, this.alien001.x, this.alien001.y) * 180 / Math.PI;
		const newAngle = degrees >= 0 ? degrees : 360 + degrees;
		this.gun001.setAngle(degrees);
	}

	gotHit(alien, laser) {
		laser.setActive(false);
		laser.setVisible(false);
		alien.destroy();
		/*console.log('got hit!');
		console.log(alien, laser);*/
	}
	
}