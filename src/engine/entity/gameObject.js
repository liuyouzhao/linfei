class GameObject {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.onEvent = null;
    this.visible = true;
  }

  setVisibility(visible) {
    this.onEvent("onVisibilityChange", visible, this);
    this.visible = visible;
  }

  getVisibility() {
    return this.visible;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getId() {
    return this.id;
  }

  setOnEventCallback(eventCallback) {
    this.onEvent = eventCallback;
  }
}
