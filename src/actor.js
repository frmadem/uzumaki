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
