var world = world || [];

var system = {
	outputDiv: window.document.getElementById("output"),
	inputField: window.document.getElementById("input"),
	submitButton: window.document.getElementById("submit"),
	read: function() {
		return this.inputField.value;
	},
	print: function(message) {
		this.outputDiv.innerHTML += message;
	},
	println: function(message) {
		this.print(message + "<br />\n");
	},
	clear: function() {
		this.outputDiv.innerHTML = "";
		this.clearInput();
	},
	clearInput: function() {
		this.inputField.value = "";
		this.inputField.focus();
		this.outputDiv.scrollTop = this.outputDiv.scrollHeight;
	}
};
var player = {
	currentZone: 0,
	currentRoom: 0
};

var submit = function() {
	var commandString = system.read();
	var commandData = commandString.split(' ');
	var command = commandData.splice(0,1);
	var room = world[state.currentZone][state.currentRoom];
	if(typeof(room[command]) == "function") {
		room[command](commandData);
	} else {
		if(!player.action(command)) {
			system.println("I don't understand what '" + command + "' means.");
		}
	}
	system.clearInput();
};

var init = function() {
	system.submitButton.addEventListener('click', function() {
		submit();
	}, false);

document.body.addEventListener("keyup", function(event) {
		if(event.keyCode == 13) {
			submit();
		}
	}, false);
	
	system.clear();
	world[0][0].enter();
};

init();

