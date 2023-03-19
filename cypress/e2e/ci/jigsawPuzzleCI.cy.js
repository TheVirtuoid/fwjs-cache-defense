import ServerEvent from "../../../src/objects/events/ServerEvent.js";
import CacheEvent from "../../../src/objects/events/CacheEvent.js";
import EnemyFactoryEvent from "../../../src/objects/events/EnemyFactoryEvent.js";
import FieldEvent from "../../../src/objects/events/FieldEvent.js";
import PlayerEvent from "../../../src/objects/events/PlayerEvent.js";
import StructureFactoryEvent from "../../../src/objects/events/StructureFactoryEvent.js";

const workerRoot = './../../src/workers';

const serverWorker = `${workerRoot}/server.js`
const enemyFactoryWorker = `${workerRoot}/enemyFactory.js`
const fieldWorker = `${workerRoot}/field.js`
const cacheWorker = `${workerRoot}/cache.js`
const playerWorker = `${workerRoot}/player.js`
const structureFactoryWorker = `${workerRoot}/structureFactory.js`

describe('Jigsaw Puzzle: ', () => {
	it('should launch the server worker', (done) => {
		const server = new Worker(serverWorker, { type: "module" });
		server.onmessage = (event) => {
			const serverEvent = ServerEvent.from(event.data);
			expect(serverEvent.data).to.be.true;
			server.terminate();
			done();
		}
		const event = new ServerEvent(ServerEvent.INIT);
		server.postMessage(event.message);
	});
	it('should launch the cache worker', (done) => {
		const cache = new Worker(cacheWorker, { type: "module" });
		cache.onmessage = (event) => {
			const cacheEvent = CacheEvent.from(event.data);
			expect(cacheEvent.data).to.be.true;
			cache.terminate();
			done();
		}
		const event = new CacheEvent(CacheEvent.INIT);
		cache.postMessage(event.message);
	});
	it('should launch the enemy factory worker', (done) => {
		const enemyFactory = new Worker(enemyFactoryWorker, { type: "module" });
		enemyFactory.onmessage = (event) => {
			const enemyFactoryEvent = EnemyFactoryEvent.from(event.data);
			expect(enemyFactoryEvent.data).to.be.true;
			enemyFactory.terminate();
			done();
		}
		const event = new EnemyFactoryEvent(EnemyFactoryEvent.INIT);
		enemyFactory.postMessage(event.message);
	});
	it('should launch the field worker', (done) => {
		const field = new Worker(fieldWorker, { type: "module" });
		field.onmessage = (event) => {
			const fieldEvent = FieldEvent.from(event.data);
			expect(fieldEvent.data).to.be.true;
			field.terminate();
			done();
		}
		const event = new FieldEvent(FieldEvent.INIT);
		field.postMessage(event.message);
	});
	it('should launch the player worker', (done) => {
		const player = new Worker(playerWorker, { type: "module" });
		player.onmessage = (event) => {
			const playerEvent = PlayerEvent.from(event.data);
			expect(playerEvent.data).to.be.true;
			player.terminate();
			done();
		}
		const event = new PlayerEvent(PlayerEvent.INIT);
		player.postMessage(event.message);
	});
	it('should launch the structure factory worker', (done) => {
		const structureFactory = new Worker(structureFactoryWorker, { type: "module" });
		structureFactory.onmessage = (event) => {
			const structureFactoryEvent = StructureFactoryEvent.from(event.data);
			expect(structureFactoryEvent.data).to.be.true;
			structureFactory.terminate();
			done();
		}
		const event = new StructureFactoryEvent(StructureFactoryEvent.INIT);
		structureFactory.postMessage(event.message);
	});
});