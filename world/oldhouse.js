import { world, system, player, RoomCore, ItemCore } from "../library/Core.js"
import Garden from "./garden.js"

class EntryHall extends RoomCore {
	constructor() {
		super()
		super._setTitle("Entry Hall")
		super._setDescription(`The ceiling of the hall is vaulted, with the light streaming in through the <span class="hint">stained glass windows</span>`,
		`casting colorful shadows across the ornate worn <span class="hint">rug</span>.`)
		super._setExits("A hallway extends to the <strong>north</strong>. The door to the south does not look like it will open.")
	}

	north() {
		system._println("You walk north.")
		system._println("")
		player._setPosition(OldHouse, OldHouse.Rooms.DarkenedHallway)
		return true
	}

	south() {
		system._println("You rattle the bronze door handle, but the solid oak door does not budge.")
		system._println("")
		return true
	}

	look(commandData) {
		if (["rug", "carpet"].includes(commandData[0])) {
			system._println("The rug has an elaborate turkish pattern that is almost entirely faded out.",
			"A few threadbare patches barely hold together as a pale path down the center leads north down the hallway.")
			system._println("")
			return true
		}
		if (["door"].includes(commandData[0])) {
			system._println("The door is made of a very solid, dark oak.",
				"The bronze door handle is tarnished, but worn to a bright sheen where many hands have grasped it over the years.")
			system._println("")
			return true
		}
		if (["stained", "glass", "window", "windows"].includes(commandData[0])) {
			system._println("Light streaming in through the three colored glass windows depicts three flowers; ",
			"a ruby and emerald rose, an amethyst and obsidian pansy and a quartz and topaz daisy.")
			system._println("")
			return true
		}
		return super.look(commandData)
	}
}

class SunnyHallway extends RoomCore {
	constructor() {
		super()
		super._setTitle("A Sunny Hallway")
		super._setDescription("The sunlight streams in through the open door to the east,",
		"causing dust particles in the air to glimmer while drifting between the shafts of light.")
		super._setExits("There is a large and well-lit room to the <strong>north</strong>.",
		"An open oak door to the <strong>east</strong> leads out into the garden.",
		"The hallway continues out of the light to the <strong>south</strong>."
		)
	
	}

	north() {
		system._println("You walk north.")
		system._println("")
		player._setPosition(OldHouse, OldHouse.Rooms.GrandBallroom)
		return true
	}
	
	south() {
		system._println("You walk south.")
		system._println("")
		system._println("You blink as your eyes adjust to the darkness.")
		player._setPosition(OldHouse, OldHouse.Rooms.DarkenedHallway)
		return true
	}


	east() {
		system._println("You walk through the door and out into the garden.")
		system._println("")
		player._setPosition(Garden, Garden.Rooms.Patio)
		return true
	}
}

class DarkenedHallway extends RoomCore {
	constructor() {
		super()
		super._setTitle("A darkened hallway")
		super._setDescription(`The heavy dark <span class="hint">drapes</span> over the eastern windows bring a sense of closeness to the hallway.`,
		"The worn red rug smells a little like mold.")
		super._setExits("The hallway looks brighter to the <strong>north</strong>.",
		"There is an open doorway to the <strong>west</strong>.",
		"The great entry hall can be seen to the <strong>south</strong>.")
	
	}

	west() {
		system._println("You walk west.")
		system._println("")
		player._setPosition(OldHouse, OldHouse.Rooms.LibraryEntrance)
		return true
	}

	north() {
		system._println("You walk north.")
		system._println("")
		system._println("You walk through a shaft of light, squinting in the sudden brightness.")
		player._setPosition(OldHouse, OldHouse.Rooms.SunnyHallway)
		return true
	}

	south() {
		system._println("You walk south.")
		system._println("")
		player._setPosition(OldHouse, OldHouse.Rooms.EntryHall)
		return true
	}

