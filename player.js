var Player = function() {
	var currentZone = 0;
	var currentRoom = 0;
	var playerInventory = [];
	this.actions = function(command, commandData) {
		if (typeof (this[command]) == "function") {
			return this[command](commandData);
		}
		return false;
	};

	this.look = function(commandData) {
		if (commandData.length <= 0) {
			system.println("");
			return true;
		}
		return false;
	};
	this.l = this.look;

	this.inventory = function() {
		if (playerInventory.length <= 0) {
			system.println("You are not carrying anything.");
		} else {
			system.println("You are holding:");
			for (var i = 0; i < playerInventory.length; i++) {
				playerInventory[i].held();
			}
		}
		system.println("");
		return true;
	};
	this.i = this.inventory;

	this.getPosition = function() {
		return {
			zone : currentZone,
			room : currentRoom
		};
	};
	this.setPosition = function(zone, room) {
		currentZone = zone;
		currentRoom = room;
		world.getRoom(zone, room).enter();
		var items = world.getItems(zone, room);
		for (var i = 0; i < items.length; i++) {
			items[i].look([]);
		}
		system.println("");
	};
	this.getInventory = function() {
		return playerInventory;
	};
	this.giveItem = function(item) {
		playerInventory.push(item);
	};
	this.takeItem = function(itemKey) {
		for (var i = 0; i < playerInventory.length; i++) {
			if (system.in_array(itemKey, playerInventory[i].keys)) {
				var item = playerInventory.splice(i, 1);
				return item[0];
			}
		}
		return null;
	}
};
var player = new Player();
