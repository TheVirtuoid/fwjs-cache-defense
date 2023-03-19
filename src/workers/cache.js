import CacheEvent from "../objects/events/CacheEvent.js";

const initialize = () => {
	postMessage(new CacheEvent(CacheEvent.INIT, true).message);
}

onmessage = (rawEvent) => {
	const event = CacheEvent.from(rawEvent.data);
	switch(event.name) {
		case CacheEvent.INIT:
			initialize();
			break;
	}
}
