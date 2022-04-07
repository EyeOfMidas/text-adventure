
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