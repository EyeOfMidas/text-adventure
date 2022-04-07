import player from "./Player.js"
import world from "./World.js"

export class System {
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
var system = new System()
export default system