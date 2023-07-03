import { player, world } from "./Core.js"

export class System {
	constructor() {
		this._outputDiv = window.document.getElementById("output")
		this._inputField = window.document.getElementById("input")
		this._form = window.document.getElementById("form")
		this._settings = {
			zipmode: false,
			hintmode: false,
		}
	}

	_init() {
		this._form.addEventListener("submit", () => { this._parseInput() }, false)
		this.clear()
	}

	_read() {
		return this._inputField.value
	}

	_print() {
		this._outputDiv.innerHTML += [...arguments].join(" ")
	}

	_println() {
		let message = [...arguments].join(" ")
		if (message == "") {
			message = "&nbsp;"
		}
		this._print(`<div class="line">${message}</div>\n`)
		this._outputDiv.scrollTop = this._outputDiv.scrollHeight
	}

	_log() {
		;[...arguments].forEach((argument) => {
			this._print(`<pre>${JSON.stringify(argument, null, 2)}</pre>`)
		})
		this._println("")
	}

	clear() {
		this._outputDiv.innerHTML = ""
		this._clearInput()
		return true
	}

	_clearInput() {
		this._inputField.value = ""
		this._inputField.focus()
		this._outputDiv.scrollTop = this._outputDiv.scrollHeight
	}

	_parseInput() {
		let commandData = this._read().split(" ")
		let command = commandData.splice(0, 1)
		command = command[0]
		let playerPos = player._getPosition()
		let room = world._getRoom(playerPos.zone, playerPos.room)

		if (!room._actions(command, commandData)) {
			if (!this._handleRoomItems(playerPos, command, commandData)) {
				if (!this._handleInventoryItems(command, commandData)) {
					if (!this._actions(command, commandData)) {
						this._println(`I don't recognize '${command}'.`)
						this._println("")
					}
				}
			}
		}
		this._clearInput()
	}

	_handleRoomItems(playerPos, command, commandData) {
		let roomItems = world._getItems(playerPos.zone, playerPos.room)
		for (let i = 0; i < roomItems.length; i++) {
			if (roomItems[i]._actions(command, commandData)) {
				return true
			}
		}
		return false
	}

	_printRoomItems() {
		let playerPos = player._getPosition()
		let roomItems = world._getItems(playerPos.zone, playerPos.room)
		roomItems.forEach((item) => {
			item.look()
		})
	}

	_handleInventoryItems(command, commandData) {
		let inventory = player._getInventory()
		for (let i = 0; i < inventory.length; i++) {
			if (inventory[i]._actions(command, commandData)) {
				return true
			}
		}
		return false
	}

	_setTitle(newTitle) {
		document.title = newTitle
	}

	_getItemsByKey(commandData) {
		return [
			...player._getItemsByKey(commandData),
			...world._getItemsByKey(commandData, player._getPosition()),
		]
	}

	_actions(command, commandData) {
		if (command in this) {
			return this[command](commandData)
		}
		return false
	}

	look(commandData) {
		if (commandData.length > 0) {
			this._println(`I don't see '${commandData[0]}'.`)
			this._println("")
			return true
		}
		return false
	}

	inventory(commandData) {
		let playerInventory = player._getInventory()
		if (playerInventory.length <= 0) {
			this._println("You are not carrying anything.")
		} else {
			this._println("You are holding:")
			for (let itemIndex = 0; itemIndex < playerInventory.length; itemIndex++) {
				playerInventory[itemIndex].held()
			}
		}
		this._println("")
		return true
	}

	take(commandData) {
		if (commandData.length > 0) {
			this._println(`I don't see '${commandData[0]}' to take.`)
			this._println("")
			return true
		}
		this._println(`take what?`)
		this._println("")
		return true
	}

	drop(commandData) {
		if (commandData.length > 0) {
			this._println(`I can't drop '${commandData[0]}'.`)
			this._println("")
			return true
		}
		this._println(`drop what?`)
		this._println("")
		return true
	}

