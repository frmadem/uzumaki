(function(){

	uzumaki.core.ComponentUz = function(name, object){

		this.name = function(){
			return name;
		};

		this.object = function(){
			return object;
		};

		this.__state = "READY";

		this.__callStack = [];

		this.__api = {};

	};

	/*
         * ComponentUz's prototype
         */

	var p = uzumaki.core.ComponentUz.prototype;

	p.state = function(newState){

		if(newState !== undefined)
			this.__state = newState;
		else
			return this.__state;

	};

	p.identify = function(){

		return "Actor \'" + this.name() + "\'";

	};

	p.stackCall = function(call){

		if(call === undefined)
			throw 'uzumaki.core.ComponentUz.stackCall: call is undefined ' + this.identify();

		this.__callStack.push(call);
	};

	p.callStack = function(){

		return this.__callStack;

	};

	p.registerNewCall = function(call, code){

		if(call === undefined)
			throw 'uzumaki.core.ComponentUz.registerNewCall: call is undefined ' + this.identify();

		if(code === undefined || typeof(code) !== 'function')
			throw 'uzumaki.core.ComponentUz.registerNewCall: code is undefined or not a function ' + this.identify;

		this.__api[call] = code;
	};	

	p.message = function(call, args, callback){

		if(this.__api[call] === undefined)
			throw 'uzumaki.core.ComponentUz: call not registered in ' + this.identify() + ": \'" + call + "\'";

		if(this.state() === 'BUSY'){
			this.callStack([call, args, callback]);
		}
		else{

			var ret = this.__api[call].apply(this.object(), args);

			if(callback)
				callback.call(callback, ret);
			else
				return ret;
		}

	};

	p.describe = function(){

		return Object.keys(this.__api);

	};
	

}());
