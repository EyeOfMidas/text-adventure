export class World {
	constructor() {
		this.roomObjs = {}
		this.items = {}
	}

	_addZone(zone, zoneData) {
		this.roomObjs[zone.name] = []
		this.items[zone.name] = []
		zoneData.forEach((roomClass) => {
			this.roomObjs[zone.name][roomClass.name] = new roomClass()
			this.items[zone.name][roomClass.name] = []
		})
	}

	_getRoom(zoneName, roomName) {
		return this.roomObjs[zoneName][roomName]
	}

	_addItems(zone, room, roomItems) {
		roomItems.forEach((itemClass) => {
			this.items[zone.name][room.name].push(new itemClass())
		})
	}

	_getItems(zoneName, roomName) {
		return this.items[zoneName][roomName]
	}

	_takeItem(itemKey, pos) {
		let roomItems = this._getItems(pos.zoneName, pos.roomName)
		for (let i = 0; i < roomItems.length; i++) {
			if (roomItems[i].keys.includes(itemKey)) {
				let item = roomItems.splice(i, 1)
				return item[0]
			}
		}
		return null
	}
	_giveItem(item, pos) {
		this._getItems(pos.zoneName, pos.roomName).push(item)
	}

	_getItemsByKey(commandData, pos) {
		return this._getItems(pos.zoneName, pos.roomName).filter((item) =>
			item.keys.includes(commandData[0])
		)
	}
}

var world = new World()
export default world
