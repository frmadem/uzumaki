# uzumaki: Actor model for Javascript

### Documentation

Uzumaki turns any trivial object into an Actor. 

You have to supply:

- [x] name: a string containing a unique name for your actor
- [x] receive object: a set of keys/values that becomes new actor's API

### Actor Model's assumptions

- Every actor is issolated from the outside world
- The only way of communication with it is through messages sent to its Mailbox.
- Messages are always asynchronous, thus, you have to provide a callback 
- Every actor defines its own API, using a normal object

```javascript

// creation of a calculator actor

uzumaki.spawn(

	'calculator', 


	{
		'+' : function(a,b) { return a + b },

		'-' : function(a,b) { return a - b },

		'/' : function(a,b) { 

			if(b === 0) throw 'DIVISION_BY_ZERO';

			return a / b 

		},

		'*' : function(a,b) { return a * b }

	}
);

// use of our new actor

uzumaki.send(

	'calculator.+',  //message

	[5, 5], // args

	function(result) {     // callback 

		console.log(result)
	}

);


// use of receiving object as a callback

uzumaki.send(

	'calculator./',

	[10, 0],

	{

		'DIVISION_BY_ZERO' : function(){

			console.log('Attempt of division by zero!!!');

		},

		'*' : function(ret){ //rest of the cases

		}

	}



);

```

#Simple Tutorial

## Browser

We want to create a piece of code that controls a resource, i.e. an area of the document where messages should be printed.

We need access to it from several places of our application. 

We use uzumaki to create an Actor!!!

### The actor

Let's create an actor, say... Logger

```javascript

	//we span a new actor
	
	uzumaki.spawn(

		'Logger',

		{

			'log' : function(text){

				var l = document.getElementById('logger');

				var entry = document.createElement('p');

				entry.innerText = text;

				l.appendChild(entry);

			}


		}

	);

```

### Consume of our actor

Now, whenever we want to make an entry in our log, we just send a message to Logger

```javascript

	uzumaki.send('Logger.log', ['This is a message']);

```










