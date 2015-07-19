(function(){

	//converts a trivial object in a uzumaki actor
	uzumaki.__uzify = function(name, object){

		var component = new uzumaki.core.ComponentUz(name, object);

		setPrototype(object, '__uz', function(){

			return component;

		});		

		setPrototype(object, 'isActorZ', true);

		setPrototype(object, 'readyZ' , function(){

			return this.__uz().state('READY');

		}.bind(object));

		uzumaki.registry().register(name, object);

	};

	function setPrototype(object, key, code){

		if(object[key] !== undefined)
			throw "uzumaki.uzify.setPrototype: there is already a key \'" + key + "\' in the object";

		object[key] = code;

	}

}());
