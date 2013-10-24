var oldhouse = [];
oldhouse[0] = function() {
	var title = "A sunny hallway";
	var description = "The sunlight streams in through the windows to the east, causing dust particles in the air to glimmer while drifting between the shafts of light.";
	var exitsDescription = "The hall continues to the <strong>north</strong>. The great entry hall can be seen to the <strong>south</strong>.";
	this.enter = function() {
		system.title(title);
		player.setPosition(0, 0);
		system.println("<strong>" + title + "</strong>");
		system.println(description);
		system.println(exitsDescription);
		system.println("");
	};
	this.north = function() {
		system.println("You walk north.");
		system.println("");
		world.getRoom(0, 1).enter();
	};
	this.n = this.north;
	
	this.south = function() {
		system.println("You walk south.");
		system.println("");
		world.getRoom(0, 2).enter();
	};
	this.s = this.south;
	this.look = function() {
		system.println("You look around.");
		system.println("");
		system.println(description);
		system.println(exitsDescription);
		system.println("");
	};
	this.go = function(direction) {
		if (direction == "north") {
			this.north();
		} else {
			system.println("I can't move in that direction.");
		}
	};
};
oldhouse[1] = function() {
	var title = "A darkened hallway";
	var description = "The heavy dark drapes over the eastern windows bring a sense of closeness to the hallway. The worn red carpet smells a little like mould.";
	var exitsDescription = "The hallway looks brighter to the <strong>south</strong>. An open oak door to the <strong>east</strong> leads out into the garden. There is a large and well-lit room to the <strong>north</strong>.";
	this.enter = function() {
		system.title(title);
		player.setPosition(0, 1);
		system.println("<strong>" + title + "</strong>");
		system.println(description);
		system.println(exitsDescription);
		system.println("");
	};
	this.south = function() {
		system.println("You walk south.");
		system.println("");
		world.getRoom(0, 0).enter();
	};
	this.s = this.south;
	this.east = function() {
		system.println("You walk through the door and out into the garden, blinking in the sudden harsh light.");
		system.println("");
		world.getRoom(1, 0).enter();
	};
	this.e = this.east;
	
	this.north = function() {
		system.println("You walk north.");
		system.println("");
		world.getRoom(0, 3).enter();
	};
	this.n = this.north;
	
	this.look = function() {
		system.println("You look around.");
		system.println("");
		system.println(description);
		system.println(exitsDescription);
		system.println("");
	};
};
oldhouse[2] = function() {
	var title = "Entry Hall";
	var description = "The ceiling of the hall is vaulted, with the light streaming in through the stained glass windows casting colorful shadows across the worn carpet.";
	var exitsDescription = "A hallway extends to the <strong>north</strong>. The door to the south does not look like it will open.";
	this.enter = function() {
		system.title(title);
		player.setPosition(0, 2);
		system.println("<strong>" + title + "</strong>");
		system.println(description);
		system.println(exitsDescription);
		system.println("");
		
	};
	this.north = function() {
		system.println("You walk north.");
		system.println("");
		world.getRoom(0, 0).enter();
	};
	this.n = this.north;
	
	this.look = function() {
		system.println("You look around.");
		system.println("");
		system.println(description);
		system.println(exitsDescription);
		system.println("");
	};
};
oldhouse[3] = function() {
	var title = "Grand Ballroom";
	var description = "The polished marble floors echo with footsteps, augmenting the already voluminous size of the ballroom. In the center of the tremendous vaulted ceiling hangs an enormous crystal chandelier, casting sparkles of light across the ornately gilded walls.";
	var exitsDescription = "A hallway extends beneath an archway to the <strong>south</strong>.";
	this.enter = function() {
		system.title(title);
		player.setPosition(0, 3);
		system.println("<strong>" + title + "</strong>");
		system.println(description);
		system.println(exitsDescription);
		system.println("");
		
	};
	this.south = function() {
		system.println("You walk south.");
		system.println("");
		world.getRoom(0, 1).enter();
	};
	this.s = this.south;
	
	this.look = function() {
		system.println("You look around.");
		system.println("");
		system.println(description);
		system.println(exitsDescription);
		system.println("");
	};
};

world.addZone(0, oldhouse);
