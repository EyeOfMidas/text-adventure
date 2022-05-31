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
	_setKeys() {
		this.keys = [...arguments]
	}
	_setLookText() {
		this.lookText = [...arguments].join(" ")
	}
	_setLookAtText() {
		this.lookAtText = [...arguments].join(" ")
	}
	_setTakeText() {
		this.takeText = [...arguments].join(" ")
	}
	_setHeldText() {
		this.heldText = [...arguments].join(" ")
	}
	_setDropText() {
		this.dropText = [...arguments].join(" ")
	}

	_actions(command, commandData) {
		if (command in this) {
			return this[command](commandData)
		}
		return false
	}

	held() {
		system._println(this.heldText)
		return false
	}

	look(commandData) {
		if (!commandData || commandData.length <= 0) {
			system._println(this.lookText)
			return false
		}
		if (commandData.length > 0 && this.keys.includes(commandData[0])) {
			system._println(this.lookAtText)
			system._println("")
			return true
		}
	}

	take(commandData) {
		if (this.keys.includes(commandData[0])) {
			system._println(this.takeText)
			system._println("")
			var item = world._takeItem(commandData[0], player._getPosition())
			player._giveItem(item)
			return true
		}
		return false
	}

	drop(commandData) {
		if (this.keys.includes(commandData[0]) && player._hasItem(this)) {
			system._println(this.dropText)
			system._println("")
			var item = player._takeItem(commandData[0])
			world._giveItem(item, player._getPosition())
			return true
		}
		return false
	}

	l = this.look
	get = this.take
}
