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
		player.setPosition(0, 1)
		return true
	}
}

class GardenItems_Pansy {
	constructor() {
		this.keys = ["flower", "pansy"]
	}

	actions(command, commandData) {
		if (typeof (this[command]) == "function") {
			return this[command](commandData)
		}
		return false
	}

	look(commandData) {
		if (commandData.length > 0 && system.in_array(commandData[0], this.keys)) {
			system.println("The small purple pansy looks limp.")
			return true
		}
		if (commandData.length <= 0) {
			system.println("A small flower wilts on the ground.")
		}
		return false
	}
	l = this.look
	take(commandData) {
		if (system.in_array(commandData[0], this.keys)) {
			system.println("You carefully put the flower in your pocket.")
			system.println("")
			var item = world.takeItem(commandData[0], player.getPosition())
			player.giveItem(item)
			return true
		}
		return false
	}

	held() {
		system.println("a flower")
		return false
	}

	drop(commandData) {
		if (system.in_array(commandData[0], this.keys)) {
			system.println("You let the flower fall to the floor.")
			system.println("")
			var item = player.takeItem(commandData[0])
			world.giveItem(item, player.getPosition())
			return true
		}
		return false
	}
}

world.addZone(1, [Garden_Patio]);
world.addItems(1, 0, [GardenItems_Pansy]);
