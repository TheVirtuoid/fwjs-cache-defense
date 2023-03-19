import Server from "./objects/Server.js";

const Worker = window ? window.Worker : require('worker_threads');

const server = new Worker('./workers/server.js');
