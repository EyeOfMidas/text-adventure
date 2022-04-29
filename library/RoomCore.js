import system from "./System.js";

export default class RoomCore {
  constructor(title = "", description = "", exitsDescription = "") {
    this.title = title;
    this.description = description;
    this.exitsDescription = exitsDescription;
    this.visited = false;
  }

  setTitle() {
    this.title = [...arguments].join(" ");
  }
  setDescription() {
    this.description = [...arguments].join(" ");
  }
  setExits() {
    this.exitsDescription = [...arguments].join(" ");
  }

  actions(command, commandData) {
    if (command in this) {
      return this[command](commandData);
    }
    return false;
  }

  enter() {
    system.title(this.title);
    system.println(`<strong>${this.title}</strong>`);
    if (!this.visited) {
      system.println(this.description);
      system.println(this.exitsDescription);
      this.visited = true;
    }
  }

  look(commandData) {
    if (commandData.length <= 0) {
      system.println("You look around.");
      system.println("");
      system.println(this.description);
      system.println(this.exitsDescription);
      system.printRoomItems();
      system.println("");
      return true;
    }
    return false;
  }

  north() {
    system.println("I can't go north.");
    system.println("");
    return true;
  }

  south() {
    system.println("I can't go south.");
    system.println("");
    return true;
  }

  east() {
    system.println("I can't go east.");
    system.println("");
    return true;
  }

  west() {
    system.println("I can't go west.");
    system.println("");
    return true;
  }

  n = this.north;
  s = this.south;
  e = this.east;
  w = this.west;

  l = this.look;
}
