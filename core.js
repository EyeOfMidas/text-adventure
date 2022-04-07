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
		roomItems.forEach(itemClass => {
			this.items[zone][room.name].push(new itemClass())
		})
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

class RoomCore {
    constructor(title, description, exitsDescription) {
        this.title = title
        this.description = description
        this.exitsDescription = exitsDescription
        this.visited = false
    }

    actions(command, commandData) {
        if (command in this) {
            return this[command](commandData)
        }
        return false
    }

    enter() {
        system.title(this.title)
        system.println(`<strong>${this.title}</strong>`)
        if (!this.visited) {
            system.println(this.description)
            system.println(this.exitsDescription)
            this.visited = true
        }
    }

    look(commandData) {
        if (!commandData || commandData.length <= 0) {
            system.println("You look around.")
            system.println("")
            system.println(this.description)
            system.println(this.exitsDescription)
        }
        return false
    }

    north() {
        system.println("I can't go north.")
        system.println("")
        return true
    }

    south() {
        system.println("I can't go south.")
        system.println("")
        return true
    }

    east() {
        system.println("I can't go east.")
        system.println("")
        return true
    }

    west() {
        system.println("I can't go west.")
        system.println("")
        return true
    }

    n = this.north
    s = this.south
    e = this.east
    w = this.west

    l = this.look
}


class ItemCore {
    constructor(keys, lookText, lookAtText, takeText, heldText, dropText) {
		this.keys = keys
        this.lookText = lookText
        this.lookAtText = lookAtText
        this.takeText = takeText
        this.heldText = heldText
        this.dropText = dropText
	}

	actions(command, commandData) {
		if (typeof (this[command]) == "function") {
			return this[command](commandData)
		}
		return false
	}

	look(commandData) {
		if (commandData.length > 0 && this.keys.includes(commandData[0])) {
			system.println(this.lookAtText)
			return true
		}
		if (commandData.length <= 0) {
			system.println(this.lookText)
		}
		return false
	}
	l = this.look
	take(commandData) {
		if (this.keys.includes(commandData[0])) {
			system.println(this.takeText)
			system.println("")
			var item = world.takeItem(commandData[0], player.getPosition())
			player.giveItem(item)
			return true
		}
		return false
	}

    get = this.take

	held() {
		system.println(this.heldText)
		return false
	}

	drop(commandData) {
		if (this.keys.includes(commandData[0])) {
			system.println(this.dropText)
			system.println("")
			var item = player.takeItem(commandData[0])
			world.giveItem(item, player.getPosition())
			return true
		}
		return false
	}
}

class Player {
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
}

class System {
	constructor() {
		this.outputDiv = window.document.getElementById("output")
		this.inputField = window.document.getElementById("input")
		this.submitButton = window.document.getElementById("submit")
	}

	init() {
		this.submitButton.addEventListener('click', () => {
			this.parseInput()
		}, false)

		document.body.addEventListener("keyup", (event) => {
			switch (event.key) {
				case "Enter":
					this.parseInput()
					break;
			}
		}, false)

		this.clear()
		player.setPosition("OldHouse", OldHouse_EntryHall)

	}

	read() {
		return this.inputField.value
	}

	print(message) {
		this.outputDiv.innerHTML += message
	}

	println(message) {
		this.print(message + "<br />\n")
	}

    log() {
        [...arguments].forEach(argument => {
            this.print(JSON.stringify(argument))
        })
        this.println("")
    }

	clear() {
		this.outputDiv.innerHTML = ""
		this.clearInput()
	}

	clearInput() {
		this.inputField.value = ""
		this.inputField.focus()
		this.outputDiv.scrollTop = this.outputDiv.scrollHeight
	}

	parseInput() {
		let commandData = this.read().split(' ')
		let command = commandData.splice(0, 1)
		command = command[0]
		let playerPos = player.getPosition()
		let room = world.getRoom(playerPos.zone, playerPos.room)

		if (!room.actions(command, commandData)) {
			if (!this.handleRoomItems(playerPos, command, commandData)) {
				if (!player.actions(command, commandData)) {
					if (!this.handleInventoryItems(command, commandData)) {
						if (!this.actions(command, commandData)) {
							this.println(`I don't recognize '${command}'.`)
						}
					}
				}
			}
		}
		this.clearInput()
	}

	handleRoomItems(playerPos, command, commandData) {
		let roomItems = world.getItems(playerPos.zone, playerPos.room)
		for (let i = 0; i < roomItems.length; i++) {
			if (roomItems[i].actions(command, commandData)) {
				return true
			}
		}
		return false
	}

	handleInventoryItems(command, commandData) {
		let inventory = player.getInventory()
		for (let i = 0; i < inventory.length; i++) {
			if (inventory[i].actions(command, commandData)) {
				return true
			}
		}
		return false
	}

	title(newTitle) {
		document.title = newTitle
	}

	actions(command, commandData) {
		if (command == "debug") {
            let playerInventory = player.getInventory()
            let playerPos = player.getPosition()
            switch(commandData[0]) {
                case "inventory":
                    this.log("player inventory:", playerInventory)
                    break;
                case "room":
                    this.log("room data:", world.getRoom(playerPos.zone, playerPos.room))
				    this.log("room items:", world.getItems(playerPos.zone, playerPos.room))
                    break;
                default:
                    this.log("player inventory:", playerInventory)
                    this.log("room data:", world.getRoom(playerPos.zone, playerPos.room))
				    this.log("room items:", world.getItems(playerPos.zone, playerPos.room))
                    break;
            }
            return true

		}
		return false
	}
}

var world = new World()
var player = new Player()
var system = new System()

