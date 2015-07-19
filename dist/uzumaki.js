var uzumaki;

(function(){

	"use strict";

	var Module = function(){};

	uzumaki = new Module();

	uzumaki.core = new Module();

	exports.uzumaki = uzumaki;
}());


(function(){

	uzumaki.core.ComponentUz = function(name, object){

		this.name = function(){
			return name;
		};

		this.object = function(){
			return object;
		};

		this.__state = "READY";

		this.__callStack = [];

		this.__api = {};

	};

	/*
         * ComponentUz's prototype
         */

	var p = uzumaki.core.ComponentUz.prototype;

	p.state = function(newState){

		if(newState !== undefined)
			this.__state = newState;
		else
			return this.__state;

	};

	p.identify = function(){

		return "Actor \'" + this.name() + "\'";

	};

	p.stackCall = function(call){

		if(call === undefined)
			throw 'uzumaki.core.ComponentUz.stackCall: call is undefined ' + this.identify();

		this.__callStack.push(call);
	};

	p.callStack = function(){

		return this.__callStack;

	};

	p.registerNewCall = function(call, code){

		if(call === undefined)
			throw 'uzumaki.core.ComponentUz.registerNewCall: call is undefined ' + this.identify();

		if(code === undefined || typeof(code) !== 'function')
			throw 'uzumaki.core.ComponentUz.registerNewCall: code is undefined or not a function ' + this.identify;

		this.__api[call] = code;
	};	

	p.message = function(call, args, callback){

		if(this.__api[call] === undefined)
			throw 'uzumaki.core.ComponentUz: call not registered in ' + this.identify() + ": \'" + call + "\'";

		if(this.state() === 'BUSY'){
			this.callStack([call, args, callback]);
		}
		else{

			var ret = this.__api[call].apply(this.object(), args);

			if(callback)
				callback.call(callback, ret);
			else
				return ret;
		}

	};

	p.describe = function(){

		return Object.keys(this.__api);

	};
	

}());

(function(){

	uzumaki.register = function(name, object){

		if(typeof(object) !== 'object')
			throw 'uzumaki.register: an object was expected';

		var apiZ = object.__apiZ || [];

		uzumaki.__uzify(name, object);

		apiZ.forEach(function(call){

			var code = object[call];	

			object.__uz().registerNewCall(call, code);	

		});

	};

	uzumaki.message = function(call){

		var parts = call.split('.');
		var args = Array.prototype.slice.call(arguments);

		return uzumaki.registry().message(parts[0], parts[1], args.slice(1, args.length));	

	};

}());

(function(){

	//converts a trivial object in a uzumaki actor
	uzumaki.__uzify = function(name, object){

		var component = new uzumaki.core.ComponentUz(name, object);

		setPrototype(object, '__uz', function(){

			return component;

		});		

		setPrototype(object, 'isActorZ', true);

		setPrototype(object, 'readyZ' , function(){

			return this.__uz().state('READY');

		}.bind(object));

		uzumaki.registry().register(name, object);

	};

	function setPrototype(object, key, code){

		if(object[key] !== undefined)
			throw "uzumaki.uzify.setPrototype: there is already a key \'" + key + "\' in the object";

		object[key] = code;

	}

}());

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
