class World {
	constructor() {
		this.roomObjs = {}
		this.items = {}
	}

	addZone(zone, zoneData) {
		this.roomObjs[zone] = []
		this.items[zone] = []
		zoneData.forEach(roomClass => {
			this.roomObjs[zone][roomClass.name] = new roomClass()
			this.items[zone][roomClass.name] = []
		})
	}

	getRoom(zone, room) {
		return this.roomObjs[zone][room.name]
	}

	addItems(zone, room, roomItems) {
		for (let i = 0; i < roomItems.length; i++) {
			let roomItem = new roomItems[i]()
			this.items[zone][room.name].push(roomItem)
		}
	}

	getItems(zone, room) {
		return this.items[zone][room.name]
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
		this.items[pos.zone][pos.room.name].push(item)
	}
}

var world = new World()