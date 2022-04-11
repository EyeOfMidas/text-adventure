export class World {
	constructor() {
		this.roomObjs = {}
		this.items = {}
	}

	addZone(zone, zoneData) {
		this.roomObjs[zone.name] = []
		this.items[zone.name] = []
		zoneData.forEach(roomClass => {
			this.roomObjs[zone.name][roomClass.name] = new roomClass()
			this.items[zone.name][roomClass.name] = []
		})
	}

	getRoom(zone, room) {
		return this.roomObjs[zone.name][room.name]
	}

	addItems(zone, room, roomItems) {
		roomItems.forEach(itemClass => {
			this.items[zone.name][room.name].push(new itemClass())
		})
	}

	getItems(zone, room) {
		return this.items[zone.name][room.name]
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
		this.getItems(pos.zone, pos.room).push(item)
	}

	getItemsByKey(commandData, pos) {
		return this.getItems(pos.zone, pos.room).filter((item) => item.keys.includes(commandData[0]))
	}
}

var world = new World()
export default world