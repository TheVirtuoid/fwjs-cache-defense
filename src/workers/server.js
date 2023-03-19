import ServerEvent from "../objects/events/ServerEvent.js";

const initialize = () => {
	postMessage(new ServerEvent(ServerEvent.INIT, true).message);
}

onmessage = (rawEvent) => {
	const event = ServerEvent.from(rawEvent.data);
	switch(event.name) {
		case ServerEvent.INIT:
			initialize();
			break;
	}
}
