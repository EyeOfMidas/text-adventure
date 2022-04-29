import { system, player } from "./library/Core.js"
import OldHouse from "./world/oldhouse.js"

document.addEventListener("DOMContentLoaded", () => {
    system.init()
    player.setPosition(OldHouse, OldHouse.Rooms.EntryHall)
})
