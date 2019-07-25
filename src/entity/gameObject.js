class GameObject {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.onEvent = null;
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
