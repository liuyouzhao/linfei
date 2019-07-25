class Wall {
  constructor(id, lt, rb) {
    this.id = id;
    this.color = "#747474"
    // 1 is not transparent like wood or stone, 2 is glass transparent
    this.material = 1;

    this.renderObject = new RectangleObject({ topleft: new Vec2(lt.x, lt.y), bottomright: new Vec2(rb.x, rb.y) });
    this.box = {};
    this.box.leftTop = new Vec2(lt.x, lt.y);
    this.box.rightBottom = new Vec2(rb.x, rb.y);
  }

  ro() {
    return this.renderObject;
  }

  getBox() {
    return this.box;
  }

  setColor(color) {
    this.color = color;
  }

  setMaterial(mt) {
    this.material = mt;
  }
}
