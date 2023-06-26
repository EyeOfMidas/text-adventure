# text-adventure

[Play!](http://eyeofmidas.github.io/text-adventure/index.html)

If you're developing locally, I've included a simplistic nodejs webserver to host the files. You should be able to run `./server.js` and it will serve up this project as http://localhost:3000 and open it in your default browser.

## Controls
The basic commands you can input to play the text-adventure example are:
* **help** - prints out the help for this game
* **clear** - clears the terminal
* **look**/l - will show you the title and description of the room
* **look** [item/feature] - will show you the description of a feature of the room or a specific item
* **inventory**/i - prints out the list of items currently held by the player
* **take**/get [item] - removes an item from the room and puts it in the player inventory
* **drop** [item] - removes an item from the player inventory and puts it in the current room
* **setting**/settings - will print out the available settings
  * **zipmode** - will toggle zip mode
  * **hintmode** - will toggle hint mode
* **debug** - used for seeing raw data
  * **inventory** - will print out the JSON representation of all items in the inventory
  * **room** - will print out the JSON representation of the current room and all items in the room
* **bug** - will open a browser page to input issues
* **north**/n - will call the `north` function on a room, which typically moves the user to another room
* **south**/s - will call the `south` function on a room, which typically moves the user to another room
* **east**/e - will call the `east` function on a room, which typically moves the user to another room
* **west**/w - will call the `west` function on a room, which typically moves the user to another room

This list is not exhaustive, since every item and every room can specify any additional functions to be made available to the user. Commands like `water` can be used with the watering can, or `up` and `down`, or `northwest` and `southeast` are also valid commands if applicable in relation to the current room or items in the room or inventory.

# Overview

Text Adventure is a browser-based text game designed to be managed by programmers. Everything in the game is an object; Rooms and Items are just javascript classes instantiated and managed by the Core. This makes it very easy for programmers to add game data, and also leaves functionality wide open to do whatever you desire on a per-object basis.

This is patterned after the early DikuMUD codebases, which let the code and the in-memory representation be synonymous. Data-driven text games are much "safer" but any unique or interesting functionality has to be added to the core of the system.

Core should not be altered except when adding global functionality, such as adding to the `help` function or adding new features like a `setting` command.

# Building the World

Since Rooms and Items are javascript classes, it makes sense that file structure dictates zone and world. As such, it's recommended you follow the pattern exampled here if you want to expand on the text adventure content.

```
world/
 oldhouse.js
    class EntryHall extends RoomCore
    class SunnyHallway extends RoomCore
    class Pearl extends ItemCore
    ...
  garden.js
    class Patio extends RoomCore
    class GardenPath extends RoomCore
    class Pansy extends ItemCore
    class WateringCan extends ItemCore
    ...
 
world2/
  zone2.js
    class Room5 extends RoomCore
    class Room6 extends RoomCore
    class Room7 extends RoomCore
    class Item3 extends ItemCore
    ...
  zone3.js
    class Room8 extends RoomCore
    class Item3 extends ItemCore
    class Item4 extends ItemCore
    ...

world3/
  zone4.js
    class Item5 extends ItemCore
    class Item6 extends ItemCore
    class Item7 extends ItemCore
    class Item8 extends ItemCore
    ...
  ```
At the bottom of each Zone file, binding the rooms and items to their proper location is required.

```javascript
export default class Garden {
	static Rooms = {Patio, GardenPath}
	static Items = {Pansy, WateringCan}
}

world._addZone(Garden, Object.values(Garden.Rooms))
world._addItems(Garden, Garden.Rooms.Patio, [Garden.Items.Pansy, Garden.Items.WateringCan])
```

Linking between rooms is done as a simple position update. If a user were to be in the `SunnyHallway` and were to type `east`, the `east()` function would be called on the `SunnyHallway` class, which will print out some text to the user, and then set the player's position to the `Garden` zone and the `Patio` room.

Returning `true` will inform the Core that this function should stop further processing and wait for another user input.

```javascript
class SunnyHallway extends RoomCore {
    ...
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
    ...
}
```

If you want the player to start in a different location when loading up, just adjust the room class reference in game.js

```javascript
document.addEventListener("DOMContentLoaded", () => {
    system._init()
    player._setPosition(OldHouse, OldHouse.Rooms.EntryHall)
})
```