var uzumaki = require('../src/uzumaki.js');
var Message = require('../src/message.js');

uzumaki.spawn('calculator', {

	'+' : function(){

		var numbers = Array.prototype.slice.call(arguments);

		var cumulator = 0;

		numbers.forEach(function(n){ cumulator += n });

		return cumulator;
	},

	'-' : function(){

		var numbers = Array.prototype.slice.call(arguments);

		var cumulator = 0;

		numbers.forEach(function(n){ cumulator -= n });

		return cumulator;
	}

});

uzumaki.send(

	'calculator.+',

	[1, 1, 1, 1],

	function(ret){

		console.log(ret);

	}
);
