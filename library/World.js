export class World {
	constructor() {
		this.zoneClasses = {}
		this.roomClasses = {}
		this.roomObjs = {}
		this.items = {}
		this.itemClasses = {}
	}

	_addZone(zone) {
		this.zoneClasses[zone.name] = zone
		this.roomObjs[zone.name] = []
		this.roomClasses[zone.name] = []
		this.itemClasses[zone.name] = []
		this.items[zone.name] = []
		Object.values(zone.Rooms).forEach((roomClass) => {
			this.roomClasses[zone.name][roomClass.name] = roomClass
			this.roomObjs[zone.name][roomClass.name] = new roomClass()
			this.items[zone.name][roomClass.name] = []
		})
		Object.values(zone.Items).forEach((itemClass) => {
			this.itemClasses[zone.name][itemClass.name] = itemClass
		})
	}

	_getZoneClass(zoneName) {
		return this.zoneClasses[zoneName]
	}

	_getRoom(zoneName, roomName) {
		return this.roomObjs[zoneName][roomName]
	}

	_getRoomClass(zoneName, roomName) {
		return this.roomClasses[zoneName][roomName]
	}


	_spawnItems(zone, room, roomItems) {
		let addedItems = []
		roomItems.forEach(itemClass => {
			let itemInstance = new itemClass(itemClass.name)
			itemInstance._setOrigin(zone.name, room.name)
			addedItems.push(itemInstance)
			this.items[zone.name][room.name].push(itemInstance)
		})
		return addedItems
	}

	_getItems(zoneName, roomName) {
		return this.items[zoneName][roomName]
	}

	_getItemClass(zoneName, itemName) {
		return this.itemClasses[zoneName][itemName]
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
