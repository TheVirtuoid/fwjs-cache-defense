export default class CustomWorker {

	#codeClass;
	constructor(codeClass) {
		if (!codeClass) {
			throw new Error('CustomWorker: codeClass is required')
		}
		this.#codeClass = codeClass
	}

	postMessage(message) {
		const { message: methodName, args } = message;
		const method = this.#codeClass[methodName];
		const outMessage = new CustomEvent('message', { detail: { message: methodName, data: method } });
		dispatchEvent(outMessage);
	}
}