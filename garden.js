class Garden_Patio extends RoomCore {
	constructor() {
		super(
			"A lush outdoor garden",
			"The warmth of the sun falls on the brick patio, radiating heat in the walled garden. The smell of vines and flowers permeate the air.",
			"An old oak door opens into the house to the <strong>west</strong>.",
		)
	}

	west() {
		system.println("You enter the house.")
		system.println("")
		system.println("You blink as your eyes adjust to the darkness.")
		player.setPosition("OldHouse", OldHouse_DarkenedHallway)
		return true
	}
}

class GardenItems_Pansy extends ItemCore {
	constructor() {
		super(
			["flower", "pansy"],
			"A small flower wilts on the ground.",
			"The small purple pansy looks limp.",
			"You carefully put the flower in your pocket.",
			"a flower",
			"You let the flower fall to the floor."
		)
	}
}

world.addZone("Garden", [Garden_Patio]);
world.addItems("Garden", Garden_Patio, [GardenItems_Pansy]);
