import { system, player, world } from "./Core.js"

export default class ItemCore {
	constructor(
		keys = [],
		lookText = "",
		lookAtText = "",
		takeText = "",
		heldText = "",
		dropText = ""
	) {
		this.keys = keys
		this.lookText = lookText
		this.lookAtText = lookAtText
		this.takeText = takeText
		this.heldText = heldText
		this.dropText = dropText
	}
	setKeys() {
		this.keys = [...arguments]
	}
	setLookText() {
		this.lookText = [...arguments].join(" ")
	}
	setLookAtText() {
		this.lookAtText = [...arguments].join(" ")
	}
	setTakeText() {
		this.takeText = [...arguments].join(" ")
	}
	setHeldText() {
		this.heldText = [...arguments].join(" ")
	}
	setDropText() {
		this.dropText = [...arguments].join(" ")
	}

	actions(command, commandData) {
		if (command in this) {
			return this[command](commandData)
		}
		return false
	}

	held() {
		system.println(this.heldText)
		return false
	}

	look(commandData) {
		if (!commandData || commandData.length <= 0) {
			system.println(this.lookText)
			return false
		}
		if (commandData.length > 0 && this.keys.includes(commandData[0])) {
			system.println(this.lookAtText)
			system.println("")
			return true
		}
	}

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

	drop(commandData) {
		if (this.keys.includes(commandData[0]) && player.hasItem(this)) {
			system.println(this.dropText)
			system.println("")
			var item = player.takeItem(commandData[0])
			world.giveItem(item, player.getPosition())
			return true
		}
		return false
	}

	l = this.look
	get = this.take
}
