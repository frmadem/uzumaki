
var process = require('child_process');

var uzumaki = require('./uzumaki.js');

//main loop in child process 

module.exports.starter = function(receive){

	uzumaki.inChildProcess(true);

	// we register a local actor
	uzumaki.spawn('__LOCAL__', receive);

	//every message is sent to it
	process.on('message',

		function(serializedMessage){

			var message = new Message().unserialize(serializedMessage);

			message.callback = function(respuesta){
			
				process.send(respuesta);

			};

		}


	);

};

