class World {
	constructor() {
		this.roomObjs = []
		this.items = []
	}

	addZone(zoneIndex, zoneData) {
		this.roomObjs[zoneIndex] = []
		this.items[zoneIndex] = []
		for (var i = 0; i < zoneData.length; i++) {
			this.roomObjs[zoneIndex][i] = new zoneData[i]()
			this.items[zoneIndex][i] = []
		}
	}

	getRoom(zone, room) {
		return this.roomObjs[zone][room]
	}

	addItems(zone, room, roomItems) {
		for (var i = 0; i < roomItems.length; i++) {
			var roomItem = new roomItems[i]()
			this.items[zone][room].push(roomItem)
		}
	}

	printItems(zone, room) {
		var roomItems = this.items[zone][room]
		for (var i = 0; i < roomItems.length; i++) {
			roomItems[i].look()
		}
	}

	getItems(zone, room) {
		return this.items[zone][room]
	}

	takeItem(itemKey, pos) {
		var roomItems = this.getItems(pos.zone, pos.room)
		for (var i = 0; i < roomItems.length; i++) {
			if (system.in_array(itemKey, roomItems[i].keys)) {
				var item = roomItems.splice(i, 1)
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
