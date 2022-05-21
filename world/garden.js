import { world, system, player, RoomCore, ItemCore } from "../library/Core.js"
import OldHouse from "./oldhouse.js"

class Patio extends RoomCore {
	constructor() {
		super(
			"A lush outdoor garden",
			"The warmth of the sun falls on the brick patio, radiating heat in the walled garden. The smell of vines and flowers permeate the air.",
			"The rickety garden shed is to the <strong>south</strong>. An old oak door opens into the house to the <strong>west</strong>.",
		)
	}

	west() {
		system.println("You enter the house.")
		system.println("")
		system.println("You blink as your eyes adjust to the darkness.")
		player.setPosition(OldHouse, OldHouse.Rooms.DarkenedHallway)
		return true
	}

	south() {
		system.println("You enter the shed.")
		system.println("")
		player.setPosition(Garden, Garden.Rooms.Shed)
		return true
	}
}

export class Shed extends RoomCore {
	constructor() {
		super(
			"The gardener's shed",
			"Rough hewn wood planks make up the walls of this small shed. There are shelves with various tools and gardening implements lining both walls. The workbench along the back wall has some potting soil spilled on it.",
			"Sunlight streams in from the old wooden door frame to the <strong>north</strong>.",
		)
	}

	north() {
		system.println("You walk north, into the garden.")
		system.println("")
		player.setPosition(Garden, Patio)
		return true
	}
}

class Pansy extends ItemCore {
	constructor() {
		super(
			["flower", "pansy"],
			`A small <span class="hint">flower</span> wilts on the ground.`,
			"The small purple pansy looks limp.",
			"You carefully put the flower in your pocket.",
			"a flower",
			"You let the flower fall to the floor.",
		)
		this.isRefreshed = false
	}

	look(commandData) {
		if (!commandData || commandData.length <= 0) {
			if (this.isRefreshed) {
				system.println(`A cheerful looking <span class="hint">pansy</span> lays here.`)
			} else {
				system.println(this.lookText)
			}
			return false
		}
		if (commandData.length > 0 && this.keys.includes(commandData[0])) {
			if (this.isRefreshed) {
				system.println("The small purple pansy glistens with moisture.")
			} else {
				system.println(this.lookAtText)
			}
			system.println("")
			return true
		}
		
		return false
	}
}

export class WateringCan extends ItemCore {
	constructor() {
		super(
			["can", "watering"],
			`A rusted iron <span class="hint">watering can</span> stands on the ground.`,
			`The watering can still has a little bit of <span class="hint">water</span> in it.`,
			"You heft the watering can.",
			"a watering can",
			"You place the watering can on the ground.",
		)
	}

	water(commandData) {
		if(player.hasItem(this)) {
			if(!commandData || commandData.length == 0) {
				system.println("water what?")
				system.println("")
				return true
			}
			let targetItem = system.getItemsByKey(commandData).filter((item) => item instanceof Garden.Items.Pansy)
			if(targetItem.length == 1) {
				system.println("You splash the few remaining droplets across the flower, reviving it slightly.")
				targetItem[0].isRefreshed = true
			} else {
				system.println(`This probably doesn't need to be watered.`)
				
			}
			system.println("")
			return true
		}
	}
}

export default class Garden {
	static Rooms = {Patio, Shed}
	static Items = {Pansy, WateringCan}
}

world.addZone(Garden, Object.values(Garden.Rooms))
world.addItems(Garden, Garden.Rooms.Patio, [Garden.Items.Pansy])
world.addItems(Garden, Garden.Rooms.Shed, [Garden.Items.WateringCan])

