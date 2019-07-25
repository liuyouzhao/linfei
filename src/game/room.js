class Room {
  constructor(id, lt, rb) {
    this.id = id;
    this.leftTop = lt;
    this.rightBottom = rb;
    this.floor = 0;
    this.doorIds = [];
    this.type = 0;
  }

  addDoor(id) {
    this.doorIds.push(id);
  }

  setType(type) {
    this.type = type;
  }

  fromJson(json) {

  }
}
