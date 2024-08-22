import { system, world } from "./Core.js"

export class Player {
	constructor() {
		this.currentZone = null
		this.currentRoom = null
		this.playerInventory = []
	}

	_getPosition() {
		return {
			zone: this.currentZone,
			room: this.currentRoom,
		}
	}

	_setPosition(zone, room) {
		if(this.currentRoom) {
			let currentRoom = world._getRoom(this.currentZone.name, this.currentRoom.name)
			if(typeof currentRoom.leave == "function") {
				currentRoom.leave()
			}
		}
		
		this.currentZone = zone
		this.currentRoom = room
		world._getRoom(zone.name, room.name)._enter()
		var items = world._getItems(zone, room)
		for (var i = 0; i < items.length; i++) {
			items[i].look([])
		}
		system._println("")
	}

	_getInventory() {
		return this.playerInventory
	}

	_giveItem(item) {
		this.playerInventory.push(item)
	}
	_takeItem(itemKey) {
		for (var i = 0; i < this.playerInventory.length; i++) {
			if (this.playerInventory[i].keys.includes(itemKey)) {
				var item = this.playerInventory.splice(i, 1)
				return item[0]
			}
		}
		return null
	}

	_hasItem(item) {
		return this.playerInventory.includes(item)
	}

	_getItemsByKey(commandData) {
		return this.playerInventory.filter((item) =>
			item.keys.includes(commandData[0])
		)
	}
}

var player = new Player()

export default player
