import { system } from "./Core.js"

export default class RoomCore {
	constructor(title = "", description = "", exitsDescription = "") {
		this.title = title
		this.description = description
		this.exitsDescription = exitsDescription
		this.visited = false
	}

	_setTitle() {
		this.title = [...arguments].join(" ")
	}
	_setDescription() {
		this.description = [...arguments].join(" ")
	}
	_setExits() {
		this.exitsDescription = [...arguments].join(" ")
	}

	_actions(command, commandData) {
		if (command in this) {
			return this[command](commandData)
		}
		return false
	}

	_enter() {
		system._setTitle(this.title)
		system._println(`<strong>${this.title}</strong>`)
		if (!(this.visited && system._settings.zipmode)) {
			system._println(this.description)
			system._println(this.exitsDescription)
			this.visited = true
		}
	}

	look(commandData) {
		if (commandData.length <= 0) {
			system._println("You look around.")
			system._println("")
			system._println(this.description)
			system._println(this.exitsDescription)
			system._printRoomItems()
			system._println("")
			return true
		}
		return false
	}

	smell(commandData) {
		if (commandData.length > 0) {
			system._println(`I can't smell '${commandData[0]}'`)
			system._println("")
			return true
		}
		system._println(`smell what?`)
		system._println("")
		return true
	}

	open(commandData) {
		return false
	}

	north() {
		system._println("I can't go north.")
		system._println("")
		return true
	}

	south() {
		system._println("I can't go south.")
		system._println("")
		return true
	}

	east() {
		system._println("I can't go east.")
		system._println("")
		return true
	}

	west() {
		system._println("I can't go west.")
		system._println("")
		return true
	}

	n = this.north
	s = this.south
	e = this.east
	w = this.west

	l = this.look
}
