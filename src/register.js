(function(){

	var REGISTRY = false;

	var RegistryObj = function(){

		this.__actors = {};

		this.__blocked = {};

	};

	var p = RegistryObj.prototype;

	p.actors = function(){

		return Object.keys(this.__actors);
	};

	p.actorObj = function(name){

		return this.__actors[name];

	};

	p.register = function(name, actor){

		this.__actors[name] = actor;
	};

	p.block = function(name){

		this.__blocked[name] = true;

	};

	p.unblock = function(name){

		delete this.__blocked[name];

	};

	p.describe = function(name){

		return this.__actors[name].__uz().describe();

	};

	p.message = function(actor, message, args, callback){

		if(this.__actors[actor] === undefined)
			throw 'uzumaki.core.Registry.message: message \''  + message + '\' to unregistered actor \'' + actor + '\'';

		return this.__actors[actor].__uz().message(message, args, callback);

	};

	uzumaki.registry = function(){

		if(!REGISTRY) REGISTRY = new RegistryObj();

		return REGISTRY;
	};

}());
