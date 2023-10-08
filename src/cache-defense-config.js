import Phaser from 'phaser';


const config = {
	board: {
		parentDom: 'playing-field'
	},
	graphics: {
		engineSettings: {
			phaser: {
				type: Phaser.AUTO,
				width: 800,
				height: 600,
				parent: null,
				scene: {}
			}
		}
	}
}
export default config;