import Phaser from 'phaser';


const config = {

	graphics: {
		engineSettings: {
			phaser: {
				type: Phaser.AUTO,
				width: 800,
				height: 600,
				parent: 'playing-field',
				backgroundColor: '#222222',
				physics: {
					default: 'arcade',
					arcade: {
						debug: false
					}
				},
				scene: {}
			}
		}
	}
}
export default config;