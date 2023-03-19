import PlayerEvent from "../objects/events/PlayerEvent.js";

const initialize = () => {
	postMessage(new PlayerEvent(PlayerEvent.INIT, true).message);
}

onmessage = (rawEvent) => {
	const event = PlayerEvent.from(rawEvent.data);
	switch(event.name) {
		case PlayerEvent.INIT:
			initialize();
			break;
	}
}
