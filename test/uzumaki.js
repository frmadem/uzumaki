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

		var cumulator = numbers.shift();

		numbers.forEach(function(n){ cumulator -= n });

		return cumulator;
	},

	'/' : function(a, b){

		if(b === 0){
			throw 'DIVISION_BY_ZERO';
		}
		else{
			return a / b;
		}

	}

});

exports.group = {

	test_add : function(test){

		uzumaki.send(
		
			'calculator.+',
		
			[1, 1, 1, 1],
		
			function(ret){
		
				test.ok(ret == 4, 'Addition is correct');
				test.done();
		
			}
		);
	},

	test_substract : function(test){

		uzumaki.send(

			'calculator.-',

			[10, 5] , 

			function(ret){

				test.ok(ret == 5, 'Sustraction is ok');
				test.done();

			}

		)

	},

	test_receive: function(test){

		var expected;

		var receive ={

			'DIVISION_BY_ZERO' : function(){

				test.ok(true, 'Exception is controlled');
				test.done();
			},

			'*' : function(ret){

				test.ok(ret == expected, 'Division is right');
				test.done();

			}
		};

		expected = 2;

		uzumaki.send(

			'calculator./',

			[10, 5], 

			receive
		);


	},

	test_receive_by_cero: function(test){

		uzumaki.send(

			'calculator./',

			[10, 0], 

			{

				'DIVISION_BY_ZERO' : function(){

					test.ok(true, 'Exception controlled');
					test.done();

				},

				'*' : function(){

					test.ok(false, 'Exception controlled');
					test.done();
				}	

			}
		);

	}

}
