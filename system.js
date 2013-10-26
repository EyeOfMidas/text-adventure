var System = function() {
	var outputDiv = window.document.getElementById("output");
	var inputField = window.document.getElementById("input");
	var submitButton = window.document.getElementById("submit");
	this.read = function() {
		return inputField.value;
	};
	this.print = function(message) {
		outputDiv.innerHTML += message;
	};
	this.println = function(message) {
		this.print(message + "<br />\n");
	};
	this.clear = function() {
		outputDiv.innerHTML = "";
		this.clearInput();
	};
	this.clearInput = function() {
		inputField.value = "";
		inputField.focus();
		outputDiv.scrollTop = outputDiv.scrollHeight;
	};
	this.parseInput = function() {
		var commandData = this.read().split(' ');
		var command = commandData.splice(0, 1);
		command = command[0];
		var playerPos = player.getPosition();
		var room = world.getRoom(playerPos.zone, playerPos.room);

		if (!room.actions(command, commandData)) {
			if (!handleRoomItems(playerPos, command, commandData)) {
				if (!player.actions(command, commandData)) {
					if (!handleInventoryItems(command, commandData)) {
						if (!system.actions(command, commandData)) {
							system.println("I don't recognize '" + command
									+ "'.");
						}
					}
				}
			}
		}
		this.clearInput();
	};
	var handleRoomItems = function(playerPos, command, commandData) {
		var roomItems = world.getItems(playerPos.zone, playerPos.room);
		for (var i = 0; i < roomItems.length; i++) {
			if (roomItems[i].actions(command, commandData)) {
				return true;
			}
		}
		return false;
	};
	var handleInventoryItems = function(command, commandData) {
		var inventory = player.getInventory();
		for (var i = 0; i < inventory.length; i++) {
			if (inventory[i].actions(command, commandData)) {
				return true;
			}
		}
		return false;
	};
	this.title = function(newTitle) {
		document.title = newTitle;
	};
	this.init = function() {
		submitButton.addEventListener('click', function() {
			system.parseInput();
		}, false);

		document.body.addEventListener("keyup", function(event) {
			if (event.keyCode == 13) {
				system.parseInput();
			}
		}, false);

		this.clear();
		player.setPosition(1,0);
	};
	this.in_array = function(needle, haystack) {
		for (var i = 0; i < haystack.length; i++) {
			if (haystack[i] === needle) {
				return true;
			}
		}
		return false;
	};
	this.actions = function(command, commandData) {
		if (command == "debug") {
			if (commandData[0] == "inventory") {
				console.log(player.getInventory());
				return true;
			} else if (commandData[0] == "room") {
				// if(typeof commandData[1] != typeof undefined) {
				//	  
				// }
				var playerPos = player.getPosition();
				console.log("room data:", world.getRoom(playerPos.zone,
						playerPos.room));
				console.log("room items:", world.getItems(playerPos.zone,
						playerPos.room));
				return true;
			}

		}
		return false;
	}
};

var system = new System();
system.init();
