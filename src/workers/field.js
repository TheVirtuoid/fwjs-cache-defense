import FieldEvent from "../objects/events/FieldEvent.js";

const initialize = () => {
	postMessage(new FieldEvent(FieldEvent.INIT, true).message);
}

onmessage = (rawEvent) => {
	const event = FieldEvent.from(rawEvent.data);
	switch(event.name) {
		case FieldEvent.INIT:
			initialize();
			break;
	}
}
