var Actor = require('./actor.js');
var ActorInProcess = require('./actor_process.js');

var Callback = require('./callback.js');

var REGISTRY = false;

function registry(){

	if(REGISTRY === false) REGISTRY = new Registry();

	return REGISTRY;

}

function Registry(){

	this.__localActors = {};
	this.__inProcessActors = {};

}

var p = Registry.prototype;

// register
p.register = function(name, receive){

	if(isActorInProcess(name)){

		this.__registerActorInProcess(name, receive);
	}
	else if(isLocalActor(name)){

		this.__registerLocalActor(name, receive);

	}


};

	p.__registerLocalActor = function(name, receive){
	
		this.__localActors[name] = new Actor(name, receive);

	};

	p.__registerActorInProcess = function(name, modulePath){

		this.__inProcessActors[name] = new ActorInProcess(

			name,
			
			modulePath

		);

		this.__inProcessActors[name].start();

	};


// route
p.deliverMessage = function(call, args, callback){

	var message_name;
	var actor = call;

	callback = Callback.createCallback(callback);

	if(isAbbreviated(actor)){
		
		var call_parts = actor.split(/\./);

		actor = call_parts[0];

		message_name = call_parts[1];
	}

	if(isLocalActor(actor)){

		this.__deliverMessageLocalActor(

			actor,

			message_name,

			args,

			callback

		);

	}

};

	p.__deliverMessageLocalActor = function(actor, message_name, args, callback){

		var actor_instance = this.__localActors[actor];

		actor_instance.send(message_name, args, callback);

	};

// testers
function isAbbreviated(name) { return name.match(/\.(.+)/); }

function isLocalActor(name) { return name.match(/^\w+$/); }

function isActorInProcess(name) { 

	return name.match(/^p\#(.+)/); 

}

module.exports.registry = registry;
