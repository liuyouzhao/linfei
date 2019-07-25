class Map {
  constructor(w, h) {
    this.floors = {};
    this.doors = {};
    this.rooms = {};
    this.walls = {};

    this.floorIds = [];
    this.doorIds = [];
    this.roomIds = [];
    this.wallIds = [];

    this._width = w;
    this._height = h;
  }

  width() { return this._width; }
  height() {  return this._height; }

  static instance() {
    return __staticGlobalSingtonMap0621;
  }

  addFloor(floor) {
    this.floors[floor.id] = floor;
    this.floorIds.push(floor.id);
  }

  getFloor(id) {
    return this.floors[id];
  }

  addRoomToFloor(room, floorId) {
    var floor = this.floors[floorId];
    if(floor == null || !floor) {
      return;
    }
    this.rooms[room.id] = room;
    floor.addRoom(room.id);
    this.roomIds.push(room.id);
  }

  getRoom(id) {
    return this.rooms[id];
  }

  addDoorToRoom(door, roomId) {
    var room = this.rooms[roomId];
    if(room == null || !room) {
      return;
    }
    this.doors[door.id] = door;
    this.doorIds.push(door.id);
    room.addDoor(door.id);
  }

  getDoor(id) {
    return this.doors[id];
  }

  addWallsToFloorFromJArr(jarr, floorId) {
    var floor = this.floors[floorId];
    if(floor == null || !floor) {
      return;
    }
    for(var i = 0; i < jarr.length; i ++) {
      var jwall = jarr[i];
      var id = jwall["id"];
      var lt = jwall["lt"];
      var rb = jwall["rb"];
      var mt = jwall["mt"];
      var color = jwall["color"];

      var vec2lt = new Vec2(lt["x"], lt["y"]);
      var vec2rb = new Vec2(rb["x"], rb["y"]);

      var wall = new Wall(id, vec2lt, vec2rb);
      wall.setColor(color);
      wall.setMaterial(mt);

      this.walls[id] = wall;
      floor.addWall(id);
      this.wallIds.push(id);
    }
  }

  addWallsToFloorFromArr(walls, floorId) {
    var floor = this.floors[floorId];
    if(floor == null || !floor) {
      return;
    }
    for(var i = 0; i < walls.length; i ++) {
      var id = walls[i].id;
      this.walls[id] = walls[i];
      floor.addWall(id);
      this.wallIds.push(id);
    }
  }

  addWallToFloor(wall, floorId) {
    var id = walls[i].id;
    this.walls[id] = walls[i];
    floor.addWall(id);
    this.wallIds.push(id);
  }

  getWall(id) {
    return this.walls[id];
  }
}
var __staticGlobalSingtonMap0621 = new Map();
