var Registry = require('./registry.js').registry();

var F_IN_CHILD_PROCESS = false;

module.exports.inChildProcess = function(set){

	if(set === undefined){
		return F_IN_CHILD_PROCESS;
	}
	else{

		F_IN_CHILD_PROCESS = set;

		if(F_IN_CHILD_PROCESS){

			Registry = require('./registry_child_process.js').registry();		

		}
	}

};

module.exports.spawn = function(actor, receive){

	Registry.register(actor, receive);

};

module.exports.send = function(){

	var args = Array.prototype.slice.call(arguments);

	Registry.deliverMessage.apply(Registry, args);

};

