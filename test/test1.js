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
	},

	testadd_callback : function(test){

		uzumaki.messageAsync('calculator.add', 10, 10, function(ret){

			test.ok(ret == 20, 'Adds well in callback context');
			test.done();

		});
	},

	testsubstract_callback : function(test){

		uzumaki.messageAsync('calculator.substract', 10, 6, function(ret){

			test.ok(ret == 4, 'Substracts well in callback context');
			test.done();

		});
	}


};

