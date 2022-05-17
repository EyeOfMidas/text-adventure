import { player, world } from "./Core.js"

export class System {
	constructor() {
		this.outputDiv = window.document.getElementById("output")
		this.inputField = window.document.getElementById("input")
		this.form = window.document.getElementById("form")
	}

	init() {
		this.form.addEventListener(
			"submit",
			(event) => {
				this.parseInput()
			},
			false
		)

		this.clear()
	}

	read() {
		return this.inputField.value
	}

	print() {
		this.outputDiv.innerHTML += [...arguments].join(" ")
	}

	println() {
		let message = [...arguments].join(" ")
		if (message == "") {
			message = "&nbsp;"
		}
		this.print(`<div class="line">${message}</div>\n`)
	}

	log() {
		;[...arguments].forEach((argument) => {
			this.print(`<pre>${JSON.stringify(argument, null, 2)}</pre>`)
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
		let commandData = this.read().split(" ")
		let command = commandData.splice(0, 1)
		command = command[0]
		let playerPos = player.getPosition()
		let room = world.getRoom(playerPos.zone, playerPos.room)

		if (!room.actions(command, commandData)) {
			if (!this.handleRoomItems(playerPos, command, commandData)) {
				if (!this.handleInventoryItems(command, commandData)) {
					if (!this.actions(command, commandData)) {
						this.println(`I don't recognize '${command}'.`)
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

	printRoomItems() {
		let playerPos = player.getPosition()
		let roomItems = world.getItems(playerPos.zone, playerPos.room)
		roomItems.forEach((item) => {
			item.look()
		})
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

	getItemsByKey(commandData) {
		return [
			...player.getItemsByKey(commandData),
			...world.getItemsByKey(commandData, player.getPosition()),
		]
	}

	actions(command, commandData) {
		if (command in this) {
			return this[command](commandData)
		}
		return false
	}

	look(commandData) {
		if (commandData.length > 0) {
			this.println(`I don't see '${commandData[0]}'.`)
			this.println("")
			return true
		}
		return false
	}

	inventory(commandData) {
		let playerInventory = player.getInventory()
		if (playerInventory.length <= 0) {
			this.println("You are not carrying anything.")
		} else {
			this.println("You are holding:")
			for (let itemIndex in playerInventory) {
				playerInventory[itemIndex].held()
			}
		}
		system.println("")
		return true
	}

	take(commandData) {
		if (commandData.length > 0) {
			this.println(`I don't see '${commandData[0]}' to take.`)
			this.println("")
			return true
		}
		this.println(`take what?`)
		this.println("")
		return true
	}

	drop(commandData) {
		if (commandData.length > 0) {
			this.println(`I can't drop '${commandData[0]}'.`)
			this.println("")
			return true
		}
		this.println(`drop what?`)
		this.println("")
		return true
	}

	open(commandData) {
		if (commandData.length > 0) {
			this.println(`I can't open '${commandData[0]}'`)
			this.println("")
			return true
		}
		this.println(`open what?`)
		this.println("")
		return true
	}

	close(commandData) {
		if (commandData.length > 0) {
			this.println(`I can't close '${commandData[0]}'`)
			this.println("")
			return true
		}
		this.println(`close what?`)
		this.println("")
		return true
	}

	help(commandData) {
		this.println(
			"This game is played by typing simple commands to describe what you want to do."
		)
		this.println(
			"If you want to see a room, type <strong>look</strong>. You can examine items by typing <strong>look [item]</strong>."
		)
		this.println(
			"You can travel around by typing directions such as <strong>north</strong> or <strong>s</strong> (for south)."
		)
		this.println(
			"Most other actions can be done if they're in context. You can <strong>take</strong> and <strong>drop</strong> items,",
			"and sometimes do unique things, such as <strong>water flower</strong> or <strong>waltz</strong> based on what you have or where you are."
		)
		this.println("")
		return true
	}

	debug(commandData) {
		let playerInventory = player.getInventory()
		let playerPos = player.getPosition()
		switch (commandData[0]) {
			case "inventory":
				this.log("player inventory:", playerInventory)
				break
			case "room":
				this.log(
					"room data:",
					world.getRoom(playerPos.zone, playerPos.room)
				)
				this.log(
					"room items:",
					world.getItems(playerPos.zone, playerPos.room)
				)
				break
			default:
				this.log("player inventory:", playerInventory)
				this.log(
					"room data:",
					world.getRoom(playerPos.zone, playerPos.room)
				)
				this.log(
					"room items:",
					world.getItems(playerPos.zone, playerPos.room)
				)
				break
		}
		return true
	}

	l = this.look
	i = this.inventory
	get = this.take
}
var system = new System()
export default system
