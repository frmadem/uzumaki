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
p.send = function(message){

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

module.exports = Actor;

var REGISTRY = false;

function Registry(){

	this.__localActors = {};

}

function registry(){

}

module.exports.registry = registry;
