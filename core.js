import player from "./Player.js"
import system from "./System.js"
import {OldHouse_EntryHall} from "./oldhouse.js"

document.addEventListener("DOMContentLoaded", () => {
    system.init()
    player.setPosition("OldHouse", OldHouse_EntryHall)
})
