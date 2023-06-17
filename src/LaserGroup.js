import Phaser from "phaser";
import config from "./cachedefense.config.js";
class LaserGroup extends Phaser.Physics.Arcade.Group {

	static SHOTSPEED = 500;
	constructor(scene) {
		super(scene.physics.world, scene);
		this.createMultiple({
			classType: Laser,
			frameQuantity: 30,
			active: false,
			visible: false,
			key: 'laser'
		});
		console.log(this);
	}

	fireLaser(x, y, angle = { x: LaserGroup.SHOTSPEED, y: LaserGroup.SHOTSPEED }) {
		const laser = this.getFirstDead(false);
		if (laser) {
			laser.fire(x, y, angle);
		}
	}
}

class Laser extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'slug001');
	}

	preUpdate(time, delta ) {
		super.preUpdate(time, delta);
		if (this.y <= 0 || this.x <= 0 || this.y >= config.height || this.x >= config.width) {
			this.setActive(false);
			this.setVisible(false);
		}
	}

	fire(x, y, speed = { x: LaserGroup.SHOTSPEED, y: LaserGroup.SHOTSPEED }) {
		this.body.reset(x, y);
		this.setActive(true);
		this.setVisible(true);
		this.setVelocity(speed.x, speed.y);
	}
}

export { Laser, LaserGroup };