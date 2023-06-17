import Phaser from 'phaser';

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			/*gravity: {
				y: 600
			},*/
			debug: false
		}
	},
	scene: []
}

export default config;