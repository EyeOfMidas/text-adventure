import { system, world } from "./Core.js"

export class Player {
	constructor() {
		this.currentZone = null
		this.currentRoom = null
		this.playerInventory = []
	}

	getPosition() {
		return {
			zone: this.currentZone,
			room: this.currentRoom,
		}
	}

	setPosition(zone, room) {
		if(this.currentRoom) {
			let currentRoom = world.getRoom(this.currentZone, this.currentRoom)
			if(typeof currentRoom.leave == "function") {
				currentRoom.leave()
			}
		}
		
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

	getItemsByKey(commandData) {
		return this.playerInventory.filter((item) =>
			item.keys.includes(commandData[0])
		)
	}
}

var player = new Player()

export default player
