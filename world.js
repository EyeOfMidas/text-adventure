var World = function() {
	var roomObjs = [];
	var items = [];
	this.addZone = function(zoneIndex, zoneData) {
		roomObjs[zoneIndex] = [];
		items[zoneIndex] = [];
		for(var i = 0; i < zoneData.length; i++) {
			roomObjs[zoneIndex][i] = new zoneData[i]();
			items[zoneIndex][i] = [];
		}
	};
	this.getRoom = function(zone, room) {
		return roomObjs[zone][room];
	};
	this.addItems = function(zone, room, roomItems) {
		for(var i = 0; i < roomItems.length; i++) {
			var roomItem = new roomItems[i]();
			items[zone][room].push(roomItem);
		}
	};
	this.printItems = function(zone, room) {
		var roomItems = items[zone][room];
		for(var i = 0; i < roomItems.length; i++) {
			roomItems[i].look();
		}
	};
	this.getItems = function(zone, room) {
		return items[zone][room];
	};
	this.takeItem = function(itemKey, pos) {
		var roomItems = this.getItems(pos.zone, pos.room);
		for(var i = 0; i < roomItems.length; i++) {
			if(system.in_array(itemKey, roomItems[i].keys)) {
				var item = roomItems.splice(i, 1);
				return item[0];
			}
		}
		return null;
	};
	this.giveItem = function(item, pos) {
		items[pos.zone][pos.room].push(item);
	};
};
var world = new World();
