class renderObject {
  constructor(id, x, y) {
    this.id;
    this.x = x;
    this.y = y;
    this.color = "#949494FF";
  }
  
  setColor(color) {
    this.color = color;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  render(ctx) {}
}
