import { system, player } from "./library/Core.js"
import OldHouse from "./oldhouse.js"

document.addEventListener("DOMContentLoaded", () => {
    system.init()
    player.setPosition(OldHouse, OldHouse.Rooms.OldHouse_EntryHall)
})
