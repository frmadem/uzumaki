var uzumaki = require('../dist/uzumaki.js').uzumaki;

uzumaki.register('calculator', {

	'add' : function(a, b){

		return a + b;

	},

	'substract' : function(a,b){

		return a - b;
	},

	'__apiZ' : ['add'],

});

var ret = uzumaki.message('calculator.add', 5, 5);

