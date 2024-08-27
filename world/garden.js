import { world, system, player, RoomCore, ItemCore } from "../library/Core.js"
import OldHouse from "./oldhouse.js"

class Patio extends RoomCore {
	constructor() {
		super()
		super._setTitle("A lush outdoor garden")
		super._setDescription("The warmth of the sun falls on the brick patio, radiating heat in the walled garden. The smell of vines and flowers permeate the air.")
		super._setExits("The rickety garden shed is to the <strong>south</strong>. An old oak door opens into the house to the <strong>west</strong>. The bricks narrow into a path leading deeper <strong>east</strong> into the garden.")
	}

	west() {
		system._println("You enter the house.")
		system._println("")
		player._setPosition(OldHouse, OldHouse.Rooms.SunnyHallway)
		return true
	}

	south() {
		system._println("You enter the shed.")
		system._println("")
		player._setPosition(Garden, Garden.Rooms.Shed)
		return true
	}

	east() {
		system._println("You walk east.")
		system._println("")
		player._setPosition(Garden, Garden.Rooms.GardenPath)
		return true
	}

	look(commandData) {
		if (["bricks", "brick", "patio"].includes(commandData[0])) {
			system._println("Rich red bricks stagger across the spacious patio, the pale mortar covered with bits of potting soil or growing a fuzzy green moss in places.")
			system._println("")
			return true
		}

		if (["soil", "dirt"].includes(commandData[0])) {
			system._println("A trail of dark brown loam has been tracked out of the shed doorway and ground into the gaps between bricks over many years of gardening.")
			system._println("")
			return true
		}

		if (["oak", "door"].includes(commandData[0])) {
			system._println("The door is made of a very solid, dark oak. A wrought-iron set of bars span the small window in it.")
			system._println("")
			return true
		}

		if (["vines", "flowers"].includes(commandData[0])) {
			system._println("Blue-flowered vines reach out of the soil to entwine every available climbing surface.",
				"They grasp at the walls of the house and shed, and even cling to the other struggling plants.")
			system._println("")
			return true
		}

		if (["shed"].includes(commandData[0])) {
			system._println("The small garden shed has seen better days. Even the doorframe lacks a door.",
				"The wooden siding is growing various lichen and vines; mottled with the stains of time."
			)
			system._println("")
			return true
		}

		if (["sun", "sunlight"].includes(commandData[0])) {
			system._println("Despite the shadow of the house to the west, the sunlight beats down mercilessly on the garden patio.",
				"It is uncomfortably warm standing in the searing heat of the sun."
			)
			system._println("")
			return true
		}

		if (["house"].includes(commandData[0])) {
			system._println("The towering, dark form of the house looms to the west. Vines growing small blue flowers tentatively crawl up it's sides but don't make it very far before turning back.",
				"A sturdy oak door is propped open, letting in some sunlight to the otherwise dark interior.")
			system._println("")
			return true
		}

		return super.look(commandData)
	}

	close(commandData) {
		if (["door"].includes(commandData[0])) {
			system._println("The door to the house is firmly wedged open and won't budge.")
			system._println("")
			return true
		}
	}

	smell(commandData) {
		system._println("Vines and flowers give this place an intoxicatingly alive smell.",
			"The scent of fresh dirt emanates from the garden shed to the south.")
		system._println("")
		return true
	}
}

class GardenPath extends RoomCore {
	constructor() {
		super()
		super._setTitle("A sunny garden path")
		super._setDescription("Deep green moss fills the crumbling mortar gaps in the brick path, which gently curve around a well-kept japanese maple.",
		"The maple leaves are a bright red, with several clusters of twin propellered seeds amongst the branches.")
		super._setExits("The dark old house looms to the <strong>west</strong>. The brick path meanders towards the <strong>east</strong>.")
	}

	west() {
		system._println("You walk west.")
		system._println("")
		player._setPosition(Garden, Garden.Rooms.Patio)
		return true
	}

	east() {
		system._println("You walk east.")
		system._println("")
		player._setPosition(Garden, Garden.Rooms.Pond)
		return true
	}

	_enter() {
		super._enter();
		this.addRandomSeedFall()
	}

	leave() {
		clearTimeout(this.lastFall)
	}

	addRandomSeedFall() {
		this.lastFall = setTimeout(() => {
			system._println("A warm summer breeze blows a maple seed out of the tree above, and it spirals down to the bricks.")
			world._addItems(Garden, Garden.Rooms.GardenPath, [Garden.Items.MapleSeed])
			this.addRandomSeedFall()
		}, Math.floor(30000 * Math.random()) + 30000)
	}
}

export class Shed extends RoomCore {
	constructor() {
		super()
		super._setTitle("The gardener's shed")
		super._setDescription("Rough hewn wood planks make up the walls of this small shed. There are shelves with various tools and gardening implements lining both walls. The workbench along the back wall has some potting soil spilled on it.")
		super._setExits("Sunlight streams in from the old wooden door frame to the <strong>north</strong>.")
	}

	north() {
		system._println("You walk north, into the garden.")
		system._println("")
		player._setPosition(Garden, Patio)
		return true
	}
}

export class Pond extends RoomCore {
	constructor() {
		super()
		super._setTitle("The garden pond")
		super._setDescription("Large, misshapen rocks border a round pond with a large marble oyster on the far side spilling water into the pond below.",
		"Waterlillies bob happily on the surface of the burbling water, and the algae-covered stones are hugged by creeping jenny plants.")
		super._setExits("The brick pathway <strong>west</strong> heads towards a maple tree.",
		"A cheerful flower garden is to the <strong>east</strong> and the heady smell of roses drifts from the path to the <strong>south</strong>.")
	}

