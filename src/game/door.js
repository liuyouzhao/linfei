class Door {
  constructor(id, lt, rb) {
    this.id = id;
    this.color = "#747474"
    // 1 is not transparent like wood or stone, 2 is glass transparent
    this.material = 1;
    // 1 is single door, 2 is double door.
    this.type = 1;
  }

  static fromJson(json) {
    var door = new Door();
    door.id = json["id"];
    door.setTriggerArea({
      leftTop : json["ta"]["lt"],
      rightBottom : json["ta"][rb]
    });
    door.setBlockArea({
      leftTop : json["ba"]["lt"],
      rightBottom : json["ba"][rb]
    });
    door.material = json["m"];
    door.type = json["type"];
    door.rid1 = json["rid1"];
    door.rid2 = json["rid2"];
    door.duration = Config.getParam("duration", door.type);
  }

  setRooms(id1, id2) {
    this.rid1 = id1;
    this.rid2 = id2;
  }

  setTriggerArea(lt, rb) {
    this.triggerArea = {
      leftTop : lt,
      rightBottom : rb
    }
  }

  setBlockArea(lt, rb) {
    this.blockArea = {
      leftTop : lt,
      rightBottom : rb
    }
  }

  getTriggerArea() {
    return this.triggerArea;
  }

  getBlockArea() {
    return this.blockArea;
  }

  bind(door) {
    this.door = door;
  }
}
