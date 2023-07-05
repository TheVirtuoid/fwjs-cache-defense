import CacheDefensePublicData from "./CacheDefensePublicData.js";

export default class Game {
	#gameInProgress;
	#boardController;
	#cacheTowerController;
	#roadController;
	#arsenalController;
	#monsterController;
	#round;

	#readyFlag = {
		'arsenal': false,
		'board': false,
		'cacheTower': false,
		'monster': false,
		'road': false
	};

	#readyHandle;
	#readyTimeout = 5000;
	#readyInterval = 1;

	constructor() {
		this.#gameInProgress = false;
		this.#arsenalController = new Worker('/src/classes/workers/arsenalController.js');
		this.#boardController =  new Worker('/src/classes/workers/boardController.js');
		this.#cacheTowerController = new Worker('/src/classes/workers/cacheTowerController.js');
		this.#monsterController = new Worker('/src/classes/workers/monsterController.js');
		this.#roadController = new Worker('/src/classes/workers/roadController.js');
		this.#round = null;

		window.cacheDefensePublicData = new CacheDefensePublicData();

		this.#arsenalController.onmessage = this.#arsenalMessage.bind(this);
		this.#boardController.onmessage = this.#boardMessage.bind(this);
		this.#cacheTowerController.onmessage = this.#cacheTowerMessage.bind(this);
		this.#monsterController.onmessage = this.#monsterMessage.bind(this);
		this.#roadController.onmessage = this.#roadMessage.bind(this);

		this.#arsenalController.postMessage('initialize');
		this.#boardController.postMessage('initialize');
		this.#cacheTowerController.postMessage('initialize');
		this.#monsterController.postMessage('initialize');
		this.#roadController.postMessage('initialize');

		this.#readyHandle = setInterval(this.#readyChecker.bind(this), this.#readyInterval);
	}

	get gameInProgress() {
		return this.#gameInProgress;
	}

	get boardController() {
		return this.#boardController;
	}

	get cacheTowerController() {
		return this.#cacheTowerController;
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
		this.#round = 0;
	}

	sendMessage(worker, message) {
		this.#boardController.postMessage(message);
	}

	#arsenalMessage(message) {
		this.#readyFlag.arsenal = true;
	}

	#boardMessage(message) {
		this.#readyFlag.board = true;
	}
	#cacheTowerMessage(message) {
		this.#readyFlag.cacheTower = true;
	}
	#monsterMessage(message) {
		this.#readyFlag.monster = true;
	}
	#roadMessage(message) {
		this.#readyFlag.road = true;
	}

	#readyChecker() {
		const { arsenal, board, cacheTower, monster, road } = this.#readyFlag;
		if (arsenal && board && cacheTower && monster && road) {
			clearInterval(this.#readyHandle);
			document.getElementById('loading').classList.add('hidden');
			document.getElementById('game-ready').classList.remove('hidden');
		}
		this.#readyTimeout--;
		if (this.#readyTimeout <= 0) {
			clearInterval(this.#readyHandle);
		}
	}
}
