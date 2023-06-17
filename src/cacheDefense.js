import Scene from "./Scene.js";
import config from "./cachedefense.config.js";
import Phaser from 'phaser';

config.scene = Scene;

const game = new Phaser.Game(config);

