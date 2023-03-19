import StructureFactoryEvent from "../objects/events/StructureFactoryEvent.js";

const initialize = () => {
	postMessage(new StructureFactoryEvent(StructureFactoryEvent.INIT, true).message);
}

onmessage = (rawEvent) => {
	const event = StructureFactoryEvent.from(rawEvent.data);
	switch(event.name) {
		case StructureFactoryEvent.INIT:
			initialize();
			break;
	}
}
