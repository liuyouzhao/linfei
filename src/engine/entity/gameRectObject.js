class GameRectObject extends GameObject {
  constructor(id, x, y, w, h) {
    super(id, x, y);
    this.width = w;
    this.height = h;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }
}