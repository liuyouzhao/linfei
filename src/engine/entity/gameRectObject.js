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

  getTopLeft() {
    return {x:this.x, y:this.y};
  }

  getBottomRight() {
    return {x:this.x + this.width, y:this.y + this.height};
  }
}