	west() {
		system._println("You walk west.")
		system._println("")
		player._setPosition(Garden, GardenPath)
		return true
	}

	south() {
		system._println("You walk south.")
		system._println("")
		player._setPosition(Garden, RoseGarden)
		return true
	}

	east() {
		system._println("You walk east.")
		system._println("")
		player._setPosition(Garden, FlowerGarden)
		return true
	}
}

export class RoseGarden extends RoomCore {
	constructor() {
		super()
		super._setTitle("The Rose Garden")
		super._setDescription("The brick path weaves south, lined on both side with massive rose bushes, covered in blooms as big as an open hand.","The fragrance is as intoxicating as the overhead summer sun is scorching hot.")
		super._setExits("The cheerful trickle of water comes from the <strong>north</strong>.",
		"A garden path in mottled sunlight can be seen to the <strong>south</strong>.")
	}

	north() {
		system._println("You walk north.")
		system._println("")
		player._setPosition(Garden, Pond)
		return true
	}
}

export class FlowerGarden extends RoomCore {
	constructor() {
		super()
		super._setTitle("A wildflower garden")
		super._setDescription("flower beds")
		super._setExits("The cheerful trickle of water comes from the <strong>west</strong>.")
	}

	west() {
		system._println("You walk west.")
		system._println("")
		player._setPosition(Garden, Pond)
		return true
	}

	_enter() {
		super._enter()
		this.ambiance()
	}

	leave() {
		clearTimeout(this.noiseTick)
	}

	ambiance() {
		this.noiseTick = setInterval(() => {
			let ambianceMessage = [
				"A tiny honeybee laden with pollen bobs from flower to flower.",
				"The warm summer breeze blows through, causing the flowers to wave and waltz.",
				"A bird chirps merrily in a nearby tree.",
			].shuffle()[0]
			system._println(ambianceMessage)
		}, 60000)
	}
}

class Pansy extends ItemCore {
	constructor() {
		super(Garden, Pansy)
		super._setKeys("flower", "pansy")
		super._setLookText(`A small <span class="hint">flower</span> wilts on the ground.`)
		super._setLookAtText("The small purple pansy looks limp.")
		super._setTakeText("You carefully put the flower in your pocket.")
		super._setHeldText("a flower")
		super._setDropText("You let the flower fall to the floor.")
		this.isRefreshed = false
	}

	look(commandData) {
		if (!commandData || commandData.length <= 0) {
			if (this.isRefreshed) {
				system._println(`A cheerful looking <span class="hint">pansy</span> lays here.`)
			} else {
				system._println(this.lookText)
			}
			return false
		}
		if (commandData.length > 0 && this.keys.includes(commandData[0])) {
			if (this.isRefreshed) {
				system._println("The small purple pansy glistens with moisture.")
			} else {
				system._println(this.lookAtText)
			}
			system._println("")
			return true
		}
		
		return false
	}

	_save() {
		let saveData = super._save()
		saveData.isRefreshed = this.isRefreshed
		return saveData
	}

	_load(itemSave) {
		super._load(itemSave)
		this.isRefreshed = itemSave.isRefreshed
	}
}

class MapleSeed extends ItemCore {
	constructor() {
		super(Garden, MapleSeed)
		super._setKeys("maple", "seed")
		super._setLookText(`A <span class="hint">maple seed</span> lies on the ground.`)
		super._setLookAtText("The rich red maple seed looks like the wing of a delicate insect, ready to soar at any moment.")
		super._setTakeText("You gingerly put the seed in your inventory.")
		super._setHeldText("a maple seed")
		super._setDropText("The seed spins madly as it gently drifts to the floor.")
	}
}

export class WateringCan extends ItemCore {
	constructor() {
		super(Garden, WateringCan)
		super._setKeys("can", "watering")
		super._setLookText(`A rusted iron <span class="hint">watering can</span> stands on the ground.`)
		super._setLookAtText(`The watering can still has a little bit of <span class="hint">water</span> in it.`)
		super._setTakeText("You heft the watering can.")
		super._setHeldText("a watering can")
		super._setDropText("You place the watering can on the ground.")
	}

	water(commandData) {
		if(player._hasItem(this)) {
			if(!commandData || commandData.length == 0) {
				system._println("water what?")
				system._println("")
				return true
			}
			let targetItem = system._getItemsByKey(commandData).filter((item) => item instanceof Garden.Items.Pansy)
			if(targetItem.length == 1) {
				system._println("You splash the few remaining droplets across the flower, reviving it slightly.")
				targetItem[0].isRefreshed = true
				player._save()
			} else {
				system._println(`This probably doesn't need to be watered.`)
				
			}
			system._println("")
			return true
		}
	}
}

export default class Garden {
	static Rooms = {Patio, Shed, GardenPath, Pond, RoseGarden, FlowerGarden}
	static Items = {Pansy, WateringCan, MapleSeed}
}

world._addZone(Garden)
world._spawnItems(Garden, Garden.Rooms.Patio, [Garden.Items.Pansy])
world._spawnItems(Garden, Garden.Rooms.Shed, [Garden.Items.WateringCan])
world._spawnItems(Garden, Garden.Rooms.GardenPath, [Garden.Items.MapleSeed])

