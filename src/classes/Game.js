export default class Game {
	#gameInProgress;
	#boardController;
	#cacheController;
	#roadController;
	#arsenalController;
	#monsterController;
	#round;
	constructor() {
		this.#gameInProgress = false;
		this.#boardController = null;
		this.#cacheController = null;
		this.#roadController = null;
		this.#arsenalController = null;
		this.#monsterController = null;
		this.#round = null;
	}

	get gameInProgress() {
		return this.#gameInProgress;
	}

	get boardController() {
		return this.#boardController;
	}

	get cacheController() {
		return this.#cacheController;
	}

	get roadController() {
		return this.#roadController;
	}

	get arsenalController() {
		return this.#arsenalController;
	}

	get monsterController() {
		return this.#monsterController;
	}

	get round() {
		return this.#round;
	}

	newGame() {
		this.#gameInProgress = true;
		this.#boardController = 'TODO: Set Board Controller';
		this.#cacheController = 'TODO: Set Cache Controller';
		this.#roadController = 'TODO: set road controller';
		this.#arsenalController = 'TODO: set arsenal controller';
		this.#monsterController = 'TODO: set monster controller';
		this.#round = 0;
	}
}