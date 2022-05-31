import { system, player } from "./library/Core.js"
import OldHouse from "./world/oldhouse.js"

document.addEventListener("DOMContentLoaded", () => {
    system._init()
    player._setPosition(OldHouse, OldHouse.Rooms.EntryHall)
})
