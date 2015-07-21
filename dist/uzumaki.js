function Message(name, args, callback){

	this.name = name;
	this.args = args;
	this.callback = callback;

}

module.exports = Message;

var Message = require('./message.js');

function Mailbox(){

	this.__stack = [];	

}

var p = Mailbox.prototype;

p.newMessage = function(message){

	this.__stack.push(message);

};

p.getMessage = function(){

	return this.__stack.shift();

};

module.exports= Mailbox;

var Mailbox = require('./mailbox.js');
var Message = require('./message.js');

function Actor(name, receive){

	this.name = function(){
		return name;
	};

	this.__onWork = false;

	this.__initMailbox();

	this.__initReceive(receive);	

}

var p = Actor.prototype;

//public
p.send = function(message_name, args, callback){

	var message = this.__createMessage(message_name, args, callback);

	this.__mailbox.newMessage(message);

	setTimeout(function(){

		this.__work();

	}.bind(this), 0);
};


//internal
p.__work = function(){

	if(this.__onWork === true) return;

	this.__onWork = true;

	var ok = true;

	while(ok){

		var nextMessage = this.__mailbox.getMessage();

		if(nextMessage){

			this.__runMessage(nextMessage);

		}
		else{
			ok = false;
		}

	}

	this.__onWork = false;

};

p.__runMessage = function(message){

	var code = this.__api[message.name];

	code(message);

};

p.__initMailbox = function(){

	this.__mailbox = new Mailbox();

};

p.__initReceive = function(receive){

	if(typeof(receive) !== 'object'){

		throw 'uzumaki.Actor.new: receive is not an object';
	}

	this.__api = {};

	var messageNames = Object.keys(receive);

	messageNames.forEach(function(messageName){

		var code = receive[messageName];

		this.__api[messageName] = function(message){

			var ret = code.apply(this, message.args);

			if(message.callback){
				message.callback(ret);
			}
			else{
				return ret;
			}

		}.bind(this);
		

	}.bind(this));

};

p.__createMessage = function(message_name, args, callback){

	return new Message(

		message_name,

		args, 

		callback

	);

};

module.exports = Actor;

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
