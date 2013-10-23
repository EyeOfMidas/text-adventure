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
		var command = commandData.splice(0,1);
		var playerPos = player.getPosition();
		var room = world.getRoom(playerPos.zone, playerPos.room);
		if(typeof(room[command]) == "function") {
			room[command](commandData);
		} else {
			if(!player.action(command, commandData)) {
				this.println("I don't understand what '" + command + "' means.");
			}
		}
		this.clearInput();
	};
	this.title = function(newTitle) {
		document.title = newTitle;
	};
	this.init = function() {
		submitButton.addEventListener('click', function() {
			system.parseInput();
		}, false);

		document.body.addEventListener("keyup", function(event) {
			if(event.keyCode == 13) {
				system.parseInput();
			}
		}, false);
	
	this.clear();
	world.getRoom(0, 0).enter();
};
};

var system = new System();
system.init();

