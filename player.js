var Player = function() {
	var currentZone = 0;
	var currentRoom = 0;
	this.action = function(command, commandData) {
		return false;
	};
	this.getPosition = function() {
		return {
			zone : currentZone,
			room : currentRoom
		};
	};
	this.setPosition = function(zone, room) {
		currentZone = zone;
		currentRoom = room;
	};
};
var player = new Player();
