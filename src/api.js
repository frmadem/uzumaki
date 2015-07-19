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

	uzumaki.messageAsync = function(call){

		
		var parts = call.split('.');
		var args = Array.prototype.slice.call(arguments);

		var callback = args.pop();

		return uzumaki.registry().message(parts[0], parts[1], args.slice(1, args.length), callback);	
	};

}());
