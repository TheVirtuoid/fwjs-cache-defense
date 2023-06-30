// game object

import Game from "../../src/classes/Game.js";

describe('Game Object', () => {

	describe('creation', () => {
		it('should create the game object', () => {
			const game = new Game();
			expect(game instanceof Game).to.be.true;
		});
		it('should set the initial parameters correct', () => {
			const game = new Game();
			expect(game.gameInProgress).to.be.false;
			expect(game.boardController).to.be.null;
			expect(game.cacheController).to.be.null;
			expect(game.roadController).to.be.null;
			expect(game.arsenalController).to.be.null;
			expect(game.monsterController).to.be.null;
			expect(game.round).to.be.null;
		});
	});

	describe('new game', () => {
		let game;
		beforeEach(() => {
			game = new Game();
			game.newGame();
		});
		it('should start a new game', () => {
			expect(game.gameInProgress).to.be.true;
		});
		it('should create a new board controller', () => {
			expect(!!game.boardController).to.be.true;
		});
		it('should create a cache controller', () => {
			expect(!!game.cacheController).to.be.true;
		});
		it('should create a road controller', () => {
			expect(!!game.roadController).to.be.true;
		});
		it('should create an arsenal controller', () => {
			expect(!!game.arsenalController).to.be.true;
		});
		it('should create a monster controller', () => {
			expect(!!game.monsterController).to.be.true;
		});
		it('should set round number to 0', () => {
			expect(game.round).to.equal(0);
		});
	});
});