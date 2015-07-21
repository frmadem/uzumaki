var Registry = require('./registry.js');

var REGISTRY = false;

function registry(){

	if(REGISTRY === false) REGISTRY = new RegistryChildProcess();

	return REGISTRY;
}

function RegistryChildProcess(){

	this.__localActors = {};
}

RegistryChildProcess.prototype = Object.create(Registry.prototype);
RegistryChildProcess.prototype.constructor = RegistryChildProcess;


var p = RegistryChildProcess.prototype;

module.exports = registry();
