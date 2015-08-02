var ParametricReturn = require('./return.js').ParametricReturn;

function uzify(api, actor){

	var api_z =  new ApiZ(actor);

	transformObject(api, api_z);

	return api_z;

}


function transformObject(api, api_z){

	Object.keys(api).forEach(function(messageName){

		if(typeof(api[messageName]) !== 'function'){

			api_z[messageName] = api[messageName];

			return;
		}

		var code = api[messageName];

		api_z[messageName] = function(message){

			var ret;

			try{
				ret = code.apply(this, message.args);
			}
			catch(e){
				ret = e;
			}

			if(message.callback){
				message.callback(ret);
			}	
			else{
				return ret;
			}


		}.bind(api_z);

	}.bind(api_z));
}


/*API code*/

function ApiZ(actor){

	this.uz = new Uz(actor);

}


ApiZ.prototype = {


};


/*Uz object*/

function Uz(actor){

	this.__refActor = actor;

}

Uz.prototype = {

	'r' : function(){

		var args = Array.prototype.slice.call(arguments);

		return new ParametricReturn(args.shift(), args);
	}


};


module.exports.uzify = uzify;
