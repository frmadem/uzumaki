var uzumaki = require('../dist/uzumaki.js').uzumaki;

uzumaki.register('calculator', {

	'add' : function(a, b){

		return a + b;

	},

	'substract' : function(a,b){

		return a - b;
	},

	'__apiZ' : ['add', 'substract'],

});

exports.group = {


	testadd : function(test){

		var ret = uzumaki.message('calculator.add', 5, 5);

		test.ok(10 == ret, "Adds well");
		test.done();

	},

	testsubstract : function(test){

		var ret = uzumaki.message('calculator.substract', 10, 3);

		test.ok(7 == ret, "Substracts well");
		test.done();
	}

};

