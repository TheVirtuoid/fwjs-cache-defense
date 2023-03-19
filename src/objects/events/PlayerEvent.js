import JPEvent from "./JPEvent.js";
import EventList from "./EventList.js";

export default class PlayerEvent extends JPEvent {

	static INIT = EventList.PLAYER_INIT;

	static from(eventData) {
		return new PlayerEvent(eventData.name, eventData.data);
	}

	constructor(name, data = {}) {
		if (eventNames.indexOf(name) === -1) {
			throw new RangeError(`The specified name is invalid.`);
		}
		super(name, data);
	}
}

const eventNames = [
	PlayerEvent.INIT
];