	open(commandData) {
		if (commandData.length > 0) {
			this._println(`I can't open '${commandData[0]}'`)
			this._println("")
			return true
		}
		this._println(`open what?`)
		this._println("")
		return true
	}

	close(commandData) {
		if (commandData.length > 0) {
			this._println(`I can't close '${commandData[0]}'`)
			this._println("")
			return true
		}
		this._println(`close what?`)
		this._println("")
		return true
	}

	help(commandData) {
		if(commandData.length == 0) {
			this._println("This game is played by typing simple commands to describe what you want to do.")
			this._println("If you want to see a room, type <strong>look</strong>. You can examine items by typing <strong>look [item]</strong>.")
			this._println("You can travel around by typing directions such as <strong>north</strong> or <strong>s</strong> (for south).")
			this._println(
				"Most other actions can be done if they're in context. You can <strong>take</strong> and <strong>drop</strong> items,",
				"and sometimes do unique things, such as <strong>water flower</strong> or <strong>waltz</strong> based on what you have or where you are."
			)
			this._println("")
			this._println(
				"If you discover a mistake or encounter a crash, please make a <strong>bug</strong> report."
			)
			this._println("")
			return true
		}

		switch(commandData[0]) {
			case "settings":
			case "setting":
				this._println(`Settings are changed by typing <strong>setting [setting name] [value].`)
				this._println(`Available settings are:`)
				this._println("")
				this._println(`zipmode (true/false) - after having visited a room, no longer show it's description when entering again.`)
				this._println("")
				this._println(`hintmode (true/false) - important features of the room are given a unique text appearance.`)
				this._println("")
				return true
			default:
				this._println(`I don't have specific help for '${commandData[0]}'`)
				this._println("")
				return true
		}
	}

	setting(commandData) {
		switch(commandData[0]) {
			case "zipmode":
				this._settings.zipmode = (commandData[1] === 'true')
				this._println(`Setting zipmode to ${this._settings.zipmode}`)
				break
			case "hintmode":
				this._settings.hintmode = (commandData[1] === 'true')
				this._println(`Setting hintmode to ${this._settings.hintmode}`)
				if(this._settings.hintmode) {
					this.hintStyle = document.createElement('style');
					this.hintStyle.innerHTML = ".hint { color: magenta; }"
					document.head.appendChild(this.hintStyle)
				} else {
					document.head.removeChild(this.hintStyle)
				}
				break
			default:
				this._println(`I'm sorry, '${commandData[0]}' is not a setting I recognize.`)
				this._println("")
				return true
		}
		
		this._println("")
		return true
	}

	debug(commandData) {
		let playerInventory = player._getInventory()
		let playerPos = player._getPosition()
		switch (commandData[0]) {
			case "inventory":
				this._log("player inventory:", playerInventory)
				break
			case "room":
				this._log(
					"room data:",
					world._getRoom(playerPos.zone, playerPos.room)
				)
				this._log(
					"room items:",
					world._getItems(playerPos.zone, playerPos.room)
				)
				break
			default:
				this._log("player inventory:", playerInventory)
				this._log(
					"room data:",
					world._getRoom(playerPos.zone, playerPos.room)
				)
				this._log(
					"room items:",
					world._getItems(playerPos.zone, playerPos.room)
				)
				break
		}
		return true
	}

	bug(commandData) {
		this._print("You stare off into the æther as you contemplate the faults of this world")
		setTimeout(() => { this._print(".") }, 300)
		setTimeout(() => { this._print(".") }, 900)
		setTimeout(() => { this._print(".") }, 1500)
		setTimeout(() => { this._print(".") }, 2100)
		setTimeout(() => { this._print(".") }, 2700)
		setTimeout(() => { this._println("") }, 3300)
		setTimeout(() => {
			window.open("https://github.com/EyeOfMidas/text-adventure/issues/new", "_blank")
		}, 3300)

		return true
	}

	l = this.look
	i = this.inventory
	get = this.take
	settings = this.setting
}
var system = new System()
export default system
