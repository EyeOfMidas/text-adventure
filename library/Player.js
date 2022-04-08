import world from "./World.js"
import system from "./System.js"

export class Player {
	constructor() {
		this.currentZone = null
		this.currentRoom = null
		this.playerInventory = []
	}

	actions(command, commandData) {
		if (typeof (this[command]) == "function") {
			return this[command](commandData)
		}
		return false
	}

	look(commandData) {
		if (commandData.length <= 0) {
			system.println("")
			return true
		}
		return false
	}

	l = this.look
	
	inventory() {
		if (this.playerInventory.length <= 0) {
			system.println("You are not carrying anything.")
		} else {
			system.println("You are holding:")
			for (var i = 0; i < this.playerInventory.length; i++) {
				this.playerInventory[i].held()
			}
		}
		system.println("")
		return true
	}

	i = this.inventory

	getPosition() {
		return {
			zone: this.currentZone,
			room: this.currentRoom
		}
	}

	setPosition(zone, room) {
		this.currentZone = zone
		this.currentRoom = room
		world.getRoom(zone, room).enter()
		var items = world.getItems(zone, room)
		for (var i = 0; i < items.length; i++) {
			items[i].look([])
		}
		system.println("")
	}

	getInventory() {
		return this.playerInventory
	}

	giveItem(item) {
		this.playerInventory.push(item)
	}
	takeItem(itemKey) {
		for (var i = 0; i < this.playerInventory.length; i++) {
			if (this.playerInventory[i].keys.includes(itemKey)) {
				var item = this.playerInventory.splice(i, 1)
				return item[0]
			}
		}
		return null
	}

	hasItem(item) {
		return this.playerInventory.includes(item)
	}
}

var player = new Player()

export default player
