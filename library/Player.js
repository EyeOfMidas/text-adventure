import { system, world } from "./Core.js"

export class Player {
	constructor() {
		this.currentZoneName = null
		this.currentRoomName = null
		this.playerInventory = []
	}

	_getPosition() {
		return {
			zoneName: this.currentZoneName,
			roomName: this.currentRoomName,
		}
	}

	_setPosition(zone, room) {
		if(this.currentRoomName) {
			let currentRoom = world._getRoom(this.currentZoneName, this.currentRoomName)
			if(typeof currentRoom.leave == "function") {
				currentRoom.leave()
			}
		}
		
		this.currentZoneName = zone.name
		this.currentRoomName = room.name
		this._save()
		world._getRoom(zone.name, room.name)._enter()
		var items = world._getItems(zone.name, room.name)
		for (var i = 0; i < items.length; i++) {
			items[i].look([])
		}
		system._println("")
	}

	_load(defaultZone, defaultRoom, defaultInventory) {
		
		let saveObj = JSON.parse(localStorage.getItem('text-adventure-save')) ?? {currentZoneName: defaultZone.name, currentRoomName: defaultRoom.name, playerInventory: defaultInventory}
		let zone = world._getZoneClass(saveObj.currentZoneName)
		let room = world._getRoomClass(saveObj.currentZoneName, saveObj.currentRoomName)
		
		saveObj.playerInventory.forEach(item => {
			let itemTemp = new (world._getItemClass(item.zone, item.name))()
			let takenItem = world._takeItem(itemTemp.keys[0], {zoneName: item.origin.zone, roomName: item.origin.room})
			takenItem._load(item)
			player._giveItem(takenItem)
		})
		this._setPosition(zone, room)
	}

	_save() {
		let saveObj = {
			currentZoneName: this.currentZoneName,
			currentRoomName: this.currentRoomName,
			playerInventory: this.playerInventory.map(item => item._save()),
		}
		localStorage.setItem('text-adventure-save', JSON.stringify(saveObj))
	}

	_getInventory() {
		return this.playerInventory
	}

	_giveItem(item) {
		this.playerInventory.push(item)
		this._save()
	}
	_takeItem(itemKey) {
		for (var i = 0; i < this.playerInventory.length; i++) {
			if (this.playerInventory[i].keys.includes(itemKey)) {
				var item = this.playerInventory.splice(i, 1)
				this._save()
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
