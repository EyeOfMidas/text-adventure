var oldhouse = [];
oldhouse[0] = function() {
	var title = "A sunny hallway";
	var description = "The sunlight streams in through the windows to the east, causing dust particles in the air to light up.";
	var exitsDescription = "The hall continues to the <strong>north</strong>.";
	this.enter = function() {
		system.title(title);
		player.setPosition(0,0);
		system.println("<strong>" + title + "</strong>");
		system.println(description);
		system.println(exitsDescription);
		system.println("");
	};
	this.north = function() {
		system.println("You walk north.");
		system.println("");
		world.getRoom(0,1).enter();
	};
	this.look = function() {
		system.println("You look around.");
		system.println("");
		system.println("The sunlight streams in through the windows to the east, causing dust particles in the air to light up.");
		system.println(exitsDescription);
		system.println("");
	};
	this.go = function(direction) {
		if(direction == "north") {
			this.north();
		} else {
			system.println("I can't move in that direction.");
		}
	};
	this.n = function() {
		this.north();
	};
};
oldhouse[1] = function() {
	var title = "A darkened hallway";
	var description = "The heavy dark drapes over the eastern windows bring a sense of closeness to the hallway. The worn red carpet smells a little like mould.";
	var exitsDescription = "The hallway looks brighter to the <strong>south</strong>. An open oak door to the <strong>west</strong> leads out into the garden.";
	this.enter = function() {
		system.title(title);
		player.setPosition(0,1);
		system.println("<strong>" + title + "</strong>");
		system.println(description);
		system.println(exitsDescription);
		system.println("");
	};
	this.south = function() {
		system.println("You walk south.");
		system.println("");
		world.getRoom(0,0).enter();
	};
	this.west = function() {
		system.println("You walk through the door and out into the garden, blinking in the sudden harsh light.");
		system.println("");
		world.getRoom(1,0).enter();
	};
	this.look = function() {
		system.println("You look around.");
		system.println("");
		system.println(description);
		system.println(exitsDescription);
		system.println("");
	};
};

world.addZone(0, oldhouse);
