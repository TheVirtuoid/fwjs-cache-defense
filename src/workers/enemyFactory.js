import EnemyFactoryEvent from "../objects/events/EnemyFactoryEvent.js";

const initialize = () => {
	postMessage(new EnemyFactoryEvent(EnemyFactoryEvent.INIT, true).message);
}

onmessage = (rawEvent) => {
	const event = EnemyFactoryEvent.from(rawEvent.data);
	switch(event.name) {
		case EnemyFactoryEvent.INIT:
			initialize();
			break;
	}
}
