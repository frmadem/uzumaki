var Mailbox = require('../src/mailbox.js');
var Message = require('../src/message.js');
var Actor = require('../src/actor.js');
var Registry = require('../src/registry.js').registry();

var a = new Actor('test', {

	'add' : function(x, y){

		return x + y;

	},

	'substract' : function(x, y){

		return x - y;
	}

});

exports.init = {

	testmailbox : function(test){

		var m  = new Mailbox();

		test.ok(m.getMessage() === undefined, 'No messages');

		m.newMessage(

			new Message('first', [1,2,3])

		);

		m.newMessage(

			new Message('second', [1,2,3])

		);


		test.ok(m.getMessage().name === 'first', 'Message I correct');
		test.ok(m.getMessage().name === 'second', 'Message II correct');

		test.done();

	},

	testactor1 : function(test){

		a.send(

			new Message(

				'add',

				[5, 5],

				function(ret){

					test.ok(ret == 10, 'Add works!');
					test.done();
				}

			)

		);
	},

	testactor2 : function(test){

		a.send(

			new Message(

				'substract',

				[10, 7],

				function(ret) {

					test.ok(ret == 3, 'Substraction works!');
					test.done();
				}

			)
		)
	}

};

