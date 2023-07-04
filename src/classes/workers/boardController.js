const workerBoardController = (message) => {
	console.log('---from web worker---');
	postMessage('ready');
}

export default workerBoardController;

