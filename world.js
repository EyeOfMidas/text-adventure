var World = function() {
	var roomData = [];
	this.addZone = function(index, zoneData) {
		roomData[index] = zoneData;
	};
	this.getRoom = function(zone, room) {
		return new roomData[zone][room];
	};
};
var world = new World();
