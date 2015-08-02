var _ = require('underscore-node');
var ParametricReturn = require('./return.js').ParametricReturn;

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

		var r;
		var args;

		if(ret instanceof ParametricReturn){

			r = test_return(ret, receive_object, keys);

			args = ret.args;
		}
		else{
			r = test_literal(ret, receive_object, keys);

			args = [ret];
		}

		if(r){
			r.apply(r, args);
		}
		else{
			receive_object['*'].apply(receive_object, args);
		}	

	};

}

	function test_literal(literal, object, keys){

		var i = _.indexOf(keys, literal);

		return (i != -1) ? object[keys[i]] : false;
	}

	function test_return(ret, object, keys){

		var i = _.indexOf(keys, ret.key);

		return (i != -1 ) ? object[keys[i]] : false;

	}
