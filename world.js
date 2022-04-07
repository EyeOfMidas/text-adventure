class World {
	constructor() {
		this.roomObjs = []
		this.items = []
	}

	addZone(zoneIndex, zoneData) {
		this.roomObjs[zoneIndex] = []
		this.items[zoneIndex] = []
		for (let i = 0; i < zoneData.length; i++) {
			this.roomObjs[zoneIndex][i] = new zoneData[i]()
			this.items[zoneIndex][i] = []
		}
	}

	getRoom(zone, room) {
		return this.roomObjs[zone][room]
	}

	addItems(zone, room, roomItems) {
		for (let i = 0; i < roomItems.length; i++) {
			let roomItem = new roomItems[i]()
			this.items[zone][room].push(roomItem)
		}
	}

	printItems(zone, room) {
		let roomItems = this.items[zone][room]
		for (let i = 0; i < roomItems.length; i++) {
			roomItems[i].look()
		}
	}

	getItems(zone, room) {
		return this.items[zone][room]
	}

	takeItem(itemKey, pos) {
		let roomItems = this.getItems(pos.zone, pos.room)
		for (let i = 0; i < roomItems.length; i++) {
			if (roomItems[i].keys.includes(itemKey)) {
				let item = roomItems.splice(i, 1)
				return item[0]
			}
		}
		return null
	}
	giveItem(item, pos) {
		this.items[pos.zone][pos.room].push(item)
	}
}

var world = new World()