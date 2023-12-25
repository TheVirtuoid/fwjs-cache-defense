import cacheDefenseConfig from "./cache-defense-config.js";
import GameScene from "./classes/inGame/graphicEngines/phaser/GameScene.js";

const phaserConfig = cacheDefenseConfig.graphics.engineSettings.phaser;
phaserConfig.scene = GameScene;

const game = new Phaser.Game(phaserConfig);
console.log('----all done');
