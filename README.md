# uzumaki: Actor model for Javascript

### Documentation

Uzumaki turns any trivial object into an Actor. 

You have to supply:

- [x] name: a string containing a unique name for your actor
- [x] receive object: a set of keys/values that becomes new actor's API

### Actor Model's assumptions

- Every actor is issolated from the outside world, the only way of communication with it is through messages sent to its Mailbox.
- Messages are always asynchronous, thus, you have to provide a callback 
- Every actor defines its own API, using a receive object

```javascript

// creation of a calculator actor

uzumaki.spawn(

	'calculator', 


	{
		'+' : function(a,b) { return a + b },

		'-' : function(a,b) { return a - b },

		'/' : function(a,b) { return a / b }

	}
);

// use of our new actor

uzumaki.send(

	'calculator.+',  //message

	[5, 5],

	function(result) {

		console.log(result)
	}

);


```



