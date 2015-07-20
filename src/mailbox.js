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
