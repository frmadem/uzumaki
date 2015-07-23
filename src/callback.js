var _ = require('underscore-node');

module.exports.createCallback = function(callback){

	if(typeof(callback) === 'function'){
		return callback;
	}
	else if(typeof(callback) == 'object'){

		return __createCallback(callback);	

	}
};

function __createCallback(receive_object){

	var keys = Object.keys(receive_object);

	return function(ret){

		var r = test_literal(ret, receive_object, keys);

		if(r){
			r(ret);
		}
		else{
			receive_object['*'](ret);
		}	

	};

}

	function test_literal(literal, object, keys){

		var i = _.indexOf(keys, literal);

		return (i != -1) ? object[keys[i]] : false;
	}
