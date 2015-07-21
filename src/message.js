function Message(name, args, callback){

	this.name = name;
	this.args = args;
	this.callback = callback;

	this.type = this.__type();
}



var p = Message.prototype;

p.serialize = function(){

	return JSON.stringify(this, functionSerializer);

};

p.unserialize = function(string){

	var data = JSON.parse(string, functionUnserializer);

	this.name = data.name;
	this.args = data.args;
	this.callback = data.callback;

	return this;

};

p.__type = function(){ 

	return 'NORMAL'; 

};

//functions to and from text
function functionSerializer(key, value) {
    
	if (typeof(value) === 'function') {
        	return value.toString();
    	}
    	return value;
}

function functionUnserializer(key, value) {
    
	if (key === "") return value;
    
    	if (typeof value === 'string') {
        	var rfunc = /function[^\(]*\(([^\)]*)\)[^\{]*{([^\}]*)\}/,
            	match = value.match(rfunc);
        
        	if (match) {
            		var args = match[1].split(',').map(function(arg) { return arg.replace(/\s+/, ''); });
            	return new Function(args, match[2]);
        	}
    	}
    
	return value;
}
 
module.exports = Message;
