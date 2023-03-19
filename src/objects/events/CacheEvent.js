import JPEvent from "./JPEvent.js";
import EventList from "./EventList.js";

export default class CacheEvent extends JPEvent {

	static INIT = EventList.CACHE_INIT;

	static from(eventData) {
		return new CacheEvent(eventData.name, eventData.data);
	}

	constructor(name, data = {}) {
		if (eventNames.indexOf(name) === -1) {
			throw new RangeError(`The specified name is invalid.`);
		}
		super(name, data);
	}
}

const eventNames = [
	CacheEvent.INIT
];

