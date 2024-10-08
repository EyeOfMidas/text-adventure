import { system, player } from "./library/Core.js"
import OldHouse from "./world/oldhouse.js"

document.addEventListener("DOMContentLoaded", () => {
    system._init()
    player._load(OldHouse, OldHouse.Rooms.EntryHall, [])
})

window.addEventListener("resize", () => {
    system._resize()
})
