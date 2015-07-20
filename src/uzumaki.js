var Registry = require('./registry.js').registry();


module.exports.spawn = function(actor, receive){

	Registry.register(actor, receive);

};

module.exports.send = function(){

	var args = Array.prototype.slice.call(arguments);

	Registry.deliverMessage.apply(Registry, args);

};