	open(commandData) {
		if (["drapes", "curtains"].includes(commandData[0])) {
			system._println(`You tug on the drapes in an attempt to open them, but they seem affixed to a <span class="hint">metal box</span> on the floor.`)
			system._println("")
			return true
		}
	}

	look(commandData) {
		if (["rug", "carpet"].includes(commandData[0])) {
			system._println("The rug has an elaborate turkish pattern that is almost entirely faded out.",
			"A few threadbare patches barely hold together as a pale path down the center stretches north and south down the hallway.")
			system._println("")
			return true
		}
		if (["drapes", "curtains", "window", "windows"].includes(commandData[0])) {
			system._println("The heavy felt drapes block most of the cheery yellow sunlight creeping around the edges.",
			"A gray layer of dust makes the rich green fabric a dingy shade.")
			system._println("")
			return true
		}
		if (["metal", "box", "lock"].includes(commandData[0])) {
			system._println("The metal box is bolted to the floor, but has a strange round keyhole on the front.",
			"Each corner of the drapes has a rust-flecked metal loop that is held in place by a latch mechanism on the box.",
			"No amount of tugging will free the drapes enough to open them.")
			system._println("")
			return true
		}
		return super.look(commandData)
	}
}

class GrandBallroom extends RoomCore {
	constructor() {
		super()
		super._setTitle("Grand Ballroom")
		this.startingDescription = ["The polished marble floors echo with footsteps, augmenting the already voluminous size of the ballroom.",
		`In the center of the tremendous vaulted ceiling hangs an enormous <span class="hint">crystal chandelier</span>,`,
		"casting sparkles of light across the ornately gilded walls."]
		super._setDescription(...this.startingDescription)
		super._setExits("A hallway extends beneath an archway to the <strong>south</strong>.")
		this.panelIsOpen = false
		
	}

	south() {
		system._println("You walk south.")
		system._println("")
		player._setPosition(OldHouse, OldHouse.Rooms.SunnyHallway)
		return true
	}

	close(commandData) {
		if (["panel", "metal"].includes(commandData[0])) {
			if(this.panelIsOpen) {
				system._println("Carefully closing the panel and pressing it back into place, a simple click holds the metal panel closed and disguised again.")
				system._println("")
				super._setDescription(...this.startingDescription)
				this.panelIsOpen = false
				return true
			}
			system._println("The panel is already closed.")
			system._println("")
			return true
		}
		system._println("Close what?")
		system._println("")
		return true
	}

	press(commandData) {
		if (["panel", "metal", "right"].includes(commandData[0])) {
			if(this.panelIsOpen) {
				system._println("Carefully closing the panel and pressing it back into place, a simple click holds the metal panel closed and disguised again.")
				system._println("")
				super._setDescription(...this.startingDescription)
				this.panelIsOpen = false
				return true
			}
			system._println("Pressing on the panel causes an audible click from within the wall. The panel swings open revealing a strange round keyhole.")
			system._println("")
			super._setDescription(...this.startingDescription, `A small <span class="hint">metal panel</span> is hanging open on the eastern wall.`)
			this.panelIsOpen = true
			return true
		}
		system._println("Press what?")
		system._println("")
		return true
	}

	look(commandData) {
		if (["crystal", "chandelier"].includes(commandData[0])) {
			system._println("Multitudinous crystal shards gently swing high above, flashing tiny flecks of rainbow light across the walls and floors.",
			`One bright spot hits a <span class="hint">metallic object</span> on the eastern wall which glints brightly.`)
			system._println("")
			return true
		}
		if (["metallic", "object", "glint", "panel"].includes(commandData[0])) {
			if(this.panelIsOpen) {
				system._println("Behind the panel is a strange round keyhole.")
				system._println("")
				return true
			}
			system._println(`A metal <span class="hint">panel</span> is disguised on the wall here between some flowery scrollwork, flecked with rust.`,
			`The right edge of the panel looks well worn from many firm <span class="hint">press</span>es.`)
			system._println("")
			return true
		}
		return super.look(commandData)
	}

