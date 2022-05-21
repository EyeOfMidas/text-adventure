import { world, system, player, RoomCore, ItemCore } from "../library/Core.js"
import Garden from "./garden.js"

class EntryHall extends RoomCore {
	constructor() {
		super()
		super.setTitle("Entry Hall")
		super.setDescription(`The ceiling of the hall is vaulted, with the light streaming in through the <span class="hint">stained glass windows</span>`,
		`casting colorful shadows across the ornate worn <span class="hint">rug</span>.`)
		super.setExits("A hallway extends to the <strong>north</strong>. The door to the south does not look like it will open.")
	}

	north() {
		system.println("You walk north.")
		system.println("")
		player.setPosition(OldHouse, OldHouse.Rooms.SunnyHallway)
		return true
	}

	south() {
		system.println("You rattle the bronze door handle, but the solid oak door does not budge.")
		system.println("")
		return true
	}

	look(commandData) {
		if (["rug", "carpet"].includes(commandData[0])) {
			system.println("The rug has an elaborate turkish pattern that is almost entirely faded out.",
			"A few threadbare patches barely hold together as a pale path down the center leads north down the hallway.")
			system.println("")
			return true
		}
		if (["stained", "glass", "window"].includes(commandData[0])) {
			system.println("Light streaming in through the three colored glass windows depicts three flowers; ",
			"a ruby and emerald rose, an amethyst and obsidian pansy and a quartz and topaz daisy.")
			system.println("")
			return true
		}
		return super.look(commandData)
	}
}

class SunnyHallway extends RoomCore {
	constructor() {
		super()
		super.setTitle("A Sunny Hallway")
		super.setDescription("The sunlight streams in through the windows to the east,",
		"causing dust particles in the air to glimmer while drifting between the shafts of light.")
		super.setExits("The hall continues to the <strong>north</strong>. The great entry hall can be seen to the <strong>south</strong>.")
	
	}
	north() {
		system.println("You walk north.")
		system.println("")
		player.setPosition(OldHouse, OldHouse.Rooms.DarkenedHallway)
		return true
	}

	south() {
		system.println("You walk south.")
		system.println("")
		player.setPosition(OldHouse, OldHouse.Rooms.EntryHall)
		return true
	}
}

class DarkenedHallway extends RoomCore {
	constructor() {
		super()
		super.setTitle("A darkened hallway")
		super.setDescription(`The heavy dark <span class="hint">drapes</span> over the eastern windows bring a sense of closeness to the hallway.`,
		"The worn red carpet smells a little like mould.")
		super.setExits("The hallway looks brighter to the <strong>south</strong>.",
		"An open oak door to the <strong>east</strong> leads out into the garden.",
		"There is a large and well-lit room to the <strong>north</strong>.")
	
	}

	south() {
		system.println("You walk south.")
		system.println("")
		player.setPosition(OldHouse, OldHouse.Rooms.SunnyHallway)
		return true
	}

	east() {
		system.println("You walk through the door and out into the garden, blinking in the sudden harsh light.")
		system.println("")
		player.setPosition(Garden, Garden.Rooms.Patio)
		return true
	}

	north() {
		system.println("You walk north.")
		system.println("")
		player.setPosition(OldHouse, OldHouse.Rooms.GrandBallroom)
		return true
	}

	open(commandData) {
		if (["drapes", "curtains"].includes(commandData[0])) {
			system.println(`You tug on the drapes in an attempt to open them, but they seem affixed to a <span class="hint">metal box</span> on the floor.`)
			system.println("")
			return true
		}
	}

	look(commandData) {
		if (["drapes", "curtains"].includes(commandData[0])) {
			system.println("The heavy felt drapes block most of the cheery yellow sunlight creeping around the edges.",
			"A gray layer of dust makes the rich green fabric a dingy shade.")
			system.println("")
			return true
		}
		if (["metal", "box", "lock"].includes(commandData[0])) {
			system.println("The metal box is bolted to the floor, but has a strange round keyhole on the front.",
			"Each corner of the drapes has a rust-flecked metal loop that is held in place by a latch mechanism on the box.",
			"No amount of tugging will free the drapes enough to open them.")
			system.println("")
			return true
		}
		return super.look(commandData)
	}
}

