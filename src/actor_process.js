//actor sitting in process
var Actor = require('./actor.js');
var Child = require('child_process');

function ActorInProcess(name, modulePath){

	this.name = function(){
		return name;
	};

	this.modulePath = modulePath;
	
}

ActorInProcess.prototype = Object.create(Actor.prototype);

ActorInProcess.prototype.constructor = ActorInProcess;

var p = ActorInProcess.prototype;

p.start = function(){

	var child = Child.fork(

		this.modulePath

	);

	this.ctl = child;

};

module.exports= ActorInProcess;

