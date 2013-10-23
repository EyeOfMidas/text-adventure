var garden = [];
garden[0] = function(){
	var title = "A lush outdoor garden";
	var description = "The warmth of the sun falls on the brick patio, radiating heat in the walled garden. The smell of vines and flowers permeate the air.";
	var exitsDescription = "An old oak door opens into the house to the <strong>east</strong>.";
	this.enter = function() {
		system.title(title);
		player.setPosition(1,0);
		system.println("<strong>" + title + "</strong>");
		system.println(description);
		system.println(exitsDescription);
		system.println("");
	};
	this.east = function() {
		system.println("You enter the house.");
		system.println("");
		system.println("You blink as your eyes adjust to the darkness.");
		world.getRoom(0, 1).enter();
	}
	this.look = function() {
		system.println("You look around.");
		system.println("");
		system.println(description);
		system.println(exitsDescription);
		system.println("");
	};
};

world.addZone(1, garden);
