class OldHouse_SunnyHallway extends RoomCore {
	constructor() {
		super(
			"A Sunny Hallway",
			"The sunlight streams in through the windows to the east, causing dust particles in the air to glimmer while drifting between the shafts of light.",
			"The hall continues to the <strong>north</strong>. The great entry hall can be seen to the <strong>south</strong>.",
		)
	}
	north() {
		system.println("You walk north.")
		system.println("")
		player.setPosition(0, 1)
		return true
	}

	south() {
		system.println("You walk south.")
		system.println("")
		player.setPosition(0, 2)
		return true
	}
}

class OldHouse_DarkenedHallway extends RoomCore {
	constructor() {
		super(
			"A darkened hallway",
			"The heavy dark drapes over the eastern windows bring a sense of closeness to the hallway. The worn red carpet smells a little like mould.",
			"The hallway looks brighter to the <strong>south</strong>. An open oak door to the <strong>east</strong> leads out into the garden. There is a large and well-lit room to the <strong>north</strong>.",
		)
	}

	south() {
		system.println("You walk south.")
		system.println("")
		player.setPosition(0, 0)
		return true
	}

	east() {
		system.println("You walk through the door and out into the garden, blinking in the sudden harsh light.")
		system.println("")
		player.setPosition(1, 0)
		return true
	}

	north() {
		system.println("You walk north.")
		system.println("")
		player.setPosition(0, 3)
		return true
	}
}
class OldHouse_EntryHall extends RoomCore {
	constructor() {
		super("Entry Hall",
			"The ceiling of the hall is vaulted, with the light streaming in through the stained glass windows casting colorful shadows across the worn carpet.",
			"A hallway extends to the <strong>north</strong>. The door to the south does not look like it will open.",
		)
	}

	north() {
		system.println("You walk north.")
		system.println("")
		player.setPosition(0, 0)
		return true
	}
}
class OldHouse_GrandBallroom extends RoomCore {
	constructor() {
		super("Grand Ballroom",
			"The polished marble floors echo with footsteps, augmenting the already voluminous size of the ballroom. In the center of the tremendous vaulted ceiling hangs an enormous crystal chandelier, casting sparkles of light across the ornately gilded walls.",
			"A hallway extends beneath an archway to the <strong>south</strong>.",
		)
	}

	south() {
		system.println("You walk south.")
		system.println("")
		player.setPosition(0, 1)
		return true
	}
}

class BallroomItems_Pearl {
	constructor() {
		this.viewed = false
		this.keys = ["pearl", "bead"]
	}

	actions(command, commandData) {
		if (typeof (this[command]) == "function") {
			return this[command](commandData)
		}
		return false
	}

	look(commandData) {
		if (commandData.length > 0 && this.keys.includes(commanData[0])) {
			system.println("It is a shiny, opalescent pearl.")
			this.viewed = true
			return true
		}
		if (commandData.length <= 0) {
			if (this.viewed) {
				system.println("A perfect white pearl sits on the floor.")
			} else {
				system.println("A tiny white bead sits on the floor.")
			}
		}
		return false
	}

	l = this.look
	take(commandData) {
		if (this.keys.includes(commandData[0])) {
			if (this.viewed) {
				system.println("You take the pearl.")
			} else {
				system.println("You take the bead.")
			}
			system.println("")
			var item = world.takeItem(commandData[0], player.getPosition())
			player.giveItem(item)
			return true
		}
		return false
	}

	held() {
		if (this.viewed) {
			system.println("a pearl")
		} else {
			system.println("a bead")
		}
		return false
	}

	drop(commandData) {
		if (this.keys.includes(commandData[0])) {
			if (this.viewed) {
				system.println("You drop the pearl, letting it bounce across the floor to a stop.")
			} else {
				system.println("You drop the bead, letting it bounce across the floor to a stop.")
			}
			system.println("")
			var item = player.takeItem(commandData[0])
			world.giveItem(item, player.getPosition())
			return true
		}
		return false
	}
}

window.world.addZone(0, [
	OldHouse_SunnyHallway,
	OldHouse_DarkenedHallway,
	OldHouse_EntryHall,
	OldHouse_GrandBallroom,
])
window.world.addItems(0, 3, [
	BallroomItems_Pearl
])
