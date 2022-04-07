import system from "./System.js"
import player from "./Player.js"
import world from "./World.js"

export default class ItemCore {
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