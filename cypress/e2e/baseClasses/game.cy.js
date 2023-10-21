import Game from "../../../src/classes/Game.js";
import Road from "../../../src/classes/Road.js";
import Field from "../../../src/classes/Field.js";
import ItemPosition from "../../../src/classes/ItemPosition.js";
import RoadType from "../../../src/classes/types/RoadType.js";
import CacheTower from "../../../src/classes/CacheTower.js";

describe('Game', () => {
	let game;
	let ready;
	let boardController;
	beforeEach(() => {
		game = new Game();
		ready = game.ready;
		boardController = game.boardController;
	});
	describe('constructor', () => {
		it('should create the instance', () => {
			expect(game).to.be.an.instanceOf(Game);
		});
		it('should create the BoardController instance', () => {
			expect(ready.boardController).to.be.true;
		});
		it('should create the RoadController instance', () => {
			expect(ready.roadController).to.be.true;
		});
		it('should create the CacheTowerController instance', () => {
			expect(ready.cacheTowerController).to.be.true;
		});
		it('should create the ArsenalController instance', () => {
			expect(ready.arsenalController).to.be.true;
		});
		it('should create the MonsterController instance', () => {
			expect(ready.monsterController).to.be.true;
		});
		it('should create the GraphicsEngine instance', () => {
			expect(ready.graphicsEngine).to.be.true;
		});
	});
	describe('methods', () => {
		it('should initialize the graphics engine', () => {
			game.graphicsEngine.initialize();
			expect(game.graphicsEngine.jsEngine).to.equal('Phaser');
		});
		it('should pass the graphics engine to the BoardController', () => {
			boardController.attachGraphicsEngine(game.graphicsEngine);
			expect(boardController.graphicsEngine).to.equal(game.graphicsEngine);
		});
		it('should create the initial board', () => {
			boardController.newBoard();
			expect(boardController.field).to.be.an.instanceOf(Field);
		});
		it('should create the initial road', () => {
			const road = game.createInitialRoad();
			expect(road).to.be.an.instanceOf(Road);
			expect(road.type).to.equal(RoadType.HALF_LEFT);
			expect(road.position.x).to.equal(0);
			expect(road.position.y).to.equal(0);
		});
		it('should create the initial cache tower', () => {
			const cacheTower = game.createInitialCacheTower();
			expect(cacheTower).to.be.an.instanceOf(CacheTower);
			expect(cacheTower.position.x).to.equal(0);
			expect(cacheTower.position.y).to.equal(0);
		});
		it('should pass the initial road to the BoardController', () => {
			const road = game.createInitialRoad();
			boardController.insertRoad(road);
			const items = boardController.getItems({ position: new ItemPosition({ x: 0, y: 0 })});
			expect(items.filter((item) => item === road).length).to.equal(1);
		});
		it('should pass the initial cacheTower to the BoardController', () => {
			const cacheTower = game.createInitialCacheTower();
			boardController.insertItem(cacheTower);
			const items = boardController.getItems({ position: new ItemPosition({ x: 0, y: 0 })});
			expect(items.filter((item) => item === cacheTower).length).to.equal(1);
		});
		it('should initialize the round number', () => {
			expect(game.round).to.equal(0);
		});

		describe('a new game', () => {
			beforeEach(() => {
				game.newGame();
			});
			it('should start a new game', () => {
				expect(game.round).to.equal(1);
				expect(game.runAnimation).to.be.false;
			});
			it('should successfully know when the player is ready to proceed with the round', () => {
				game.signalStartOfRound();
				expect(game.runAnimation).to.be.true;
			});

			describe('a new round', () => {
				beforeEach(() => {
					game.signalStartOfRound();
				});
				it('should determine the number of monsters to generate', () => {
					const numberOfMonsters = game.numberOfMonstersToGenerate();
					expect(numberOfMonsters).to.equal(1);
				});
				it('should generate the monsters', () => {});
				it('should determine what road to expand', () => {});
				it('should expand the road', () => {});
				it('should move a monster already in the BoardController', () => {});
				it('should place a monster into the BoardController', () => {});
				it('should fire from a weapon', () => {});
				it('should get the results of the animation frame', () => {});
				it('should signal no end of game when cache tower HP is greater than zero', () => {});
				it('should signal end of game when cache tower HP is zero', () => {});
				it('should signal end of round if cache tower HP is greater than zero and no more monsters are in the BoardController', () => {});
				it('should signal no end of round if at least one monster is in the BoardController or in the queue, and CT HP is greater than zero', () => {});
				it('should end the game', () => {});
				it('should end the round', () => {});
			});
		});
	});


});