	waltz() {
		system._println("You twirl across the marble floors for a few moments, in time to an imagined string quartet.",
		"The exhilaration of spinning leaves you rosy-cheeked and breathless.")
		system._println("")
		return true
	}
}

class LibraryEntrance extends RoomCore {
	constructor() {
		super()
		super._setTitle("The Gallery Hall")
		super._setDescription("Footsteps echo on the polished hardwood floors down the narrow hallway.",
		"The paneled walls are a faded white, decorated with large portraits of stuffy, pompous old men.")
		super._setExits("A dim hallway can be seen to the <strong>east</strong>. A large room is just visible through an arched doorway to the <strong>west</strong>.")
	
	}
	west() {
		system._println("You walk west through the arched doorway.")
		system._println("")
		player._setPosition(OldHouse, OldHouse.Rooms.LibraryMainFloor)
		return true
	}

	east() {
		system._println("You walk east into the bright hallway.")
		system._println("")
		player._setPosition(OldHouse, OldHouse.Rooms.DarkenedHallway)
		return true
	}
}

class LibraryMainFloor extends RoomCore {
	constructor() {
		super()
		super._setTitle("The Library")
		super._setDescription("A black iron spiral staircase twists up from the center of the room, leading up to a wrought-iron metal catwalk.",
		"A large, two-story window is bordered by vibrant green felt drapes on the northern wall, providing ample reading light for the myriad of books crammed on the shelves which take up every spare wall space.",
		"The smell of vanilla and worn leather permeates the air, and one of the dark-brown leather armchairs is nearly irresistibly summoning you to grab a book and sink down into it's embrace.")
		super._setExits("There is a spiral staircase leading <strong>up</strong>, and an arched doorway off to the <strong>east</strong>.")
	
	}
	up() {
		system._println("Your footsteps reverberate as you climb the spiral staircase.")
		system._println("")
		// player.setPosition(OldHouse, OldHouse.Rooms.LibraryFirstBalcony)
		system._println("Not yet implemented.")
		return true
	}

	east() {
		system._println("You walk east.")
		system._println("")
		player._setPosition(OldHouse, OldHouse.Rooms.LibraryEntrance)
		return true
	}

	u = this.up
}

class Pearl extends ItemCore {
	constructor() {
		super(OldHouse, Pearl)
		super._setKeys("pearl", "bead")
		this.viewed = false
	}

	look(commandData) {
		if (!commandData || commandData.length <= 0) {
			if (this.viewed) {
				system._println(`A perfect white <span class="hint">pearl</span> sits on the floor.`)
			} else {
				system._println(`A tiny white <span class="hint">bead</span> sits on the floor.`)
			}
			return false
		}
		if (commandData.length > 0 && this.keys.includes(commandData[0])) {
			system._println("It is a shiny, opalescent pearl.")
			system._println("")
			this.viewed = true
			return true
		}
		
		return false
	}

	take(commandData) {
		if (this.keys.includes(commandData[0])) {
			if (this.viewed) {
				system._println("You take the pearl.")
			} else {
				system._println("You take the bead.")
			}
			system._println("")
			var item = world._takeItem(commandData[0], player._getPosition())
			player._giveItem(item)
			return true
		}
		return false
	}

	held() {
		if (this.viewed) {
			system._println("a pearl")
		} else {
			system._println("a bead")
		}
		return false
	}

	drop(commandData) {
		if (this.keys.includes(commandData[0]) && player._hasItem(this)) {
			if (this.viewed) {
				system._println("You drop the pearl, letting it bounce across the floor to a stop.")
			} else {
				system._println("You drop the bead, letting it bounce across the floor to a stop.")
			}
			system._println("")
			var item = player._takeItem(commandData[0])
			world._giveItem(item, player._getPosition())
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
		LibraryEntrance,
		LibraryMainFloor,
	}
	static Items = {
		Pearl,
	}
}

world._addZone(OldHouse)
world._spawnItems(OldHouse, OldHouse.Rooms.GrandBallroom, [OldHouse.Items.Pearl])
