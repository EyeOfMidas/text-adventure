import { world, system, player, RoomCore, ItemCore } from "../library/Core.js"
import OldHouse from "./oldhouse.js"

class Patio extends RoomCore {
	constructor() {
		super()
		super.setTitle("A lush outdoor garden")
		super.setDescription("The warmth of the sun falls on the brick patio, radiating heat in the walled garden. The smell of vines and flowers permeate the air.")
		super.setExits("The rickety garden shed is to the <strong>south</strong>. An old oak door opens into the house to the <strong>west</strong>. The bricks narrow into a path leading deeper <strong>west</strong> into the garden.")
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

	east() {
		system.println("You walk east.")
		system.println("")
		player.setPosition(Garden, Garden.Rooms.GardenPath)
		return true
	}
}

class GardenPath extends RoomCore {
	constructor() {
		super()
		super.setTitle("A sunny garden path")
		super.setDescription("Deep green moss fills the crumbling mortar gaps in the brick path, which gently curve around a well-kept japanese maple.",
		"The maple leaves are a bright red, with several clusters of twin propellered seeds amongst the branches.")
		super.setExits("The dark old house looms to the <strong>west</strong>. The brick path meanders towards the <strong>east</strong>.")
	}

	west() {
		system.println("You walk west.")
		system.println("")
		player.setPosition(Garden, Garden.Rooms.Patio)
		return true
	}

	east() {
		system.println("You walk east.")
		system.println("")
		player.setPosition(Garden, Garden.Rooms.GardenPath)
		return true
	}

	enter() {
		super.enter();
		this.addRandomSeedFall()
	}

	leave() {
		clearTimeout(this.lastFall)
	}

	addRandomSeedFall() {
		this.lastFall = setTimeout(() => {
			system.println("A warm summer breeze blows a maple seed out of the tree above, and it spirals down to the bricks.")
			system.println("")
			world.addItems(Garden, Garden.Rooms.GardenPath, [Garden.Items.MapleSeed])
			this.addRandomSeedFall()
		}, Math.floor(30000 * Math.random()) + 30000)
	}
}

export class Shed extends RoomCore {
	constructor() {
		super()
		super.setTitle("The gardener's shed")
		super.setDescription("Rough hewn wood planks make up the walls of this small shed. There are shelves with various tools and gardening implements lining both walls. The workbench along the back wall has some potting soil spilled on it.")
		super.setExits("Sunlight streams in from the old wooden door frame to the <strong>north</strong>.")
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

class MapleSeed extends ItemCore {
	constructor() {
		super(
			["maple", "seed"],
			`A <span class="hint">maple seed</span> lies on the ground.`,
			"The rich red maple seed looks like the wing of a delicate insect, ready to soar at any moment.",
			"You gingerly put the seed in your inventory.",
			"a maple seed",
			"The seed spins madly as it gently drifts to the floor.",
		)
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
	static Rooms = {Patio, Shed, GardenPath}
	static Items = {Pansy, WateringCan, MapleSeed}
}

world.addZone(Garden, Object.values(Garden.Rooms))
world.addItems(Garden, Garden.Rooms.Patio, [Garden.Items.Pansy])
world.addItems(Garden, Garden.Rooms.Shed, [Garden.Items.WateringCan])
world.addItems(Garden, Garden.Rooms.GardenPath, [Garden.Items.MapleSeed])

