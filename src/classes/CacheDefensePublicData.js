export default class CacheDefensePublicData {

	#arsenalController;
	#boardController;
	#cacheTowerController;
	#monsterController;
	#roadController;

	constructor() {
		this.#arsenalController = false;
		this.#boardController = false;
		this.#cacheTowerController = false;
		this.#monsterController = false;
		this.#roadController = false;
	}

	get arsenalController() {
		return this.#arsenalController;
	}
	get boardController() {
		return this.#boardController;
	}
	get cacheTowerController() {
		return this.#cacheTowerController;
	}
	get monsterController() {
		return this.#monsterController;
	}
	get roadController() {
		return this.#roadController;
	}

	set arsenalController(value) {
		this.#arsenalController = !!value;
	}
	set boardController(value) {
		this.#boardController = !!value;
	}
	set cacheTowerController(value) {
		this.#cacheTowerController = !!value;
	}
	set monsterController(value) {
		this.#monsterController = !!value;
	}
	set roadController(value) {
		this.#roadController = !!value;
	}


}