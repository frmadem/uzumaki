var Actor = require('./actor.js');

var REGISTRY = false;

function registry(){

	if(REGISTRY === false) REGISTRY = new Registry();

	return REGISTRY;

}

function Registry(){

	this.__localActors = {};

}

var p = Registry.prototype;

// register
p.register = function(name, receive){

	if(isLocalActor(name)){

		this.__registerLocalActor(name, receive);

	}

};

	p.__registerLocalActor = function(name, receive){
	
		this.__localActors[name] = new Actor(name, receive);

	};


// route
p.deliverMessage = function(call, args, callback){

	var message_name;
	var actor = call;

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

module.exports.registry = registry;
