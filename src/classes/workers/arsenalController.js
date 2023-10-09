importScripts("../controllers/ArsenalController.js");

const arsenalController = new ArsenalController();

onmessage = (message) => {
	const { message: msg, args } = message.data;
	switch (msg) {
		case 'createWeapon':
			const createWeapon = arsenalController.createWeapon(args);
			post('createWeapon', createWeapon);
			break;
		case 'getWeapon':
			const getWeapon = arsenalController.getWeapon(args);
			post('getWeapon', getWeapon);
			break;
		case 'removeWeapon':
			const removeWeapon = arsenalController.removeWeapon(args);
			post('removeWeapon', removeWeapon);
			break;
		case 'initialize':
			arsenalController.initialize();
			post('initialize', null);
			break;
		default:
			break;
	}
}

const post = (message, data) => {
	postMessage({ message, data });
}