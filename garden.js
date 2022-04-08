import { world, system, player, RoomCore, ItemCore } from "./library/Core.js"
import { OldHouse, OldHouse_DarkenedHallway } from "./oldhouse.js"

export class Garden_Patio extends RoomCore {
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
		player.setPosition(OldHouse, OldHouse_DarkenedHallway)
		return true
	}

	south() {
		system.println("You enter the shed.")
		system.println("")
		player.setPosition(Garden, Garden_Shed)
		return true
	}
}

export class Garden_Shed extends RoomCore {
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
		player.setPosition(Garden, Garden_Patio)
		return true
	}
}

export class GardenItems_Pansy extends ItemCore {
	constructor() {
		super(
			["flower", "pansy"],
			"A small flower wilts on the ground.",
			"The small purple pansy looks limp.",
			"You carefully put the flower in your pocket.",
			"a flower",
			"You let the flower fall to the floor.",
		)
	}
}

export class GardenItems_WateringCan extends ItemCore {
	constructor() {
		super(
			["can", "watering"],
			"A rusted iron watering can stands on the ground.",
			"The watering can still has a little bit of water in it.",
			"You heft the watering can.",
			"a watering can",
			"You place the watering can on the ground.",
		)
	}
}

export class Garden{}

world.addZone(Garden, [Garden_Patio, Garden_Shed]);
world.addItems(Garden, Garden_Patio, [GardenItems_Pansy]);
world.addItems(Garden, Garden_Shed, [GardenItems_WateringCan]);
