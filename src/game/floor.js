class Floor {
  constructor(id, w, h) {
    this.id = id;
    this.roomIds = [];
    this.wallIds = [];
    this.pedestrian = new Pedestrian();
    this.renderObject = new RectangleObject({ topleft: new Vec2(0, 0), bottomright: new Vec2(w, h) });
  }

  ro() {
    return this.renderObject;
  }

  addRoom(id) {
    this.roomIds.push(id);
  }

  addWall(id) {
    this.wallIds.push(id);
    var wall = Map.instance().getWall(id);
    this.pedestrian.addBoundingBox(wall.getBox());
  }

  getPedestrian() {
    return this.pedestrian;
  }
}
