class RenderObject {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = 5;
    this.h = 5;
    this.color = "#949494FF";
    this.layer = 0;
    this.visible = true;
    this.innerObject = new RectangleObject({ topleft: new Vec2(x, y), bottomright: new Vec2(x + this.w, y + this.h) });
  }

  getBounds() {
    return this.innerObject.bounds();
  }

  getInnerObject() {
    return this.innerObject;
  }

  getVisibility() {
    return this.visible;
  }

  setVisibility(visible) {
    this.visible = visible;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getWidth() {
    return this.w;
  }

  getHeight() {
    return this.h;
  }

  setColor(color) {
    this.color = color;
  }

  setLayer(layer) {
    this.layer = layer;
  }

  getLayer() {
    return this.layer;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }
  render(ctx) {}

  debugRender(ctx) {}

  dispatchEvent(name, param) {
    switch(name) {
      case "onVisibilityChange": {
        this.setVisibility(param);
        break;
      }
    }
  }
}
