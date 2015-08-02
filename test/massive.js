var uzumaki = require('../src/uzumaki.js');

var max = 10000;
var assert_add = 0;

for(var i = 0; i <= max; i++){

	assert_add += i;

	spawn_actor(i);

}


function spawn_actor(number){

	uzumaki.spawn(
		
		'A_' + number,

		{

			'sign' : function(place){

				return number;

			}

		}
	);

}

exports.massive = {

	test1 : function(test){

		var cumulator = [];
		var total_add = 0;

		for(var i = 0; i <= max; i++){

			uzumaki.send(

				'A_' + i + '.sign',

				[],

				function(number){

					cumulator.push(number);
		
					total_add += number;

					if(cumulator.length == max){

						test.done();

					}

				}

			);

		}

	}

}