class GrandBallroom extends RoomCore {
	constructor() {
		super()
		super.setTitle("Grand Ballroom")
		this.startingDescription = ["The polished marble floors echo with footsteps, augmenting the already voluminous size of the ballroom.",
		`In the center of the tremendous vaulted ceiling hangs an enormous <span class="hint">crystal chandelier</span>,`,
		"casting sparkles of light across the ornately gilded walls."]
		super.setDescription(...this.startingDescription)
		super.setExits("A hallway extends beneath an archway to the <strong>south</strong>.")
		this.panelIsOpen = false
		
	}

	south() {
		system.println("You walk south.")
		system.println("")
		player.setPosition(OldHouse, OldHouse.Rooms.DarkenedHallway)
		return true
	}

	press(commandData) {
		if (["panel", "metal", "right"].includes(commandData[0])) {
			if(this.panelIsOpen) {
				system.println("Carefully closing the panel and pressing it back into place, a simple click holds the metal panel closed and disguised again.")
				system.println("")
				super.setDescription(...this.startingDescription)
				this.panelIsOpen = false
				return true
			}
			system.println("Pressing on the panel causes an audible click from within the wall. The panel swings open revealing a strange round keyhole.")
			system.println("")
			super.setDescription(...this.startingDescription, "A small metal panel is hanging open on the eastern wall.")
			this.panelIsOpen = true
			return true
		}
		system.println("Press what?")
		system.println("")
		return true
	}

	look(commandData) {
		if (["crystal", "chandelier"].includes(commandData[0])) {
			system.println("Multitudinous crystal shards gently swing high above, flashing tiny flecks of rainbow light across the walls and floors.",
			`One bright spot hits a <span class="hint">metallic object</span> on the eastern wall which glints brightly.`)
			system.println("")
			return true
		}
		if (["metallic", "object", "glint", "panel"].includes(commandData[0])) {
			system.println(`A metal <span class="hint">panel</span> is disguised on the wall here between some flowery scrollwork, flecked with rust.`,
			`The right edge of the panel looks well worn from many firm <span class="hint">press</span>es.`)
			system.println("")
			return true
		}
		return super.look(commandData)
	}

	waltz() {
		system.println("You twirl across the marble floors for a few moments, in time to an imagined string quartet.",
		"The exhilaration of spinning leaves you rosy-cheeked and breathless.")
		system.println("")
		return true
	}
}

class Pearl extends ItemCore {
	constructor() {
		super()
		super.setKeys("pearl", "bead")
		this.viewed = false
	}

	look(commandData) {
		if (!commandData || commandData.length <= 0) {
			if (this.viewed) {
				system.println(`A perfect white <span class="hint">pearl</span> sits on the floor.`)
			} else {
				system.println(`A tiny white <span class="hint">bead</span> sits on the floor.`)
			}
			return false
		}
		if (commandData.length > 0 && this.keys.includes(commandData[0])) {
			system.println("It is a shiny, opalescent pearl.")
			system.println("")
			this.viewed = true
			return true
		}
		
		return false
	}

	take(commandData) {
		if (this.keys.includes(commandData[0])) {
			if (this.viewed) {
				system.println("You take the pearl.")
			} else {
				system.println("You take the bead.")
			}
			system.println("")
			var item = world.takeItem(commandData[0], player.getPosition())
			player.giveItem(item)
			return true
		}
		return false
	}

	held() {
		if (this.viewed) {
			system.println("a pearl")
		} else {
			system.println("a bead")
		}
		return false
	}

	drop(commandData) {
		if (this.keys.includes(commandData[0]) && player.hasItem(this)) {
			if (this.viewed) {
				system.println("You drop the pearl, letting it bounce across the floor to a stop.")
			} else {
				system.println("You drop the bead, letting it bounce across the floor to a stop.")
			}
			system.println("")
			var item = player.takeItem(commandData[0])
			world.giveItem(item, player.getPosition())
			return true
		}
		return false
	}
}
export default class OldHouse {
	static Rooms = {
		EntryHall,
		SunnyHallway,
		DarkenedHallway,
		GrandBallroom,
	}
	static Items = {
		Pearl,
	}
}

world.addZone(OldHouse, Object.values(OldHouse.Rooms))
world.addItems(OldHouse, OldHouse.Rooms.GrandBallroom, [OldHouse.Items.Pearl])
