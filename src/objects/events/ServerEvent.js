import JPEvent from "./JPEvent.js";
import EventList from "./EventList.js";

export default class ServerEvent extends JPEvent {

	static INIT = EventList.SERVER_INIT;

	static from(eventData) {
		return new ServerEvent(eventData.name, eventData.data);
	}

	constructor(name, data = {}) {
		if (eventNames.indexOf(name) === -1) {
			throw new RangeError(`The specified name is invalid.`);
		}
		super(name, data);
	}
}

const eventNames = [
	ServerEvent.INIT
];

