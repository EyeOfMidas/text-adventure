import { system, player } from "./library/Core.js"
import { OldHouse_EntryHall } from "./oldhouse.js"

document.addEventListener("DOMContentLoaded", () => {
    system.init()
    player.setPosition("OldHouse", OldHouse_EntryHall)
})
